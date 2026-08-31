import { NextResponse } from 'next/server';
import { getSystemStatus } from '@/lib/gf-status';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const status = getSystemStatus();
  
  const textOutput = `NeuralAutomate Infrastructure & Service Status
----------------------------------------------
Current Status Notice: ${status.message}
Priority Level: ${status.level.toUpperCase()}
Last Updated: ${status.formattedTime}
Timestamp: ${status.timestamp}
Service Health: ${status.level === 'normal' ? 'All Operational' : 'Notice Pending'}
`;

  return new NextResponse(textOutput, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  });
}
