const supabase = require('../config/supabase');

const sizePricing = { '6-inch': 35, '8-inch': 50, '10-inch': 70, '12-inch': 95, tiered: 150 };

const createCustomCake = async (req, res, next) => {
  try {
    const { flavor, size, frosting, toppings, message } = req.body;

    if (!flavor || !size || !frosting) {
      return res.status(400).json({ success: false, message: 'Please provide flavor, size, and frosting' });
    }

    const toppingsSurcharge = (toppings && toppings.length > 0) ? toppings.length * 2 : 0;
    const estimatedPrice = (sizePricing[size] || 50) + toppingsSurcharge;

    const { data: cake, error } = await supabase
      .from('custom_cakes')
      .insert({
        user_id: req.user.id,
        flavor,
        size,
        frosting,
        toppings: toppings || [],
        message: message || '',
        estimated_price: estimatedPrice,
      })
      .select()
      .single();

    if (error) return res.status(400).json({ success: false, message: error.message });

    res.status(201).json({ success: true, message: 'Custom cake order submitted!', data: cake });
  } catch (error) { next(error); }
};

const getUserCustomCakes = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('custom_cakes')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) { next(error); }
};

const getCustomCake = async (req, res, next) => {
  try {
    const { data: cake, error } = await supabase
      .from('custom_cakes')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !cake) return res.status(404).json({ success: false, message: 'Custom cake order not found' });

    if (cake.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }

    res.status(200).json({ success: true, data: cake });
  } catch (error) { next(error); }
};

const updateCustomCakeStatus = async (req, res, next) => {
  try {
    const { status, adminNotes, estimatedPrice } = req.body;
    const updateFields = { updated_at: new Date().toISOString() };
    if (status) updateFields.status = status;
    if (adminNotes !== undefined) updateFields.admin_notes = adminNotes;
    if (estimatedPrice !== undefined) updateFields.estimated_price = estimatedPrice;

    const { data: cake, error } = await supabase
      .from('custom_cakes')
      .update(updateFields)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !cake) return res.status(404).json({ success: false, message: 'Custom cake order not found' });

    res.status(200).json({ success: true, message: 'Custom cake order updated', data: cake });
  } catch (error) { next(error); }
};

const getAllCustomCakes = async (req, res, next) => {
  try {
    const { status } = req.query;
    let query = supabase.from('custom_cakes').select('*, profile:profiles(name)');
    if (status) query = query.eq('status', status);
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) { next(error); }
};

module.exports = { createCustomCake, getUserCustomCakes, getCustomCake, updateCustomCakeStatus, getAllCustomCakes };
