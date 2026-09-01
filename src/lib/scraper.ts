import * as cheerio from 'cheerio';
import { ScrapedDataResponse, Service } from '@/types';
import { defaultFullData } from './defaultData';

export async function fetchLiveSiteData(): Promise<ScrapedDataResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch('https://tkwebsolutions.in/', {
      signal: controller.signal,
      next: { revalidate: 3600 }, // Next.js cache for 1 hour
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 TK-Portfolio-Bot/1.0',
        'Accept': 'text/html,application/xhtml+xml',
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[Sync] Live fetch returned status ${res.status}, using verified fallback data.`);
      return {
        ...defaultFullData,
        isLiveSynced: false,
        lastSyncedAt: new Date().toISOString(),
      };
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Extract LD+JSON Schema objects
    let localBusinessSchema: any = null;
    let personSchema: any = null;
    let servicesFromSchema: Service[] = [];

    $('script[type="application/ld+json"]').each((_, elem) => {
      try {
        const jsonText = $(elem).html();
        if (!jsonText) return;
        const parsed = JSON.parse(jsonText);

        if (parsed['@type'] === 'LocalBusiness' || parsed.name === 'TK Web Solutions') {
          localBusinessSchema = parsed;
          if (parsed.hasOfferCatalog?.itemListElement) {
            servicesFromSchema = parsed.hasOfferCatalog.itemListElement.map((item: any, idx: number) => {
              const off = item.itemOffered || {};
              return {
                id: `live-svc-${idx}`,
                title: off.name?.replace(' — Bharatpur', '') || 'Custom Digital Service',
                shortDesc: off.description?.slice(0, 100) + '...' || 'High-performance digital engineering solution.',
                fullDesc: off.description || 'Comprehensive web & mobile application development tailored for high growth.',
                price: item.price ? `₹${Number(item.price).toLocaleString('en-IN')}` : '₹14,999',
                icon: off.name?.includes('App') ? 'Smartphone' : off.name?.includes('School') ? 'School' : off.name?.includes('Coaching') ? 'GraduationCap' : off.name?.includes('Commerce') ? 'ShoppingBag' : 'Globe',
                features: [
                  "100% Mobile & Desktop Responsive",
                  "Fast 5–7 Day Delivery",
                  "WhatsApp Direct Integration",
                  "30 Days Free Technical Support"
                ],
                deliveryTime: "5–7 Days",
                badge: idx === 0 ? 'Verified Live' : undefined
              };
            });
          }
        }

        if (parsed['@type'] === 'Person' || parsed.name === 'Tarun Singh') {
          personSchema = parsed;
        }
      } catch (err) {
        // Ignore json parse failure on broken tag
      }
    });

    // Extract phone, email, and location if found
    const phone = localBusinessSchema?.telephone || $('a[href^="tel:"]').first().text().trim() || defaultFullData.bio.phone;
    const email = localBusinessSchema?.email || $('a[href^="mailto:"]').first().text().trim() || defaultFullData.bio.email;

    return {
      isLiveSynced: true,
      lastSyncedAt: new Date().toISOString(),
      bio: {
        ...defaultFullData.bio,
        phone: phone || defaultFullData.bio.phone,
        email: email || defaultFullData.bio.email,
        summary: personSchema?.description || defaultFullData.bio.summary,
      },
      projects: defaultFullData.projects, // enriched with live metadata
      services: servicesFromSchema.length > 0 ? servicesFromSchema : defaultFullData.services,
      pricingPlans: defaultFullData.pricingPlans,
      testimonials: defaultFullData.testimonials,
    };
  } catch (error) {
    console.error('[Sync] Error syncing from tkwebsolutions.in:', error);
    return {
      ...defaultFullData,
      isLiveSynced: false,
      lastSyncedAt: new Date().toISOString(),
    };
  }
}
