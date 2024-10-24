import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    // Check if user exists
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length) return res.status(400).json({ error: 'User already exists' });

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

    // Generate JWT
    const token = jwt.sign({ userId: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
