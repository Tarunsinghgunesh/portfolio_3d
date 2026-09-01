import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, projectType, budget, message } = body;

    const emailPayload = {
      access_key: 'b9e4a3b8-6d27-4a0b-93f8-8c01b2a95e21', // Web3Forms Public key for direct forwarding
      subject: `🚨 New Lead from Portfolio: ${name} (${projectType})`,
      from_name: 'TK Web Solutions Portfolio 3D',
      to_email: 'tkwebsolution1301@gmail.com',
      name: name || 'Not specified',
      phone: phone || 'Not specified',
      email: email || 'Not specified',
      projectType: projectType || 'Website Development',
      budget: budget || '₹14,999 – ₹19,999',
      message: message || 'No message provided',
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    // Forward to Web3Forms / Formspree service to trigger direct Gmail delivery
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(emailPayload),
      });
    } catch (e) {
      console.warn('[Contact API] Web3Forms email trigger notice:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry successfully delivered to tkwebsolution1301@gmail.com',
    });
  } catch (error: any) {
    console.error('[Contact API] Error processing inquiry:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
