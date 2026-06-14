import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { cn } from '../../app/components/ui/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../app/components/ui/dropdown-menu';

interface TabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
  id?: string;
  onBack?: () => void;
  isDetailView?: boolean;
}

export const Tabs = ({ activeTab, onChange, id, onBack, isDetailView }: TabsProps) => {
  const tabs = [
    { id: 'Quote', label: 'Offer' },
    { id: 'Request', label: 'Details' }
  ];

  const navigate = useNavigate();

  return (
    <div className="bg-white sticky top-0 z-50">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 h-[64px] border-b border-gray-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={isDetailView ? onBack : () => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-900 active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5px]" />
          </button>
          <div>
            <h1 className="text-[17px] font-extrabold text-gray-900 leading-none">
              {isDetailView ? 'Offer Details' : 'Inquiry Details'}
            </h1>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">{id || 'INQ-0000'}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-10 h-10 flex items-center justify-center text-gray-400 active:bg-gray-50 rounded-full transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-white rounded-2xl p-1.5 shadow-xl border-gray-100">
              <DropdownMenuItem className="rounded-xl h-11 px-3 gap-3 font-bold text-gray-700">
                <Pencil className="w-4 h-4 text-gray-400" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" className="rounded-xl h-11 px-3 gap-3 font-bold">
                <Trash2 className="w-4 h-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tab Bar - Only show if not in a specific detail view */}
      {!isDetailView && (
        <div className="flex px-4 pt-2 border-b border-gray-100 bg-white">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "flex-1 pb-3 text-[14px] font-bold transition-all relative",
                activeTab === tab.id ? "text-gray-900" : "text-gray-400"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-900 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
