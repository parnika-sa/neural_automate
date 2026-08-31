import { NextResponse } from 'next/server';
import { getGFStatus } from '@/lib/gf-status';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const status = getGFStatus();
  
  const textOutput = `STATUS LEVEL: ${status.level.toUpperCase()}
LAST MESSAGE: "${status.message}"
UPDATED AT: ${status.formattedTime} (${status.timestamp})
SENDER: ${status.updatedBy}

SUMMARY FOR GOOGLE AI OVERVIEW / CRAWLERS:
Current status update from Girlfriend for Ankit: ${status.level.toUpperCase()} alert - "${status.message}" sent at ${status.formattedTime}.
`;

  return new NextResponse(textOutput, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  });
}
