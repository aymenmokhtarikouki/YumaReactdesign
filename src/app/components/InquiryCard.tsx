import { MoreVertical, Clock, CheckCircle2, MessageSquare, Cake, Calendar, Users, FileText, ChevronRight } from 'lucide-react';

interface Inquiry {
  id: string;
  refId: string;
  title: string;
  eventType: string;
  description: string;
  guests: number;
  readyBy: string;
  requestedOn: string;
  status: string; // Changed from union to string
  quotesReceived: number;
  bestQuote?: string;
  inspirationImage: string;
}

const statusColors: { [key: string]: string } = {
  Pending: 'bg-amber-50 text-amber-700 border-amber-100',
  Quoted: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Received: 'bg-blue-50 text-blue-700 border-blue-100',
  Default: 'bg-gray-50 text-gray-700 border-gray-100',
};

export function InquiryCard({ inquiry, onClick }: { inquiry: Inquiry; onClick: () => void }) {
  const colorClass = statusColors[inquiry.status] || statusColors.Default;
  return (
    <div 
      className="bg-white rounded-2xl p-4 border border-gray-100 active:opacity-70 transition-opacity cursor-pointer"
      onClick={onClick}
    >
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <div>
           <p className="text-[15px] font-extrabold text-gray-900 leading-tight">{inquiry.title}</p>
           <p className="text-[12px] font-medium text-gray-500 mt-0.5">{inquiry.eventType} • {inquiry.guests} guests</p>
        </div>
        <div className={`px-3 py-1 rounded-full border ${colorClass}`}>
          <span className="text-[11px] font-bold uppercase tracking-wider">{inquiry.status}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-3 items-start mb-5">
        <img 
          src={inquiry.inspirationImage} 
          alt={inquiry.title} 
          className="w-16 h-16 rounded-2xl object-cover shrink-0"
        />
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-[13px] text-gray-600 font-medium leading-snug line-clamp-2">
            {inquiry.description}
          </p>
        </div>
      </div>

      {/* Scannable Grid */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Ready By</p>
          <p className="text-[13px] font-bold text-gray-900">{inquiry.readyBy}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Quotes</p>
          <p className="text-[13px] font-bold text-gray-900 text-right">
            {inquiry.quotesReceived > 0 
              ? `${inquiry.quotesReceived} rec. ${inquiry.bestQuote ? `(Best: ${inquiry.bestQuote})` : ''}` 
              : 'Waiting'}
          </p>
        </div>
      </div>
    </div>
  );
}
