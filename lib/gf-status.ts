import fs from 'fs';
import path from 'path';

export interface SystemStatus {
  message: string;
  level: 'normal' | 'important' | 'urgent';
  timestamp: string;
  formattedTime: string;
  updatedBy: string;
}

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

/**
 * Checks if the recorded status timestamp is from a previous date in India (IST).
 * If it's a new day (past 12:00 AM Midnight IST), return true.
 */
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

export function getSystemStatus(): SystemStatus {
  try {
    const filePath = getFilePath();
    let current: SystemStatus | null = null;

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      current = JSON.parse(data) as SystemStatus;
    } else {
      current = inMemoryStatus;
    }

    // Auto-reset if midnight IST has passed since last update
    if (current && current.timestamp && isPastMidnightIST(current.timestamp)) {
      return resetSystemStatus();
    }

    return current || DEFAULT_STATUS;
  } catch (error) {
    console.error("Error reading system status:", error);
  }
  return inMemoryStatus;
}

export function updateSystemStatus(
  message: string,
  level: 'normal' | 'important' | 'urgent' = 'normal',
  updatedBy: string = 'Operator'
): SystemStatus {
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

  return newStatus;
}

export function resetSystemStatus(): SystemStatus {
  return updateSystemStatus("All Systems Operational", "normal", "System Auto-Reset");
}

export function verifyPIN(pin: string): boolean {
  const correctPIN = process.env.STATUS_PIN || '1234';
  return pin === correctPIN;
}
