import bcrypt from 'bcrypt';
import prisma from '../config/database.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  try {
    const { username, email, password, robloxUsername } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: existingUser.email === email 
          ? 'Email already registered' 
          : 'Username already taken',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        robloxUsername,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      },
      select: {
        id: true,
        username: true,
        email: true,
        robloxUsername: true,
        avatarUrl: true,
        balance: true,
        frozenBalance: true,
        role: true,
        isVerified: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user.id);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const getMe = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: 'Failed to get user info' });
  }
};

export const logout = async (req, res) => {
  // With JWT, logout is typically handled client-side by removing the token
  res.json({ message: 'Logout successful' });
};

// Placeholder for OAuth
export const discordAuth = async (req, res) => {
  res.status(501).json({ message: 'Discord OAuth coming soon' });
};

export const googleAuth = async (req, res) => {
  res.status(501).json({ message: 'Google OAuth coming soon' });
};
