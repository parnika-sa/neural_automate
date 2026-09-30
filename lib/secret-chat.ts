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

let CURRENT_CLOUD_ID = 'ff808181a09d98f701a0f14357214920';
const REST_BASE_URL = 'https://api.restful-api.dev/objects';

function getFilePath(): string {
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
    return path.join('/tmp', 'secret-chat.json');
  }
  return path.join(process.cwd(), 'data', 'secret-chat.json');
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

function filterTodayMessages(store: ChatStore): ChatStore {
  const validMessages = (store.messages || []).filter(msg => {
    return !isOlderThanTodayIST(msg.timestamp);
  });

  return {
    ...store,
    messages: validMessages
  };
}

export async function getChatDataAsync(): Promise<ChatStore> {
  let store: ChatStore = {
    messages: [],
    clearedAtAnkit: null,
    clearedAtGf: null,
    lastUpdated: new Date().toISOString()
  };

  let fetchedFromCloud = false;

  // 1. Try fetching from Cloud REST storage
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(`${REST_BASE_URL}/${CURRENT_CLOUD_ID}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.data && Array.isArray(json.data.messages)) {
        store = json.data as ChatStore;
        fetchedFromCloud = true;
      }
    }
  } catch (e) {
    console.error('Cloud chat fetch error:', e);
  }

  // 2. Local fallback if cloud failed
  if (!fetchedFromCloud) {
    try {
      const filePath = getFilePath();
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        store = JSON.parse(raw);
      }
    } catch (err) {}
  }

  // Filter messages for today (Midnight IST Auto-Reset)
  const cleanStore = filterTodayMessages(store);
  
  if (cleanStore.messages.length !== (store.messages || []).length) {
    await saveChatDataAsync(cleanStore);
  }

  return cleanStore;
}

export async function saveChatDataAsync(store: ChatStore): Promise<void> {
  // Update local disk first
  try {
    const filePath = getFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(store, null, 2), 'utf-8');
  } catch (e) {}

  // Update Cloud Storage
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(`${REST_BASE_URL}/${CURRENT_CLOUD_ID}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        name: 'secret_chat_store',
        data: store
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      // If object not found, create new cloud object
      const createRes = await fetch(REST_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'secret_chat_store',
          data: store
        })
      });
      if (createRes.ok) {
        const newObj = await createRes.json();
        if (newObj && newObj.id) {
          CURRENT_CLOUD_ID = newObj.id;
        }
      }
    }
  } catch (e) {
    console.error('Cloud chat save error:', e);
  }
}

export async function addChatMessageAsync(sender: 'ankit' | 'gf', text: string): Promise<ChatMessage[]> {
  const store = await getChatDataAsync();
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

  store.messages.push(newMsg);
  store.lastUpdated = now.toISOString();

  await saveChatDataAsync(store);
  return store.messages;
}

export async function clearUserChatAsync(user: 'ankit' | 'gf'): Promise<void> {
  const store = await getChatDataAsync();
  const nowIso = new Date().toISOString();
  
  if (user === 'ankit') {
    store.clearedAtAnkit = nowIso;
  } else {
    store.clearedAtGf = nowIso;
  }

  await saveChatDataAsync(store);
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
