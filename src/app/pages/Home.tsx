import { useState } from 'react';
import { Search, Bell, SlidersHorizontal, CalendarDays, Grid2x2 as Grid, Leaf, User, Truck, Utensils, Zap, Salad, Map as MapIcon, ChevronDown } from 'lucide-react';
import { FoodCard } from '../components/FoodCard';
import { SectionHeader } from '../components/SectionHeader';
import { BottomNav } from '../components/BottomNav';
import { useNavigate } from 'react-router';

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Burgers', 'Pizza', 'Healthy', 'Asian', 'Pasta'];

  const weeklyPlans = [
    {
      id: 'plan-1',
      title: 'Balanced Week',
      provider: 'Boname Restaurant',
      price: '€45/wk',
      meals: '5 meals',
      icon: <Leaf className="w-8 h-8 text-white mb-2" />,
      type: 'Meal Plan',
      badge: 'Build Your Own',
      image: "https://images.unsplash.com/photo-1768326119231-bf064c1b8fdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxhbmNlZCUyMGRpZXQlMjBtZWFsJTIwcHJlcCUyMGJvd2x8ZW58MXx8fHwxNzczNjI1NjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 'plan-2',
      title: 'Power Protein',
      provider: 'Muscle Kitchen',
      price: '€60/wk',
      meals: '7 meals',
      icon: <Zap className="w-8 h-8 text-white mb-2" />,
      type: 'Keto Plan',
      badge: 'High Protein',
      image: "https://images.unsplash.com/photo-1676037150429-77d231b14c4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwcHJvdGVpbiUyMGtldG8lMjBtZWFsJTIwc3RlYWslMjBlZ2dzfGVufDF8fHx8MTc3MzYyNTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 'plan-3',
      title: 'Plant Based',
      provider: 'Green Bowl',
      price: '€40/wk',
      meals: '5 meals',
      icon: <Salad className="w-8 h-8 text-white mb-2" />,
      type: 'Vegan Plan',
      badge: 'Chef Curated',
      image: "https://images.unsplash.com/photo-1692973751635-3ccf5526fc45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdhbiUyMHBsYW50JTIwYmFzZWQlMjBzYWxhZCUyMGJvd2x8ZW58MXx8fHwxNzczNjI1NjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const kungPaoImage = "https://images.unsplash.com/photo-1605704922285-e82455dba38b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdW5nJTIwcGFvJTIwY2hpY2tlbnxlbnwxfHx8fDE3NzM2MTE5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const vietnameseImage = "https://images.unsplash.com/photo-1701480253822-1842236c9a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwcGhvJTIwYm93bHxlbnwxfHx8fDE3NzM1OTM4NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const capresesaladImage = "https://images.unsplash.com/photo-1769458313937-b5ad8f84942e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXByZXNlJTIwc2FsYWQlMjB0b21hdG9lcyUyMG1venphcmVsbGElMjBiYXNpbHxlbnwxfHx8fDE3NzM2MDk4NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const kebabImage = "https://images.unsplash.com/photo-1749802585605-a459271b4358?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZWJhYiUyMHdyYXAlMjBzYW5kd2ljaCUyMG1lYXR8ZW58MXx8fHwxNzczNjA5ODUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const margheritaImage = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMG1hcmdoZXJpdGF8ZW58MXx8fHwxNzczNTI5NDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const carbonaraImage = "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYXxlbnwxfHx8fDE3NzM1NjIwMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const burgerImage = "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBhbmQlMjBmcmllc3xlbnwxfHx8fDE3NzM1NjI2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const sushiImage = "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJvbGx8ZW58MXx8fHwxNzczNjEwMTM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const cakeImage1 = "https://images.unsplash.com/photo-1582052342644-d3269d382186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBjdXN0b20lMjBiaXJ0aGRheSUyMGNha2V8ZW58MXx8fHwxNzczNjkzNDc5fDA&ixlib=rb-4.1.0&q=80&w=1080";
  const cakeImage2 = "https://images.unsplash.com/photo-1697320846048-43f9631634c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW5jeSUyMG1pbmltYWwlMjBhZXN0aGV0aWMlMjBiaXJ0aGRheSUyMGNha2UlMjBjdXN0b218ZW58MXx8fHwxNzczNjkzNTM3fDA&ixlib=rb-4.1.0&q=80&w=1080";

  return (
    <div className="min-h-screen bg-white pb-24 font-inter text-gray-900 selection:bg-gray-900 selection:text-white">
      {/* Premium Solid Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl pt-4 pb-2 border-b border-gray-100">
        <div className="px-4 flex items-center justify-between mb-3">
          {/* Simplified Location - Just Address and Arrow */}
          <button className="flex items-center gap-1 active:scale-95 transition-transform">
            <h1 className="text-[16px] font-extrabold text-gray-900 tracking-tight">Paris, 11e Arr.</h1>
            <ChevronDown className="w-[18px] h-[18px] text-gray-900 mt-0.5" />
          </button>

          <div className="flex items-center gap-1">
            <button className="relative p-1.5 flex items-center justify-center active:scale-95 transition-transform" title="Map View">
              <MapIcon className="w-[20px] h-[20px] text-gray-900" />
            </button>
            <button className="relative p-1.5 flex items-center justify-center active:scale-95 transition-transform">
              <Bell className="w-[20px] h-[20px] text-gray-900" />
              <span className="absolute top-[4px] right-[4px] w-[8px] h-[8px] bg-rose-500 rounded-2xl border-2 border-white"></span>
            </button>
            <button className="relative p-1.5 flex items-center justify-center active:scale-95 transition-transform">
              <SlidersHorizontal className="w-[20px] h-[20px] text-gray-900" />
            </button>
          </div>
        </div>

        {/* Search Bar - Solid Premium */}
        <div className="px-4 mb-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-[18px] h-[18px] text-gray-400 group-focus-within:text-gray-900 transition-colors" />
            <input
              type="text"
              placeholder="Search dishes, ingredients, or cooks"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-[36px] pr-4 py-3 bg-gray-50/80 rounded-2xl text-[14px] font-medium text-gray-900 placeholder:text-gray-400 focus:bg-gray-50 focus:outline-none transition-all duration-300"
            />
          </div>
        </div>

        {/* Categories - Sleek Text Pills */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide px-4 pb-2 pt-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 rounded-2xl text-[13px] font-semibold whitespace-nowrap active:scale-95 transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-transparent text-gray-900 underline decoration-2 underline-offset-4'
                  : 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-4 space-y-8 pb-10">
        {/* Weekly Plans Section */}
        <section>
          <SectionHeader
            title="Weekly Plans"
            subtitle="Curated meal plans, delivered weekly"
            icon={<CalendarDays className="w-4 h-4 text-gray-900" />}
          />
          <div className="flex gap-4 overflow-x-auto px-4 pb-3 pt-1 scrollbar-hide">
            {weeklyPlans.map((plan) => (
              <div key={plan.id} className="w-[260px] shrink-0 group cursor-pointer" onClick={() => navigate(`/plan/${plan.id}`)}>
                {/* Plan Card Background Area */}
                <div className="relative bg-gray-900 rounded-2xl h-[140px] p-3 flex flex-col justify-between mb-3 overflow-hidden group-active:scale-[0.98] transition-all">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img src={plan.image} alt={plan.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
                  </div>

                  <div className="flex justify-between items-start z-10 relative">
                    <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[11px] font-bold px-2.5 py-1 rounded-2xl flex items-center gap-1.5">
                      <Grid className="w-3 h-3" />
                      {plan.badge}
                    </span>
                  </div>
                  
                  {/* Center Content Absolute inside Relative */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center mt-1 pointer-events-none z-10 w-full">
                    {plan.icon}
                    <span className="text-[13px] font-extrabold text-white tracking-wide">{plan.type}</span>
                  </div>

                  <div className="flex justify-end z-10 relative">
                    <button className="bg-white/90 backdrop-blur-md text-gray-900 text-[12px] font-bold px-3 py-1.5 rounded-2xl group-hover:bg-white transition-colors pointer-events-none">
                      View Plan
                    </button>
                  </div>
                </div>

                {/* Plan Info Area */}
                <div className="px-1">
                  <h3 className="text-[15px] font-extrabold text-gray-900 leading-tight mb-1.5 group-hover:underline decoration-2 underline-offset-4">{plan.title}</h3>
                  <div className="flex items-center gap-2 text-[13px] font-medium text-gray-500 mb-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span className="truncate">{plan.provider}</span>
                    <span className="text-gray-300 shrink-0">•</span>
                    <Truck className="w-3.5 h-3.5 shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 text-[13px]">
                    <span className="font-extrabold text-gray-900">{plan.price}</span>
                    <span className="text-gray-300">•</span>
                    <Utensils className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-500 font-medium">{plan.meals}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Cakes Section */}
        <section>
          <SectionHeader
            title="Custom Cakes"
            subtitle="Perfect for your special occasions"
            onSeeAll={() => console.log('See all')}
          />
          <div className="flex gap-4 overflow-x-auto px-4 pb-3 pt-1 scrollbar-hide">
            <FoodCard
              id="8"
              image={cakeImage1}
              name="Floral Buttercream Dream"
              cook="Sarah's Bakehouse"
              location="Paris 11e, 3.5km"
              price="From €65.00"
              rating={5.0}
              status="AVAILABLE NOW"
              isFavorite={false}
              onClick={() => navigate('/cake/1')}
            />
            <FoodCard
              id="9"
              image={cakeImage2}
              name="Minimalist Gold Leaf"
              cook="L'Atelier Sucré"
              location="Paris 3e, 1.2km"
              price="From €85.00"
              rating={4.9}
              status="AVAILABLE NOW"
              isFavorite={true}
              onClick={() => navigate('/cake/2')}
            />
          </div>
        </section>

        {/* Popular Today Section */}
        <section>
          <SectionHeader
            title="Popular Today"
            subtitle="Highly rated by the community"
            onSeeAll={() => console.log('See all')}
          />
          <div className="flex gap-4 overflow-x-auto px-4 pb-3 pt-1 scrollbar-hide">
            <FoodCard
              id="1"
              image={kungPaoImage}
              name="Kung Pao Chicken"
              cook="Ibrahim B."
              location="Strasbourg, 1.2km"
              price="€10.31"
              rating={4.8}
              status="AVAILABLE NOW"
              isFavorite={true}
              onClick={() => navigate('/food/1')}
            />
            <FoodCard
              id="2"
              image={vietnameseImage}
              name="Pho Bo"
              cook="Mai T."
              location="Paris 11e, 0.8km"
              price="€13.61"
              rating={4.7}
              status="LOW STOCK"
              isFavorite={false}
              onClick={() => navigate('/food/2')}
            />
            <FoodCard
              id="3"
              image={sushiImage}
              name="Spicy Tuna Roll"
              cook="Kenji S."
              location="Paris 3e, 2.1km"
              price="€15.50"
              rating={4.9}
              status="AVAILABLE NOW"
              isFavorite={true}
              onClick={() => navigate('/food/3')}
            />
          </div>
        </section>

        {/* Under €8 Section */}
        <section>
          <SectionHeader
            title="Under €8"
            subtitle="Budget-friendly options"
            onSeeAll={() => console.log('See all')}
          />
          <div className="flex gap-4 overflow-x-auto px-4 pb-3 pt-1 scrollbar-hide">
            <FoodCard
              id="4"
              image={capresesaladImage}
              name="Caprese Salad"
              cook="Giulia R."
              location="Home Kitchen, 0.5km"
              price="€6.50"
              rating={4.5}
              status="AVAILABLE NOW"
              isFavorite={true}
              onClick={() => navigate('/food/4')}
            />
            <FoodCard
              id="5"
              image={kebabImage}
              name="Chicken Kebab"
              cook="Tarik O."
              location="Paris 10e, 1.5km"
              price="€7.50"
              rating={4.3}
              status="AVAILABLE NOW"
              isFavorite={false}
              onClick={() => navigate('/food/5')}
            />
          </div>
        </section>

        {/* Near You Section */}
        <section>
          <SectionHeader
            title="Near You"
            subtitle="Discover local flavors"
            onSeeAll={() => console.log('See all')}
          />
          <div className="flex gap-4 overflow-x-auto px-4 pb-3 pt-1 scrollbar-hide">
            <FoodCard
              id="6"
              image={carbonaraImage}
              name="Truffle Pasta"
              cook="Marco V."
              location="Paris 9e, 1.1km"
              price="€18.00"
              rating={4.9}
              status="LOW STOCK"
              isFavorite={true}
              onClick={() => navigate('/food/6')}
            />
            <FoodCard
              id="7"
              image={burgerImage}
              name="Double Cheese Fries"
              cook="Alex D."
              location="Paris 2e, 0.3km"
              price="€5.50"
              rating={4.2}
              status="AVAILABLE NOW"
              isFavorite={false}
              onClick={() => navigate('/food/7')}
            />
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          if (tab === 'orders') navigate('/orders');
          else if (tab === 'cart') navigate('/cart');
          else if (tab === 'chat') navigate('/chat');
          else setActiveTab(tab);
        }} 
        chatBadge={3} 
      />
    </div>
  );
}
