import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
    try {
        const { name, email, age } = req.body;

        // Check if user with email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const user = new User({ name, email, age });
        await user.save();
        res.status(201).json({
            message: 'User created successfully',
            user
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.json({
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        const { name, email, age } = req.body;

        // Check if email is being updated and if it already exists
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, age },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            message: 'User updated successfully',
            user
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', username });
});

router.get('/users', async (req, res) => {
    const users = await User.find({}, 'username');
    res.json(users);
});

router.delete('/user/:username', async (req, res) => {
    await User.findOneAndDelete({ username: req.params.username });
    res.json({ message: 'User deleted' });
});

export default router;
