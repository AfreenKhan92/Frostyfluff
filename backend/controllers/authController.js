const supabase = require('../config/supabase');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // Create user via Supabase Auth
    // The `handle_new_user` trigger will auto-create the profile row
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm for dev convenience
      user_metadata: { name, role: 'user' },
    });

    if (error) {
      // Handle duplicate email
      if (error.message.includes('already been registered') || error.message.includes('already exists')) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists',
        });
      }
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    // Sign in the newly created user to get a session token
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      return res.status(500).json({
        success: false,
        message: 'Account created but failed to generate session. Please log in.',
      });
    }

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        id: data.user.id,
        name,
        email: data.user.email,
        role: 'user',
        token: signInData.session.access_token,
        refreshToken: signInData.session.refresh_token,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user & return Supabase session
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Authenticate with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Fetch profile for name and role
    const { data: profile } = await supabase
      .from('profiles')
      .select('name, role')
      .eq('id', data.user.id)
      .single();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        id: data.user.id,
        name: profile?.name || 'User',
        email: data.user.email,
        role: profile?.role || 'user',
        token: data.session.access_token,
        refreshToken: data.session.refresh_token,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current logged-in user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res, next) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: req.user.id,
        email: req.user.email,
        ...profile,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/me
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    const updateFields = {};
    if (name) updateFields.name = name;
    updateFields.updated_at = new Date().toISOString();

    const { data: profile, error } = await supabase
      .from('profiles')
      .update(updateFields)
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: req.user.id,
        email: req.user.email,
        ...profile,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe, updateProfile };
