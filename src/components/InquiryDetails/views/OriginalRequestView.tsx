import React from 'react';
import { Badge } from '../../../app/components/ui/badge';
import { Calendar, Users, MapPin, Info, Image as ImageIcon, Briefcase, DollarSign, AlertCircle, Cake, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const DataCard = ({ icon, label, value, highlight = false }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) => (
  <div className="bg-white border border-gray-100 rounded-[28px] p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow group">
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gray-900 group-hover:text-white transition-colors">
        {React.cloneElement(icon as React.ReactElement, { size: 18, strokeWidth: 2.2 })}
      </div>
      <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">{label}</p>
    </div>
    <p className={highlight ? "text-[16px] font-black text-red-500" : "text-[16px] font-black text-gray-900 leading-tight"}>
      {value}
    </p>
  </div>
);

const OriginalRequestView = ({ id }: { id?: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    className="space-y-10 pb-20 font-inter"
  >
    {/* High-Level Brief Card */}
    <div className="bg-gray-900 rounded-[40px] p-8 text-white relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-white/10 transition-colors" />
      <div className="relative">
        <Badge className="bg-white/10 text-white border-none rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4">
          Client Brief
        </Badge>
        <h2 className="text-[24px] font-black leading-tight mb-4 tracking-tight">
          "Modern Spider-Man theme with midnight blue tiers and silver hand-painted webs."
        </h2>
        <div className="flex items-center gap-4 text-white/50 text-[13px] font-bold">
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>Requested 2 days ago</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <span>Ref: {id || 'INQ-8472'}</span>
        </div>
      </div>
    </div>

    {/* Precision Data Grid */}
    <section className="space-y-5">
      <h4 className="text-[17px] font-black text-gray-900 tracking-tight px-1 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
        Core Requirements
      </h4>
      <div className="grid grid-cols-2 gap-4">
        <DataCard icon={<Calendar />} label="Event Date" value="Oct 12, 2025" />
        <DataCard icon={<Users />} label="Guest Count" value="30 - 40 Guests" />
        <DataCard icon={<MapPin />} label="Venue Location" value="Abu Dhabi, UAE" />
        <DataCard icon={<AlertCircle />} label="Sensitivities" value="Strict Nut-Free" highlight />
      </div>
    </section>

    {/* Inspiration Gallery */}
    <section className="space-y-5">
      <div className="flex items-center justify-between px-1">
        <h4 className="text-[17px] font-black text-gray-900 tracking-tight flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
          Inspiration Grid
        </h4>
        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">3 Assets</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
        {[
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400',
          'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=400',
          'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=400'
        ].map((url, i) => (
          <div 
            key={i} 
            className="w-[260px] h-[260px] rounded-[32px] bg-gray-100 border border-gray-100 shrink-0 overflow-hidden group relative active:scale-98 transition-transform shadow-sm"
          >
            <img src={url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-5 right-5 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
              <ImageIcon className="w-5 h-5 text-gray-900" />
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Technical Specifications */}
    <section className="space-y-5">
      <h4 className="text-[17px] font-black text-gray-900 tracking-tight px-1 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
        Technical Profile
      </h4>
      <div className="bg-white border border-gray-100 rounded-[36px] divide-y divide-gray-50 overflow-hidden shadow-sm">
        {[
          { icon: <Info />, label: 'Architecture', value: '3-Tier Sculpted' },
          { icon: <Briefcase />, label: 'Occasion', value: '5th Birthday' },
          { icon: <DollarSign />, label: 'Budget Target', value: '€200 - €350' },
          { icon: <Cake />, label: 'Sponge Profile', value: 'Dark Chocolate' }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="text-gray-400 group-hover:text-gray-900 transition-colors">
                {React.cloneElement(item.icon as React.ReactElement, { size: 18, strokeWidth: 2.5 })}
              </div>
              <span className="text-[14px] font-bold text-gray-400 group-hover:text-gray-500 transition-colors">{item.label}</span>
            </div>
            <span className="text-[15px] font-black text-gray-900 tracking-tight">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

export default OriginalRequestView;
