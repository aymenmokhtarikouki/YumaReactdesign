interface SectionHeaderProps {
  title: string;
  subtitle: string;
  onSeeAll?: () => void;
}

export function SectionHeader({ title, subtitle, onSeeAll }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-3 px-5">
      <div>
        <h2 className="text-xl font-bold mb-0.5">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      {onSeeAll && (
        <button
          onClick={onSeeAll}
          className="text-teal-500 font-medium text-sm mt-1 hover:text-teal-600"
        >
          See all
        </button>
      )}
    </div>
  );
}
