import { Tilt } from "../motion-primitives/tilt";
import { AnimatedNumber } from "../motion-primitives/animated-number";
const StatCard = ({ title, value, subtitle }) => {
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

        <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
          <AnimatedNumber
            as="h2"
            value={value}
            springOptions={{
              stiffness: 40,
              damping: 20,
            }}
          />
        </h2>

        {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
      </div>
    </Tilt>
  );
};

export default StatCard;
