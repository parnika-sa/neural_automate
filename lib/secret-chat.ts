import fs from 'fs';
import path from 'path';

export interface ChatMessage {
  id: string;
  sender: 'ankit' | 'gf';
  text: string;
  timestamp: string;
  formattedTime: string;
}

export interface ChatStore {
  messages: ChatMessage[];
  clearedAtAnkit?: string | null;
  clearedAtGf?: string | null;
  lastUpdated: string;
}

const CLOUD_OBJECT_ID = 'ff808181a09d98f701a0f16d0d79496a';
const REST_BASE_URL = 'https://api.restful-api.dev/objects';

// Persistent in-memory cache to prevent data loss across serverless calls
let cachedStore: ChatStore = {
  messages: [],
  clearedAtAnkit: null,
  clearedAtGf: null,
  lastUpdated: new Date().toISOString()
};

function getFilePath(): string {
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
    return path.join('/tmp', 'secret-chat-v2.json');
  }
  return path.join(process.cwd(), 'data', 'secret-chat-v2.json');
}

function getTodayISTDateString(): string {
  const now = new Date();
  return now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}

function isOlderThanTodayIST(timestampISO: string): boolean {
  try {
    const todayIST = getTodayISTDateString();
    const msgDate = new Date(timestampISO);
    const msgIST = msgDate.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    return msgIST !== todayIST;
  } catch (e) {
    return false;
  }
}

function filterTodayMessages(msgs: ChatMessage[]): ChatMessage[] {
  if (!Array.isArray(msgs)) return [];
  return msgs.filter(msg => msg && msg.timestamp && !isOlderThanTodayIST(msg.timestamp));
}

export async function getChatDataAsync(): Promise<ChatStore> {
  let cloudData: ChatStore | null = null;

  // 1. Read from Cloud Storage
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(`${REST_BASE_URL}/${CLOUD_OBJECT_ID}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.data && Array.isArray(json.data.messages)) {
        cloudData = json.data as ChatStore;
      }
    }
  } catch (e) {
    console.error('Cloud chat fetch warning:', e);
  }

  // 2. Read from Local Disk Fallback if Cloud failed
  if (!cloudData) {
    try {
      const filePath = getFilePath();
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        cloudData = JSON.parse(raw);
      }
    } catch (err) {}
  }

  // 3. Merge Cloud/Disk data with Cached Store (Prevent losing messages)
  if (cloudData && Array.isArray(cloudData.messages)) {
    const messageMap = new Map<string, ChatMessage>();
    
    // Put cached messages first
    (cachedStore.messages || []).forEach(m => messageMap.set(m.id, m));
    // Put cloud/disk messages (cloud takes priority)
    (cloudData.messages || []).forEach(m => messageMap.set(m.id, m));

    cachedStore = {
      ...cloudData,
      messages: Array.from(messageMap.values())
    };
  }

  // Filter messages for Today (12:00 AM Midnight IST auto-reset)
  cachedStore.messages = filterTodayMessages(cachedStore.messages);

  return cachedStore;
}

export async function saveChatDataAsync(store: ChatStore): Promise<void> {
  cachedStore = { ...store };

  // Write to local disk file
  try {
    const filePath = getFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(store, null, 2), 'utf-8');
  } catch (e) {}

  // Write to Cloud storage
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    await fetch(`${REST_BASE_URL}/${CLOUD_OBJECT_ID}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        name: 'alpha_pixel_chat_store_v99',
        data: store
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
  } catch (e) {
    console.error('Cloud chat save warning:', e);
  }
}

export async function addChatMessageAsync(sender: 'ankit' | 'gf', text: string): Promise<ChatMessage[]> {
  const currentStore = await getChatDataAsync();
  const now = new Date();
  
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  });

  const newMsg: ChatMessage = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    sender,
    text: text.trim(),
    timestamp: now.toISOString(),
    formattedTime
  };

  const messageMap = new Map<string, ChatMessage>();
  (currentStore.messages || []).forEach(m => messageMap.set(m.id, m));
  messageMap.set(newMsg.id, newMsg);

  const updatedMessages = Array.from(messageMap.values());
  const updatedStore: ChatStore = {
    ...currentStore,
    messages: filterTodayMessages(updatedMessages),
    lastUpdated: now.toISOString()
  };

  await saveChatDataAsync(updatedStore);
  return updatedStore.messages;
}

export async function clearUserChatAsync(user: 'ankit' | 'gf'): Promise<void> {
  const currentStore = await getChatDataAsync();
  const nowIso = new Date().toISOString();
  
  if (user === 'ankit') {
    currentStore.clearedAtAnkit = nowIso;
  } else {
    currentStore.clearedAtGf = nowIso;
  }

  await saveChatDataAsync(currentStore);
}

export function verifyChatPIN(pin: string): { valid: boolean; user: 'ankit' | 'gf' | null } {
  const cleanPin = String(pin || '').trim();
  if (cleanPin === '4681') {
    return { valid: true, user: 'ankit' };
  }
  if (cleanPin === '9322') {
    return { valid: true, user: 'gf' };
  }
  return { valid: false, user: null };
}
