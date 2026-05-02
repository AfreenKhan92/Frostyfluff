import { Link } from 'react-router-dom'

const bakers = [
  {
    name: 'Sarah',
    role: 'Head Baker & Founder',
    bio: 'Master of macarons and believer in too many sprinkles.',
    borderColor: 'border-primary-container',
    roleColor: 'text-primary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2OuZ8U5y5r37ZtSlLyol2qOj2KO-G9ClDRESFbCuJXpt3QsMRhnnIeT6eXKf7bAj9SmZnRtCnnebjoLCgsKhw29Rwoyln--r7eelnQZfKnx5MAMx4VKs3in0wk8gi93RpUApptvyLSQRJCH7XkXPHaGmTcS7xpSiUuSDN9iDhIXPvS0iAOH5DIOw_EbFKAhja0okjdjP3R53KhNdBQkknLkZVXnSEZiH6limjWYFpzWD_qVUxCxBVPJEN6_QcEJcyZ4zlQsbO_WLu',
  },
  {
    name: 'Leo',
    role: 'Pastry Chef',
    bio: 'Turns dough into edible art before you\'ve had your first coffee.',
    borderColor: 'border-secondary-container',
    roleColor: 'text-secondary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKkXO_rIiXR11CmRYfdcz35riOTpOW73kuyxelCOpt1yTZb2xRNCKB2xB9BNnimb8YruoQO7hOEbJ9XSVgmFyuxx5t7UPANQLxWorHP6oGJ0UNJ4_MEoHGg3Z2RHI6Q9QEdIcId7_s5RiMg070-v0H4xcDXA2b18PCsl34-3boAoBG6ICodZ9tB3VdxWCPOE9q_AhjE8kkmCdRjB8bJIQ_ACMSOxSaoatZ9kj_Mk5EKcOAY8DQczV_y00gcLuQb3i5UJWM_uzD211g',
  },
  {
    name: 'Mia',
    role: 'Bread Specialist',
    bio: 'Keeper of the sourdough starter and lover of crusty edges.',
    borderColor: 'border-tertiary-container',
    roleColor: 'text-tertiary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2dWACnb_cb6_NKZo76D0hcndAugDkN5nZaG1Rh0zD2fIMVfz4SVW9C0McOnXP-4s2iekOiWUXeyj0ETmQ7pPEy2CPxWF0PugHkA2T-ZITs5x0o8KnrMlcdA4rMmdUKS2z560bPtmqVwqGG792zoNU3oij0q7MjOEUWR2F3Mslzk5ilEpUCSB2pI2PxlkKfKvkDjffbBo3hbFu0S7ImVDxigsVf00EVJ_sReRLo2R9q2fParCSDp5yQPcnAwWMP2iHID4tD2tPNgUN',
  },
]

