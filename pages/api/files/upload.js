import multer from 'multer';
import csv from 'csv-parser';
import db from '../../../lib/db';

const upload = multer({ dest: 'uploads/' });

export default async function handler(req, res) {
  upload.single('file')(req, res, async (err) => {
    if (err) return res.status(500).json({ error: 'File upload failed' });

    const filePath = req.file.path;
    const results = [];

    // Parse CSV
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const contact of results) {
          // Add validation and database insertion
          await db.query('INSERT INTO contacts (name, email, phone, address, timezone) VALUES (?, ?, ?, ?, ?)', 
            [contact.name, contact.email, contact.phone, contact.address, contact.timezone]);
        }
        res.status(200).json({ message: 'Contacts uploaded' });
      });
  });
}
