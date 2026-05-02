const supabase = require('../config/supabase');

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = async (req, res, next) => {
  try {
    const { name, price, category, image, description, tags, in_stock } = req.body;

    if (!name || price === undefined || !category || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, price, category, and description',
      });
    }

    const { data: product, error } = await supabase
      .from('products')
      .insert({
        name,
        price,
        category: category.toLowerCase(),
        image: image || '',
        description,
        tags: tags || [],
        in_stock: in_stock !== undefined ? in_stock : true,
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all products (with optional category filter & search)
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = async (req, res, next) => {
  try {
    const { category, search, inStock, sort, page = 1, limit = 20 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const from = (pageNum - 1) * limitNum;
    const to = from + limitNum - 1;

    // Build query
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' });

    // Filter by category
    if (category) {
      query = query.eq('category', category.toLowerCase());
    }

    // Filter by stock status
    if (inStock !== undefined) {
      query = query.eq('in_stock', inStock === 'true');
    }

    // Text search (name or description)
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Sorting
    if (sort === 'price_asc') {
      query = query.order('price', { ascending: true });
    } else if (sort === 'price_desc') {
      query = query.order('price', { ascending: false });
    } else if (sort === 'name') {
      query = query.order('name', { ascending: true });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Pagination
    query = query.range(from, to);

    const { data: products, count, error } = await query;

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      count: products.length,
      total: count,
      page: pageNum,
      pages: Math.ceil(count / limitNum),
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProduct = async (req, res, next) => {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = async (req, res, next) => {
  try {
    const updateFields = { ...req.body, updated_at: new Date().toISOString() };
    if (updateFields.category) {
      updateFields.category = updateFields.category.toLowerCase();
    }

    const { data: product, error } = await supabase
      .from('products')
      .update(updateFields)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !product) {
      return res.status(404).json({
        success: false,
        message: error?.message || 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = async (req, res, next) => {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .delete()
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
