import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library

const secretKey = process.env.JWT_SECRET; // Use an environment variable or a static key

export function verifyToken(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authorization token missing or malformed' });
    return null;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey); // Verify the token
    console.log(token);
    
    console.log(decoded);
    
    return decoded.userId; // Return the userId from the token payload
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
    return null;
  }
}
