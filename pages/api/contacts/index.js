import db from '../../../lib/db';
import { verifyToken } from '../../../lib/auth'; // A helper function for JWT verification

export default async function handler(req, res) {
  const userId = verifyToken(req, res);
  if (!userId) return;

  if (req.method === 'GET') {
    // Get contacts with filters
    const { name, email, timezone } = req.query;
    const [contacts] = await db.query(
      'SELECT * FROM contacts WHERE userId = ? AND (name LIKE ? OR email LIKE ? OR timezone LIKE ?)',
      [userId, `%${name || ''}%`, `%${email || ''}%`, `%${timezone || ''}%`]
    );
    res.status(200).json(contacts);
  } else if (req.method === 'POST') {
    // Create new contact
    const { name, email, phone, address, timezone } = req.body;
    await db.query('INSERT INTO contacts (userId, name, email, phone, address, timezone) VALUES (?, ?, ?, ?, ?, ?)', 
      [userId, name, email, phone, address, timezone]);
    res.status(201).json({ message: 'Contact created' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
