import fs from 'fs';
import path from 'path';

export interface GFStatus {
  message: string;
  level: 'normal' | 'important' | 'urgent';
  timestamp: string;
  formattedTime: string;
  updatedBy: string;
}

const DEFAULT_STATUS: GFStatus = {
  message: "No new updates right now. All good! ❤️",
  level: "normal",
  timestamp: new Date().toISOString(),
  formattedTime: new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  }),
  updatedBy: "System"
};

// Memory fallback
let inMemoryStatus: GFStatus = { ...DEFAULT_STATUS };

function getFilePath(): string {
  // Use /tmp in serverless environment or local data directory
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
    return path.join('/tmp', 'gf-status.json');
  }
  return path.join(process.cwd(), 'data', 'gf-status.json');
}

export function getGFStatus(): GFStatus {
  try {
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data) as GFStatus;
    }
  } catch (error) {
    console.error("Error reading GF status file:", error);
  }
  return inMemoryStatus;
}

export function updateGFStatus(
  message: string,
  level: 'normal' | 'important' | 'urgent' = 'normal',
  updatedBy: string = 'GF'
): GFStatus {
  const now = new Date();
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  }) + ' IST';

  const newStatus: GFStatus = {
    message: message.trim(),
    level,
    timestamp: now.toISOString(),
    formattedTime,
    updatedBy
  };

  inMemoryStatus = newStatus;

  try {
    const filePath = getFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(newStatus, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error writing GF status file:", error);
  }

  return newStatus;
}

export function verifyPIN(pin: string): boolean {
  const correctPIN = process.env.GF_PIN || '1234';
  return pin === correctPIN;
}
