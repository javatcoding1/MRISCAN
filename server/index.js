import express from 'express';
import cors from 'cors';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// In-memory storage (replace with a proper database in production)
const users = new Map();
const JWT_SECRET = 'your-secret-key';

app.use(cors());
app.use(express.json());

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = join(__dirname, 'uploads');
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/dicom'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Authentication middleware
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, fingerprint } = req.body;
    
    if (users.has(email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.set(email, {
      password: hashedPassword,
      fingerprint,
      scans: []
    });

    const token = jwt.sign({ email }, JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password, fingerprint } = req.body;
    const user = users.get(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.fingerprint !== fingerprint) {
      return res.status(401).json({ error: 'Unrecognized device' });
    }

    const token = jwt.sign({ email }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Protected scan analysis endpoint
app.post('/api/analyze', auth, upload.single('scan'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result = {
      id: Date.now().toString(),
      filename: req.file.filename,
      timestamp: new Date().toISOString(),
      analysis: {
        detected: Math.random() > 0.5,
        probability: Math.random()
      }
    };

    // Store scan result
    const user = users.get(req.user.email);
    user.scans.push(result);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error processing scan' });
  }
});

// Get user's scan history
app.get('/api/history', auth, (req, res) => {
  try {
    const user = users.get(req.user.email);
    res.json(user.scans);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching history' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
