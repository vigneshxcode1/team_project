import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, "vigneshwaran"); 
    req.user = decoded; 
    console.log('Decoded User:', decoded); 
    next();
  } catch (err) {
    console.error('Token Error:', err);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
