"use client";

import Link from 'next/link';

const bakers = [
  {
    name: 'Sarah',
    role: 'Head Baker & Founder',
    bio: 'Master of macarons and believer in too many sprinkles.',
    borderColor: 'border-bakery-pink',
    roleColor: 'text-bakery-brown',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2OuZ8U5y5r37ZtSlLyol2qOj2KO-G9ClDRESFbCuJXpt3QsMRhnnIeT6eXKf7bAj9SmZnRtCnnebjoLCgsKhw29Rwoyln--r7eelnQZfKnx5MAMx4VKs3in0wk8gi93RpUApptvyLSQRJCH7XkXPHaGmTcS7xpSiUuSDN9iDhIXPvS0iAOH5DIOw_EbFKAhja0okjdjP3R53KhNdBQkknLkZVXnSEZiH6limjWYFpzWD_qVUxCxBVPJEN6_QcEJcyZ4zlQsbO_WLu',
  },
  {
    name: 'Leo',
    role: 'Pastry Chef',
    bio: 'Turns dough into edible art before you\'ve had your first coffee.',
    borderColor: 'border-bakery-gold',
    roleColor: 'text-bakery-gold',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKkXO_rIiXR11CmRYfdcz35riOTpOW73kuyxelCOpt1yTZb2xRNCKB2xB9BNnimb8YruoQO7hOEbJ9XSVgmFyuxx5t7UPANQLxWorHP6oGJ0UNJ4_MEoHGg3Z2RHI6Q9QEdIcId7_s5RiMg070-v0H4xcDXA2b18PCsl34-3boAoBG6ICodZ9tB3VdxWCPOE9q_AhjE8kkmCdRjB8bJIQ_ACMSOxSaoatZ9kj_Mk5EKcOAY8DQczV_y00gcLuQb3i5UJWM_uzD211g',
  },
  {
    name: 'Mia',
    role: 'Bread Specialist',
    bio: 'Keeper of the sourdough starter and lover of crusty edges.',
    borderColor: 'border-bakery-brown',
    roleColor: 'text-bakery-brown',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2dWACnb_cb6_NKZo76D0hcndAugDkN5nZaG1Rh0zD2fIMVfz4SVW9C0McOnXP-4s2iekOiWUXeyj0ETmQ7pPEy2CPxWF0PugHkA2T-ZITs5x0o8KnrMlcdA4rMmdUKS2z560bPtmqVwqGG792zoNU3oij0q7MjOEUWR2F3Mslzk5ilEpUCSB2pI2PxlkKfKvkDjffbBo3hbFu0S7ImVDxigsVf00EVJ_sReRLo2R9q2fParCSDp5yQPcnAwWMP2iHID4tD2tPNgUN',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 bg-bakery-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white rounded-[40px] p-8 md:p-16 shadow-xl animate-fade-in-up">
          <div className="space-y-6">
            <h1 className="text-5xl font-serif text-bakery-brown leading-tight">
              Baked with Joy,<br />Shared with Love.
            </h1>
            <p className="text-lg text-bakery-brown/70 leading-relaxed">
              What started as a tiny kitchen experiment has blossomed into Frosty Fluffs. We believe that every sprinkle, every dollop of frosting, and every perfectly risen loaf is a tiny celebration.
            </p>
            <p className="text-bakery-brown/70 leading-relaxed">
              Our mission is simple: to bring a little extra sweetness to your everyday moments, using only the finest artisanal ingredients.
            </p>
            <div className="pt-4">
              <span className="inline-block bg-bakery-pink text-bakery-brown font-bold text-sm px-6 py-2 rounded-full shadow-sm">
                Established 2026
              </span>
            </div>
          </div>
          <div className="relative h-[500px] w-full rounded-[32px] overflow-hidden shadow-2xl">
            <img alt="Bakery interior" className="absolute inset-0 w-full h-full object-cover" src="/images/baker.png" />
          </div>
        </section>

        <section className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-serif font-bold text-bakery-brown">Handcrafted with Love</h2>
            <p className="text-bakery-brown/60">Peek behind the counter at our daily rituals.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[300px]">
            <div className="md:col-span-2 rounded-[40px] overflow-hidden relative shadow-lg group">
              <img
                alt="Kneading dough"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <span className="text-3xl font-serif font-bold">The Perfect Knead</span>
              </div>
            </div>

            <div className="rounded-[40px] overflow-hidden relative shadow-lg group bg-bakery-pink p-10 flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-all">
              <div className="bg-white/50 p-6 rounded-full mb-6 shadow-sm">
                <span className="material-symbols-outlined filled text-bakery-brown text-6xl">favorite</span>
              </div>
              <h3 className="text-3xl font-serif font-bold text-bakery-brown leading-tight mb-2">100% Real Butter</h3>
              <p className="text-bakery-brown/70">No shortcuts, just rich, artisanal flavor in every single bite.</p>
            </div>

            <div className="rounded-[40px] overflow-hidden relative shadow-lg group">
              <img
                alt="Bakery"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800"
              />
            </div>

            <div className="md:col-span-2 rounded-[40px] overflow-hidden relative shadow-lg group bg-bakery-brown p-10 flex items-center text-white">
              <div className="w-2/3 pr-8">
                <h3 className="text-3xl font-serif font-bold">Early Mornings, Fresh Bakes</h3>
                <p className="opacity-80 mt-4 text-lg">
                  Our ovens fire up at 4 AM every single day so you get the warmest, softest pastries imaginable.
                </p>
              </div>
              <div className="w-1/3 flex justify-center">
                <span className="material-symbols-outlined filled text-bakery-gold text-8xl">wb_twilight</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-12 bg-white rounded-[40px] p-8 md:p-16 shadow-xl">
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-4xl font-serif font-bold text-bakery-brown">Meet Our Bakers</h2>
            <p className="text-bakery-brown/60">The magic makers behind the counter.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {bakers.map((baker, i) => (
              <div
                key={i}
                className="bg-bakery-cream rounded-3xl p-8 text-center shadow-sm hover:scale-105 hover:shadow-xl transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <div className={`w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 ${baker.borderColor} shadow-md`}>
                  <img alt={baker.name} className="w-full h-full object-cover" src={baker.image} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-bakery-brown">{baker.name}</h3>
                <p className={`font-bold text-sm ${baker.roleColor} mb-4 tracking-widest uppercase`}>{baker.role}</p>
                <p className="text-bakery-brown/60 text-sm">{baker.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
