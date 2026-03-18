import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon?: ReactNode;
  onSeeAll?: () => void;
}

export function SectionHeader({ title, subtitle, icon, onSeeAll }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-4 px-4">
      <div className="flex items-start gap-2.5">
        {icon && (
          <div className="w-7 h-7 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-900 shrink-0 mt-0.5">
            {icon}
          </div>
        )}
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[20px] leading-none font-black tracking-tight text-black">{title}</h2>
          <p className="text-[13px] font-medium text-gray-500">{subtitle}</p>
        </div>
      </div>
      {onSeeAll && (
        <button
          onClick={onSeeAll}
          className="text-black font-bold text-[13px] hover:underline decoration-2 underline-offset-4 active:opacity-70 transition-all pb-0.5"
        >
          View all
        </button>
      )}
    </div>
  );
}