export default function AboutPage() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 py-12 space-y-12">
      {/* Our Story Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-surface-container-low rounded-[40px] p-8 md:p-12 shadow-[0_20px_40px_-20px_rgba(255,183,197,0.2)] animate-fade-in-up">
        <div className="space-y-3">
          <h1 className="font-heading text-5xl font-extrabold text-primary leading-tight tracking-tight">
            Baked with Joy,<br />Shared with Love.
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            What started as a tiny kitchen experiment in 2026 has blossomed into Frosty Fluff. We believe that every sprinkle, every dollop of frosting, and every perfectly risen loaf is a tiny celebration. Our mission is simple:
          </p>
          <p className="text-on-surface-variant">
            to bring a little extra sweetness to your everyday moments, using only the finest artisanal ingredients and a whole lot of heart.
          </p>
          <div className="pt-4">
            <span className="inline-block bg-primary-container text-on-primary-container font-bold text-sm px-4 py-2 rounded-full">
              Established 2026
            </span>
          </div>
        </div>
        <div className="relative h-[400px] w-full rounded-[32px] overflow-hidden shadow-[0_15px_30px_-10px_rgba(255,183,197,0.4)]">
          <img alt="Bakery interior" className="absolute inset-0 w-full h-full object-cover object-center" src="/ourstorypage.jpg" />
        </div>
      </section>

      {/* Handcrafted Gallery Bento Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-heading text-3xl font-bold text-primary">Handcrafted with Love</h2>
          <p className="text-on-surface-variant">Peek behind the counter at our daily rituals.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {/* Bento Item 1 */}
          <div className="md:col-span-2 rounded-[32px] overflow-hidden relative shadow-[0_10px_20px_-10px_rgba(255,183,197,0.3)] group">
            <img
              alt="Kneading dough"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtX3cVXbY9mWCorl76avVLX5BGsoig4ImICuJEkWjeCnefC7qSkgdPr_eNI94R-A9Cv3L7xDSwHvK03yMmes2v7Hu3ygdsFsX4-xxsukOaZ3ooh8vqpyEeA5umUSzagu_jUDiXkJU5DOFBql2f6phMRSz9U1aDgGgM7jPjVHU3XY2ecSAWrpf5vx5mtOORHCGhsqUz8mvM22ReHjutMqpM_1g3UtD2h1rY3BVs6RYhJQheVClb_iK2sqNCM1QQLEhEms7tGq9jQJYD"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="font-heading text-2xl font-bold">The Perfect Knead</span>
            </div>
          </div>

          {/* Bento Item 2 - Card */}
          <div className="rounded-[32px] overflow-hidden relative shadow-[0_15px_30px_-10px_rgba(255,183,197,0.4)] group bg-primary-container/30 border-2 border-primary-container p-8 flex flex-col justify-center items-center text-center transition-all duration-300 hover:scale-[1.02] active:scale-95">
            <div className="bg-white/50 p-4 rounded-full mb-4 shadow-sm">
              <span className="material-symbols-outlined filled text-primary text-6xl block">favorite</span>
            </div>
            <h3 className="font-heading text-3xl font-bold text-primary leading-tight mb-2">100% Real Butter</h3>
            <div className="h-1 w-12 bg-primary/20 rounded-full mb-3" />
            <p className="text-on-primary-container font-medium">No shortcuts, just rich, artisanal flavor in every single bite.</p>
          </div>

          {/* Bento Item 3 */}
          <div className="rounded-[32px] overflow-hidden relative shadow-[0_10px_20px_-10px_rgba(255,183,197,0.3)] group">
            <img
              alt="Frosting cake"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDerFrkDgBjWeikqEo-yPkmxJSXeu7MMIw-N4NGc6gxwdiAi-iy4he-i8RfncgmGDk6cbLAWCM2QKh4KZT2amRB1eKsEfCl4zEDBdRul1rwrB7Kw95yaqD95GxqBPTwoeiZCte54EQ_mhR9Vvp75L5Y-f_yRbZl-_j9AqdCYOK_g8BwqknV19qPL4iV1StwnX4zGZCbZv3POvxqHOkhpkVSjktYlq2gPyFbzKeGGiY3pou6P561LNSNniiaQbK_zz6YTspj_zFB9uJT"
            />
          </div>

          {/* Bento Item 4 */}
          <div className="md:col-span-2 rounded-[32px] overflow-hidden relative shadow-[0_10px_20px_-10px_rgba(255,183,197,0.3)] group bg-secondary-container p-8 flex items-center">
            <div className="w-2/3 pr-6">
              <h3 className="font-heading text-2xl font-bold text-secondary">Early Mornings, Fresh Bakes</h3>
              <p className="text-on-secondary-container mt-2">
                Our ovens fire up at 4 AM every single day so you get the warmest, softest pastries imaginable.
              </p>
            </div>
            <div className="w-1/3 flex justify-center">
              <span className="material-symbols-outlined filled text-secondary text-6xl">wb_twilight</span>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Bakers */}
      <section className="space-y-6 bg-surface-container-highest rounded-[40px] p-8 md:p-12 shadow-[0_20px_40px_-20px_rgba(255,183,197,0.15)]">
        <div className="text-center space-y-2 mb-8">
          <h2 className="font-heading text-3xl font-bold text-primary">Meet The Team Members</h2>
          <p className="text-on-surface-variant">The magic makers behind the counter.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {bakers.map((baker, i) => (
            <div
              key={i}
              className="bg-surface rounded-3xl p-6 text-center shadow-[0_10px_20px_-10px_rgba(255,183,197,0.2)] hover:scale-105 hover:shadow-[0_15px_30px_-10px_rgba(255,183,197,0.4)] transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <div className={`w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 ${baker.borderColor}`}>
                <img alt={baker.name} className="w-full h-full object-cover" src={baker.image} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-on-surface">{baker.name}</h3>
              <p className={`font-bold text-sm ${baker.roleColor} mb-2`}>{baker.role}</p>
              <p className="text-on-surface-variant text-sm">{baker.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
