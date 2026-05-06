/**
 * Seed script to populate the Supabase database with sample data.
 *
 * PREREQUISITES:
 *   1. Run schema.sql in your Supabase SQL Editor first.
 *   2. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env
 *
 * Run: npm run seed
 */
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const sampleProducts = [
  { name: 'Strawberry Dream Cake', price: 45.00, category: 'cakes', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwwsWOWE17j7PPnoOCl0e95i37j7FYLfScC8BtYiQjFBsfojomeCCeHu0iDcxgPe5wnazGJNbv00cNeWMxB-090DahOWKlJUe5H_WaR9F2BLjF8zaSq73l0QHQZPoBKpefNJ58P0Bj5_OSyxWDJXHGPxWQ8_f2anMU8L4TwwJQ_S27O8BCMIs7Od4ct1YBEvQeRtPD8ja8nE0YQsjOT6lqcr8zYKriRC0oPcMGc0nyorAyzTVtgKQeadXKKnRM4eGtmxu6ZA_QkqMC', description: 'A vibrant multi-layered strawberry cake with smooth buttercream frosting and fresh strawberry filling.', tags: ['bestseller', 'celebration'] },
  { name: 'Classic Chocolate Fudge', price: 42.00, category: 'cakes', image: '', description: 'Rich, decadent chocolate fudge cake with layers of ganache.', tags: ['bestseller'] },
  { name: 'Red Velvet Bliss', price: 48.00, category: 'cakes', image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&q=80&w=800', description: 'Soft red velvet layers with tangy cream cheese frosting and white chocolate shavings.', tags: ['premium'] },
  { name: 'Lemon Drizzle Cake', price: 38.00, category: 'cakes', image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800', description: 'Light and zesty lemon sponge with a sweet citrus glaze.', tags: [] },
  // { name: ''Pain au Chocolat, price: 4.50, category: 'pastries', image: 'https://images.unsplash.com/photo-1549903072-7e6e08290d9a?auto=format&fit=crop&q=80&w=800', description: 'Flaky, buttery pastry filled with rich dark chocolate.', tags: ['popular'] },
  { name: 'Butter Croissant', price: 4.50, category: 'pastries', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_-76J-kdgtsLSLRKXvTkam4F-55u3-RaTkw8fRQzcJFE8JmqnC57PKt-LhOveHLgwdE3gtkRePSGQAnAMeaaOHQ4Dh9-z4LPiS8VYHOdOLh5uKsj0iwHjF70yrvXYKQo11oU1UCzmCnWzZ7cHiD2wSpJN2sr5nt4JrYc5T0U_pJappaoONYrkVgKb9PpAIkPdAsJLOZJ8pOt1PVjQnNOAjGO7CnVBc8CzgFhDH0o3dJ8xMTlotAecxxsTu268od0fRSHrjCiimA3I', description: 'Flaky, buttery goodness. Classic French pastry with premium European butter.', tags: ['popular'] },
  { name: 'Seasonal Fruit Tart', price: 6.50, category: 'pastries', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLJvqbOAlcgcvAZ7G0NyS9toLO4WSxysGmN1tsvJkLEtck4lhHF904NLBhZIavyeJdSzvgHRovqWV2_iUL0SiMNXUg3QDqtZkp_aCy6cPcjo5IoWezL7SFcxOa6eIANjQR6GjCISvLC0JMVWjDeTGZClWBVKoEDkuGFQrz438FGTParWOoHxC58O9w2ecv9A4-9ilujxv_8jdx2-2Rgz3W5qkTViM_2zkjNt8VPIKWjIti8XN-5F6YfZ-DtZix4687_dbDcUATgUXU', description: 'Crisp pastry shell filled with vanilla custard and fresh seasonal fruits.', tags: [] },
  { name: 'Macaron Trio', price: 9.00, category: 'pastries', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZzxu5eiOaI_gjIm5XFxdMC0xi7XTcNOAQdFZrC1EE_ftX6oU8CGz8HY7ZAws5YhEMgYEiyayopfLTnO6u_S7Rj3xFEQPYcLx2yzhB9tZo-L5bjCwjCsWTznYYpzs9P1g7Bc41wirl9f34thA3zuVNE18Vw7NNumXTNntlLPWftFD36h8qDr5gzWBaU8QBgZ6VBWJ3ol3I6s24SS4Apfph5-2X3qfoPaOtzlFCZ_Qr0V1MkS_ag89yV8CIS0c4YQkdYwqvW_isznW-', description: 'A curated selection of three premium macarons: Vanilla, Rose, and Pistachio.', tags: ['premium'] },
  { name: 'Chocolate Chip Cookies (6 pcs)', price: 8.00, category: 'cookies', image: '', description: 'Chewy, golden-brown chocolate chip cookies with premium dark chocolate chunks.', tags: ['bestseller'] },
  { name: 'Sugar Cookie Stars (12 pcs)', price: 12.00, category: 'cookies', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800', description: 'Star-shaped sugar cookies with colorful royal icing.', tags: ['seasonal'] },
  // { name: 'Matcha White Choc Cookies (6 pcs)', price: 10.00, category: 'cookies', image: 'https://images.unsplash.com/photo-1589178351586-b48ed086a9ab?auto=format&fit=crop&q=80&w=800', description: 'Soft-baked matcha cookies studded with premium white chocolate chips.', tags: [] },
  { name: 'Classic Sourdough', price: 8.00, category: 'breads', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACBsMoll-TSxFl_PQWpEAyHn34vMBP8NpnwEfKgSOv-thvFuQbwGb6SWcBm-nXSMc-Gk0Rh7EToJW3JERjSaO8bFVv_ZIG2rvP4lSi0AJT02qHcMmbeq1uAkaqY4t6JaAYET4E5KBXzO2R3WKCTm1QCeTuMk-9TXsQlrN4LNFu78g5653u79eYGo5k1-z19ff6-UVPWjeRrceBE_w5U9gzlWrwx_AXnvqAFP7nsTgya8gqrfRl5d-YPDHpsDm1iLFCdZpjEgfhU-jj', description: 'Artisan loaf with a chewy crumb and a perfectly crisp crust.', tags: ['vegan', 'popular'] },
  // { name: 'Brioche Loaf', price: 7.50, category: 'breads', image: 'https://images.unsplash.com/photo-1598128558393-70ff21433be0?auto=format&fit=crop&q=80&w=800', description: 'Soft, buttery brioche with a golden crust.', tags: [] },
  { name: 'Iced Matcha Latte', price: 6.00, category: 'beverages', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCExxlioZ08oUe_g_p-Wt4tqRBVy5t98e5rRDoaYaxclhf3DmCdXEmfzygA5n9NKQzSHwmCDZebuxTFTnD_pmbpVRpe7iJHWhFvzQIMsHSQDHcghMIfLHsucUGK58e4xKjFh1aAMXx1O2x5-Iqw8WhnAHVgKkR2f3MMvmyuScC37bpO0Joi0L1gUxF6OGtlnryogUnm-lzGiogdvMcqtMGBn9m6cHcn-yzBZuptl13NrOD4NIaDRmZMOMLAANFKugFGgLUeyUMWOToV', description: 'Earthy and refreshing ceremonial-grade matcha blended with oat milk over ice.', tags: ['vegan'] },
  { name: 'Rose Hot Chocolate', price: 5.50, category: 'beverages', image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&q=80&w=800', description: 'Velvety hot chocolate infused with rose syrup and topped with whipped cream.', tags: ['seasonal'] },
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting Supabase seed...\n');

    // ── Clear existing data ──
    await supabase.from('order_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('orders').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('cart_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('custom_cakes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    console.log('🗑️  Cleared existing data');

    // ── Seed products ──
    const { data: products, error: prodError } = await supabase
      .from('products')
      .insert(sampleProducts)
      .select();

    if (prodError) throw prodError;
    console.log(`✅ Seeded ${products.length} products`);

    // ── Create admin user ──
    const { data: adminData, error: adminError } = await supabase.auth.admin.createUser({
      email: 'admin@frostyfluffs.com',
      password: 'admin123456',
      email_confirm: true,
      user_metadata: { name: 'Admin', role: 'admin' },
    });

    if (adminError && !adminError.message.includes('already been registered')) {
      throw adminError;
    }
    console.log(adminError ? '👤 Admin user already exists' : '👤 Created admin (admin@frostyfluffs.com / admin123456)');

    // ── Create test user ──
    const { data: testData, error: testError } = await supabase.auth.admin.createUser({
      email: 'test@frostyfluffs.com',
      password: 'test123456',
      email_confirm: true,
      user_metadata: { name: 'Test User', role: 'user' },
    });

    if (testError && !testError.message.includes('already been registered')) {
      throw testError;
    }
    console.log(testError ? '👤 Test user already exists' : '👤 Created test user (test@frostyfluffs.com / test123456)');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
