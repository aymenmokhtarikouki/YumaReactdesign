import { UtensilsCrossed } from 'lucide-react';

interface FloatingActionButtonProps {
  badge?: number;
  onClick?: () => void;
}

export function FloatingActionButton({ badge = 0, onClick }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-5 w-14 h-14 bg-gray-900 rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-gray-800 transition-colors"
    >
      <UtensilsCrossed className="w-6 h-6 text-white" />
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}
