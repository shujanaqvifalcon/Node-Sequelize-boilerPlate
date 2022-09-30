/**
 * Check auth middleware
 * @author Shuja Naqvi
 */
const jwt = require('jsonwebtoken');
const tokenSecret = process.env.JWT_SECRET;

// Check auth
exports.commonAuth = (req, res, next) => {
  // Get token from Header
  const header = req.get('Authorization');

  // Check if not token
  if (!header || !header.startsWith('Bearer')) {
    return res.status(403).json({
      success: false,
      message: 'No token found, Authorization denied',
    });
  }

  try {
    // Decrypting token
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, tokenSecret);

    if (!decoded.admin && !decoded.user) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to access this resource',
      });
    }
    if (decoded.admin) {
      req.admin = decoded.admin;
    } else {
      req.user = decoded.user;
    }

    req.token = token;

    // If user authenticated
    res.set('cache-control', 'no-cache, no-store, private, must-revalidate, post-check=0, pre-check=0');

    // Done
    next();
  } catch (err) {
    // If not
    res.status(403).json({ success: false, message: 'Your session has been expired' });
  }
};
