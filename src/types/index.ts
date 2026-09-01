export interface Project {
  id: string;
  title: string;
  category: 'Website' | 'Android APK' | 'Flutter' | 'Coaching' | 'E-Commerce' | 'School' | 'Govt';
  description: string;
  techStack: string[];
  liveUrl?: string;
  downloadUrl?: string;
  githubUrl?: string;
  image?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  featured: boolean;
  status: 'Live' | 'Launching Soon' | 'In Development';
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  price: string;
  icon: string;
  features: string[];
  deliveryTime: string;
  badge?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  popular?: boolean;
  subtitle: string;
  features: string[];
  deliveryDays: string;
  category: 'web' | 'app' | 'combo';
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  orgName: string;
  projectType: string;
  comment: string;
  rating: number;
  location: string;
}

export interface FounderBio {
  name: string;
  title: string;
  company: string;
  location: string;
  phone: string;
  email: string;
  whatsapp: string;
  instagram: string;
  telegram: string;
  github: string;
  summary: string;
  experienceYears: string;
  projectsCompleted: string;
  clientSatisfaction: string;
  skills: {
    name: string;
    level: number;
    category: 'Frontend' | 'Mobile' | 'Backend' | '3D & UI';
  }[];
}

export interface ScrapedDataResponse {
  isLiveSynced: boolean;
  lastSyncedAt: string;
  bio: FounderBio;
  projects: Project[];
  services: Service[];
  pricingPlans: PricingPlan[];
  testimonials: Testimonial[];
}
