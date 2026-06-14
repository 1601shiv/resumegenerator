import User from '../models/User.js';

export const verifyAdmin = async (req, res, next) => {
  const adminUserId = req.headers['x-admin-userid'] || req.query.adminUserId;
  if (!adminUserId) {
    return res.status(401).json({ error: 'Unauthorized: Admin ID required' });
  }
  try {
    const user = await User.findById(adminUserId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Forbidden: Admin authorization required' });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: 'Admin validation failed' });
  }
};
