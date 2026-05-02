const supabase = require('../config/supabase');

const placeOrder = async (req, res, next) => {
  try {
    const { shippingAddress, notes } = req.body;

    const { data: cartItems, error: cartError } = await supabase
      .from('cart_items')
      .select('quantity, product:products(id, name, price)')
      .eq('user_id', req.user.id);

    if (cartError) throw cartError;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Your cart is empty.' });
    }

    const orderItems = cartItems.map((item) => ({
      product_id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const totalPrice = orderItems.reduce((t, i) => t + i.price * i.quantity, 0);
    const addr = shippingAddress || {};

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: req.user.id,
        total_price: totalPrice,
        shipping_street: addr.street || '',
        shipping_city: addr.city || '',
        shipping_postal_code: addr.postalCode || '',
        shipping_phone: addr.phone || '',
        notes: notes || '',
      })
      .select()
      .single();

    if (orderError) throw orderError;

    const itemsWithOrderId = orderItems.map((i) => ({ ...i, order_id: order.id }));
    const { error: itemsError } = await supabase.from('order_items').insert(itemsWithOrderId);
    if (itemsError) throw itemsError;

    await supabase.from('cart_items').delete().eq('user_id', req.user.id);

    const { data: completeOrder } = await supabase
      .from('orders')
      .select('*, items:order_items(*)')
      .eq('id', order.id)
      .single();

    res.status(201).json({ success: true, message: 'Order placed successfully!', data: completeOrder });
  } catch (error) { next(error); }
};

const getUserOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const from = (parseInt(page) - 1) * parseInt(limit);
    const to = from + parseInt(limit) - 1;

    let query = supabase.from('orders').select('*, items:order_items(*)', { count: 'exact' }).eq('user_id', req.user.id);
    if (status) query = query.eq('status', status);
    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data: orders, count, error } = await query;
    if (error) throw error;

    res.status(200).json({ success: true, count: orders.length, total: count, page: parseInt(page), pages: Math.ceil(count / parseInt(limit)), data: orders });
  } catch (error) { next(error); }
};

const getOrder = async (req, res, next) => {
  try {
    const { data: order, error } = await supabase.from('orders').select('*, items:order_items(*)').eq('id', req.params.id).single();
    if (error || !order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) { next(error); }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { data: order, error } = await supabase.from('orders').update({ status, updated_at: new Date().toISOString() }).eq('id', req.params.id).select('*, items:order_items(*)').single();
    if (error || !order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, message: `Order status updated to '${status}'`, data: order });
  } catch (error) { next(error); }
};

const getAllOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const from = (parseInt(page) - 1) * parseInt(limit);
    const to = from + parseInt(limit) - 1;

    let query = supabase.from('orders').select('*, items:order_items(*), profile:profiles(name)', { count: 'exact' });
    if (status) query = query.eq('status', status);
    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data: orders, count, error } = await query;
    if (error) throw error;

    res.status(200).json({ success: true, count: orders.length, total: count, page: parseInt(page), pages: Math.ceil(count / parseInt(limit)), data: orders });
  } catch (error) { next(error); }
};

module.exports = { placeOrder, getUserOrders, getOrder, updateOrderStatus, getAllOrders };
