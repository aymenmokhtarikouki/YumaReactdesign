import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, MessageSquare, ChevronRight } from 'lucide-react';

// Mock Data for a single inquiry
const inquiry = {
  id: "INQ-8472",
  status: "Quoted", // 'Pending', 'Quoted', 'Accepted'
  title: "Birthday Celebration",
  date: "Oct 12, 2025",
  details: "Vanilla Sponge, Spider-Man theme, 30 guests, extra chocolate filling.",
};

export default function InquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white p-4 flex items-center gap-3 border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ArrowLeft /></button>
        <h1 className="text-[18px] font-bold">Inquiry Details</h1>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
           <span className="text-xs font-bold text-gray-400">{inquiry.id}</span>
           <h2 className="text-2xl font-extrabold mt-1">{inquiry.title}</h2>
           <p className="text-gray-600 mt-2">{inquiry.details}</p>
        </div>
        {/* Additional sections would go here */}
      </main>

      {/* Sticky Action Bar */}
      <StickyActionBar status={inquiry.status as 'Pending' | 'Quoted' | 'Accepted'} />
    </div>
  );
}

// Reusable Sticky Action Bar Sub-component
function StickyActionBar({ status }: { status: 'Pending' | 'Quoted' | 'Accepted' }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-3">
      {status === 'Pending' && (
        <>
          <button className="flex-1 h-12 rounded-2xl font-bold border border-gray-200 text-gray-900 active:bg-gray-50">Cancel</button>
          <button className="flex-1 h-12 rounded-2xl font-bold border border-gray-200 text-gray-900 active:bg-gray-50">Edit Details</button>
        </>
      )}
      {status === 'Quoted' && (
        <button className="flex-1 h-12 rounded-2xl font-bold border border-gray-200 text-gray-900 active:bg-gray-50 flex items-center justify-center gap-2">
          <MessageSquare className="w-5 h-5" /> Message Support
        </button>
      )}
      {status === 'Accepted' && (
        <button className="flex-1 h-12 rounded-2xl font-bold bg-gray-900 text-white active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
          <MessageSquare className="w-5 h-5" /> Message Kitchen
        </button>
      )}
    </div>
  );
}
