const StatCard = ({ title, value, subtitle }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-white/10">
      <p className="text-sm font-medium text-white/50">{title}</p>

      <h2 className="mt-3 text-3xl font-bold text-white">{value}</h2>

      {subtitle && <p className="mt-2 text-sm text-white/40">{subtitle}</p>}
    </div>
  );
};

export default StatCard;
