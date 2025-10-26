import { Router } from 'express';
import User from '../models/user.js';

const router = Router();

// Signup
router.post('/signup', async (req, res) => {
  const { walletAddress, name } = req.body;
  if (!walletAddress) return res.status(400).json({ success: false, message: "Wallet address required" });

  try {
    const existingUser = await User.findOne({ walletAddress });
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });

    const newUser = new User({ walletAddress, name });
    await newUser.save();
    res.status(201).json({ success: true, user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { walletAddress } = req.body;
  if (!walletAddress) return res.status(400).json({ success: false, message: "Wallet address required" });

  try {
    const user = await User.findOne({ walletAddress });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get a user by wallet address
router.get('/:walletAddress', async (req, res) => {
  try {
    const user = await User.findOne({ walletAddress: req.params.walletAddress });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
