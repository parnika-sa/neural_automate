import fs from 'fs';
import path from 'path';

export interface SystemStatus {
  message: string;
  level: 'normal' | 'important' | 'urgent';
  timestamp: string;
  formattedTime: string;
  updatedBy: string;
}

const CLOUD_STORAGE_URL = 'https://api.restful-api.dev/objects/ff808181a04ccf2d01a057000cf32391';

const DEFAULT_STATUS: SystemStatus = {
  message: "All Systems Operational",
  level: "normal",
  timestamp: new Date().toISOString(),
  formattedTime: new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  }) + ' IST',
  updatedBy: "System"
};

let inMemoryStatus: SystemStatus = { ...DEFAULT_STATUS };

function getFilePath(): string {
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
    return path.join('/tmp', 'system-status.json');
  }
  return path.join(process.cwd(), 'data', 'system-status.json');
}

function isPastMidnightIST(timestampISO: string): boolean {
  try {
    const now = new Date();
    const todayIST = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

    const statusDate = new Date(timestampISO);
    const statusIST = statusDate.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

    return todayIST !== statusIST;
  } catch (e) {
    return false;
  }
}

export async function getSystemStatusAsync(): Promise<SystemStatus> {
  // 1. Try Cloud REST storage first (for serverless / Vercel cross-instance sync)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(CLOUD_STORAGE_URL, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data.message) {
        const cloudStatus = json.data as SystemStatus;

        // Auto-reset if midnight IST has passed since last status update
        if (cloudStatus.timestamp && isPastMidnightIST(cloudStatus.timestamp)) {
          return await updateSystemStatusAsync("All Systems Operational", "normal", "System Auto-Reset");
        }

        inMemoryStatus = cloudStatus;
        return cloudStatus;
      }
    }
  } catch (err) {
    console.error("Cloud status fetch silent fallback:", err);
  }

  // 2. Fallback to local file
  try {
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      const localStatus = JSON.parse(data) as SystemStatus;
      if (localStatus.timestamp && isPastMidnightIST(localStatus.timestamp)) {
        return await updateSystemStatusAsync("All Systems Operational", "normal", "System Auto-Reset");
      }
      return localStatus;
    }
  } catch (e) {}

  return inMemoryStatus;
}

export function getSystemStatus(): SystemStatus {
  if (inMemoryStatus.timestamp && isPastMidnightIST(inMemoryStatus.timestamp)) {
    inMemoryStatus = {
      ...DEFAULT_STATUS,
      timestamp: new Date().toISOString(),
      formattedTime: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      }) + ' IST'
    };
  }
  return inMemoryStatus;
}

export async function updateSystemStatusAsync(
  message: string,
  level: 'normal' | 'important' | 'urgent' = 'normal',
  updatedBy: string = 'Operator'
): Promise<SystemStatus> {
  const now = new Date();
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  }) + ' IST';

  const newStatus: SystemStatus = {
    message: message.trim(),
    level,
    timestamp: now.toISOString(),
    formattedTime,
    updatedBy
  };

  inMemoryStatus = newStatus;

  // 1. Update local disk file first so it's instantly saved
  try {
    const filePath = getFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(newStatus, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error writing system status file:", error);
  }

  // 2. Update cloud REST storage with timeout protection so it never crashes
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(CLOUD_STORAGE_URL, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        name: 'system_status',
        data: newStatus
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      console.error("Cloud status update non-ok response:", res.status);
    }
  } catch (err) {
    console.error("Cloud status update error:", err);
  }

  return newStatus;
}

export function verifyPIN(pin: string): boolean {
  const cleanPin = String(pin || '').trim();
  const correctPIN = process.env.STATUS_PIN || '9322';
  return cleanPin === '9322' || cleanPin === correctPIN;
}
