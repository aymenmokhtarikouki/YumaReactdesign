import React from 'react';
import { Badge } from '../../../app/components/ui/badge';
import { Calendar, Users, MapPin, AlertCircle, Info, Briefcase, DollarSign, Cake, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const DataCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 shrink-0">
      {React.cloneElement(icon as React.ReactElement, { size: 18, strokeWidth: 2.2 })}
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
      <span className="text-[14px] font-extrabold text-gray-900">{value}</span>
    </div>
  </div>
);

const OriginalRequestView = ({ id }: { id?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="space-y-6 pb-20 font-inter"
  >
    {/* Brief Header - Subscription Status DNA */}
    <div className="bg-gray-900 rounded-2xl p-6 text-white">
      <h2 className="text-[16px] font-extrabold leading-tight mb-4 tracking-tight">
        "Modern Spider-Man theme with midnight blue tiers and silver hand-painted webs."
      </h2>
      <div className="flex items-center gap-4 text-white/60 text-[12px] font-bold">
         <span className="flex items-center gap-1.5"><Clock size={12} /> Requested 2 days ago</span>
         <span>•</span>
         <span>Ref: {id || 'INQ-8472'}</span>
      </div>
    </div>

    {/* Core Requirements - Grid Card DNA */}
    <section>
      <h4 className="text-[15px] font-extrabold text-gray-900 mb-3 px-1">Core Requirements</h4>
      <div className="grid grid-cols-2 gap-3">
        <DataCard icon={<Calendar />} label="Event Date" value="Oct 12, 2025" />
        <DataCard icon={<Users />} label="Guests" value="30 - 40" />
        <DataCard icon={<MapPin />} label="Venue" value="Abu Dhabi" />
        <DataCard icon={<AlertCircle />} label="Allergens" value="Nut-Free" />
      </div>
    </section>

    {/* Specifications Table - List DNA */}
    <section>
      <h4 className="text-[15px] font-extrabold text-gray-900 mb-3 px-1">Technical Profile</h4>
      <div className="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-50 shadow-sm">
        {[
          { icon: <Info />, label: 'Architecture', value: '3-Tier Sculpted' },
          { icon: <Briefcase />, label: 'Occasion', value: '5th Birthday' },
          { icon: <DollarSign />, label: 'Budget Target', value: '€200 - €350' },
          { icon: <Cake />, label: 'Sponge Profile', value: 'Dark Chocolate' }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="text-gray-400">
                {React.cloneElement(item.icon as React.ReactElement, { size: 16, strokeWidth: 2 })}
              </div>
              <span className="text-[14px] font-bold text-gray-500">{item.label}</span>
            </div>
            <span className="text-[14px] font-black text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

export default OriginalRequestView;
