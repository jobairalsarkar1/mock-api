interface BadgeProps {
  icon?: React.ElementType;
  text: string;
}

const CustomBadge = ({ icon: Icon, text }: BadgeProps) => {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm bg-white/10 mb-6 border border-orange-400/20">
      {Icon && <Icon className="w-4 h-4 text-orange-400 font-bold" />}
      {text}
    </div>
  );
};

export default CustomBadge;
