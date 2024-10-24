import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (!user.length || !(await bcrypt.compare(password, user[0].password))) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } else {
    res.status(200).json({ message: 'success' });
  }
}
