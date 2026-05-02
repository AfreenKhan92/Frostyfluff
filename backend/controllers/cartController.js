const supabase = require('../config/supabase');

/**
 * Helper: fetch a user's full cart with product details and totals.
 */
const fetchCartWithTotals = async (userId) => {
  const { data: items, error } = await supabase
    .from('cart_items')
    .select('id, quantity, product_id, product:products(id, name, price, image, category, in_stock)')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) throw error;

  const cartItems = items || [];
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return { items: cartItems, totalItems, totalPrice };
};

/**
 * @desc    Get current user's cart
 * @route   GET /api/cart
 * @access  Private
 */
const getCart = async (req, res, next) => {
  try {
    const cart = await fetchCartWithTotals(req.user.id);

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add item to cart (or increase quantity if already in cart)
 * @route   POST /api/cart
 * @access  Private
 */
const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a productId',
      });
    }

    // Verify product exists and is in stock
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, in_stock')
      .eq('id', productId)
      .single();

    if (productError || !product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (!product.in_stock) {
      return res.status(400).json({
        success: false,
        message: 'This product is currently out of stock',
      });
    }

    // Check if item already exists in cart
    const { data: existing } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('user_id', req.user.id)
      .eq('product_id', productId)
      .single();

    if (existing) {
      // Update quantity
      const { error: updateError } = await supabase
        .from('cart_items')
        .update({
          quantity: existing.quantity + parseInt(quantity),
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);

      if (updateError) throw updateError;
    } else {
      // Insert new cart item
      const { error: insertError } = await supabase
        .from('cart_items')
        .insert({
          user_id: req.user.id,
          product_id: productId,
          quantity: parseInt(quantity),
        });

      if (insertError) throw insertError;
    }

    // Return updated cart
    const cart = await fetchCartWithTotals(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update item quantity in cart
 * @route   PUT /api/cart/:productId
 * @access  Private
 */
const updateCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1',
      });
    }

    const { data: item, error } = await supabase
      .from('cart_items')
      .update({
        quantity: parseInt(quantity),
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', req.user.id)
      .eq('product_id', productId)
      .select()
      .single();

    if (error || !item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }

    // Return updated cart
    const cart = await fetchCartWithTotals(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Cart updated',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:productId
 * @access  Private
 */
const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', req.user.id)
      .eq('product_id', productId);

    if (error) throw error;

    // Return updated cart
    const cart = await fetchCartWithTotals(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Clear entire cart
 * @route   DELETE /api/cart
 * @access  Private
 */
const clearCart = async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', req.user.id);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
      data: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
