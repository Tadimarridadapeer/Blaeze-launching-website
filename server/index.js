import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure subscribers file exists
if (!fs.existsSync(SUBSCRIBERS_FILE)) {
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([], null, 2));
}

// Ensure default config file exists
const defaultConfig = {
  brandName: "BLAEZE",
  brandTagline: "IGNITE YOUR IDENTITY.",
  philosophyTag: "AE — AUTHENTIC EXPRESSION",
  heroLabel: "BLAEZE® — AE / AUTHENTIC EXPRESSION",
  heroHeadlineLine1: "NOT MADE",
  heroHeadlineLine2: "TO FIT IN.",
  heroHeadlineLine3: "MADE TO",
  heroHeadlineLine4: "EXPRESS.",
  heroSubtext: "An independent expression of identity, culture, and streetwear. A new chapter is on its way.",
  launchDate: "2026-11-15T00:00:00Z", // Target countdown date
  showCountdown: true,
  statusLabel: "THE FIRST CHAPTER — COMING SOON",
  contactEmail: "info@theblaeze.com",
  instagramUrl: "https://www.instagram.com/theblaeze/",
};

if (!fs.existsSync(CONFIG_FILE)) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2));
}

// Helpers
const readSubscribers = () => {
  try {
    const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeSubscribers = (data) => {
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(data, null, 2));
};

const readConfig = () => {
  try {
    const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return defaultConfig;
  }
};

const writeConfig = (data) => {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2));
};

// Rate limiting map (in memory)
const ipRequestMap = new Map();

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 10; // max 10 attempts per minute

  if (!ipRequestMap.has(ip)) {
    ipRequestMap.set(ip, []);
  }

  const requests = ipRequestMap.get(ip).filter(timestamp => now - timestamp < windowMs);
  requests.push(now);
  ipRequestMap.set(ip, requests);

  if (requests.length > maxRequests) {
    return res.status(429).json({
      success: false,
      message: "Too many subscription attempts. Please wait a minute and try again."
    });
  }

  next();
};

// --- API ENDPOINTS ---

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// GET /api/config
app.get('/api/config', (req, res) => {
  const config = readConfig();
  res.json({ success: true, config });
});

// POST /api/config
app.post('/api/config', (req, res) => {
  const currentConfig = readConfig();
  const updatedConfig = { ...currentConfig, ...req.body };
  writeConfig(updatedConfig);
  res.json({ success: true, config: updatedConfig, message: "Configuration updated successfully." });
});

// POST /api/subscribe
app.post('/api/subscribe', rateLimiter, (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      success: false,
      message: "Email address is required."
    });
  }

  const trimmedEmail = email.trim().toLowerCase();

  // Strict email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address (e.g. alex@domain.com)."
    });
  }

  const subscribers = readSubscribers();

  // Check for duplicate subscription
  const exists = subscribers.some(sub => sub.email === trimmedEmail);
  if (exists) {
    return res.status(409).json({
      success: false,
      message: "You're already on the VIP launch list! We'll notify you first."
    });
  }

  const newSubscriber = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email: trimmedEmail,
    subscribedAt: new Date().toISOString(),
    userAgent: req.headers['user-agent'] || 'unknown',
    ip: req.ip || '127.0.0.1'
  };

  subscribers.push(newSubscriber);
  writeSubscribers(subscribers);

  console.log(`[BLAEZE SUBSCRIBER REGISTERED] Email: ${trimmedEmail} at ${newSubscriber.subscribedAt}`);

  res.status(200).json({
    success: true,
    message: "YOU'RE ON THE LIST. SEE YOU AT LAUNCH.",
    subscriber: { email: trimmedEmail, id: newSubscriber.id }
  });
});

// GET /api/subscribers
app.get('/api/subscribers', (req, res) => {
  const subscribers = readSubscribers();
  res.json({
    success: true,
    totalSubscribers: subscribers.length,
    subscribers: subscribers.map(s => ({ id: s.id, email: s.email, subscribedAt: s.subscribedAt }))
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`BLAEZE Server running on http://localhost:${PORT}`);
});
