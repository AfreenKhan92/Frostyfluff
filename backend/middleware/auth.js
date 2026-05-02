const supabase = require('../config/supabase');

/**
 * Protect routes — requires a valid Supabase JWT Bearer token.
 * Verifies the token via Supabase Auth and attaches user + profile to req.user.
 */
const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized — no token provided',
    });
  }

  try {
    // Verify token with Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized — invalid or expired token',
      });
    }

    // Fetch the user's profile (name, role)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('name, role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized — user profile not found',
      });
    }

    // Attach combined user info to request
    req.user = {
      id: user.id,
      email: user.email,
      name: profile.name,
      role: profile.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized — token verification failed',
    });
  }
};

/**
 * Restrict access to specific roles (e.g. admin).
 * Must be used AFTER the protect middleware.
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' is not authorized to access this route`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
