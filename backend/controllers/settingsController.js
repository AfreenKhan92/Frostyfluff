const fs = require('fs');
const path = require('path');

const SETTINGS_FILE = path.join(__dirname, '../data/settings.json');

/**
 * Helper to read settings
 */
const readSettings = () => {
  try {
    if (!fs.existsSync(SETTINGS_FILE)) return {};
    const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading settings file:', error);
    return {};
  }
};

/**
 * Helper to write settings
 */
const writeSettings = (settings) => {
  try {
    const dir = path.dirname(SETTINGS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing settings file:', error);
    return false;
  }
};

/**
 * @desc    Get all site settings
 * @route   GET /api/settings
 * @access  Public
 */
const getSettings = async (req, res, next) => {
  try {
    const settings = readSettings();
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update or create a setting
 * @route   POST /api/settings
 * @access  Private/Admin
 */
const updateSetting = async (req, res, next) => {
  try {
    const { key, value } = req.body;

    if (!key) {
      return res.status(400).json({ success: false, message: 'Key is required' });
    }

    const settings = readSettings();
    settings[key] = value;
    
    if (writeSettings(settings)) {
      res.status(200).json({ success: true, data: { key, value } });
    } else {
      res.status(500).json({ success: false, message: 'Failed to write settings' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSetting,
};
