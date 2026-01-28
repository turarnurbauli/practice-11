require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.warn('Warning: MONGO_URI is not set. MongoDB will not connect.');
}

// MongoDB connection
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// Simple Item model (for practice)
const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
  },
  { timestamps: true }
);

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Practice 11 API is running' });
});

// GET /api/items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/items/:id
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

// POST /api/items
app.post('/api/items', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: 'Validation error', details: err.message });
  }
});

// PUT /api/items/:id
app.put('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID or validation error', details: err.message });
  }
});

// DELETE /api/items/:id
app.delete('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

