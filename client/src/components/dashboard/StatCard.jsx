import { Tilt } from "../motion-primitives/tilt";
import { AnimatedNumber } from "../motion-primitives/animated-number";
const StatCard = ({ title, value, subtitle, suffix = "" }) => {
  return (
    <Tilt
      rotationFactor={9}
      springOptions={{
        stiffness: 180,
        damping: 30,
      }}
    >
      <div className="rounded-2xl border border-border bg-card p-4 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-white/10 sm:p-5">
        <p className="text-sm font-medium text-muted">{title}</p>

        <h2 className="mt-3 inline-flex items-baseline text-2xl font-bold text-foreground sm:text-3xl">
          <AnimatedNumber
            value={value}
            springOptions={{
              stiffness: 40,
              damping: 20,
            }}
          />
          <span>{suffix}</span>
        </h2>

        {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
      </div>
    </Tilt>
  );
};

export default StatCard;
