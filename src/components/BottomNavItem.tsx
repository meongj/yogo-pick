interface BottomNavItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function BottomNavItem({ icon, label, isActive, onClick }: BottomNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-grey-100 flex cursor-pointer flex-col items-center gap-1 rounded-lg px-4 py-2 transition-colors ${isActive ? "bg-gray-200 font-semibold text-gray-900" : "text-gray-500 hover:bg-gray-100"}`}
    >
      <img src={icon} alt={label} className="h-6 w-6" style={{ imageRendering: "auto" }} />
      <span className="text-xs">{label}</span>
    </button>
  );
}
