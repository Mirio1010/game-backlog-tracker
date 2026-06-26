import { Tilt } from "../motion-primitives/tilt";
const StatCard = ({ title, value, subtitle }) => {
  return (
    <Tilt
      rotationFactor={9}
      springOptions={{
        stiffness: 180,
        damping: 30,
      }}
    >
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-white/10 sm:p-5">
        <p className="text-sm font-medium text-white/50">{title}</p>

        <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          {value}
        </h2>

        {subtitle && <p className="mt-2 text-sm text-white/40">{subtitle}</p>}
      </div>
    </Tilt>
  );
};

export default StatCard;
