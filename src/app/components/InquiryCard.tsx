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
      className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] active:scale-[0.98] transition-all cursor-pointer"
      onClick={onClick}
    >
      {/* Header Row */}
      <div className="flex justify-between items-start mb-4">
        <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">{inquiry.refId}</span>
        <div className={`px-3 py-1 rounded-full border ${colorClass}`}>
          <span className="text-[11px] font-bold uppercase tracking-wider">{inquiry.status}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-4 mb-5">
        <img 
          src={inquiry.inspirationImage} 
          alt={inquiry.title} 
          className="w-20 h-20 rounded-2xl object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-[17px] font-extrabold text-gray-900 leading-tight mb-1 truncate">{inquiry.title}</h3>
          <p className="text-[13px] text-gray-500 font-medium leading-snug line-clamp-2">
            {inquiry.eventType} • {inquiry.guests} guests • {inquiry.description}
          </p>
        </div>
      </div>

      {/* Scannable Grid */}
      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-2xl mb-4">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Ready By</p>
          <p className="text-[13px] font-bold text-gray-900">{inquiry.readyBy}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Quotes</p>
          <p className="text-[13px] font-bold text-gray-900">
            {inquiry.quotesReceived > 0 
              ? `${inquiry.quotesReceived} received ${inquiry.bestQuote ? `(Best: ${inquiry.bestQuote})` : ''}` 
              : 'Waiting for quotes'}
          </p>
        </div>
      </div>

      {/* Action Row */}
      <button className="w-full h-11 bg-gray-900 text-white rounded-2xl font-bold text-[14px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
        {inquiry.status === 'Quoted' ? 'Review Quotes' : 'Edit Inquiry'}
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
