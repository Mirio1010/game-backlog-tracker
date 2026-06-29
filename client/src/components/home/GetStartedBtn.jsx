import { Link } from "react-router-dom";
import { Magnetic } from "../motion-primitives/magnetic";

const GetStartedBtn = () => {
  return (
    <Link to="/Signup" className="inline-block">
      <button className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 hover:shadow-primary/30">
        <Magnetic
          intensity={0.25}
          actionArea="parent"
          range={150}
          springOptions={{
            stiffness: 100,
            damping: 5,
            mass: 0.25,
          }}
        >
          <span className="inline-block">Get Started</span>
        </Magnetic>
      </button>
    </Link>
  );
};

export default GetStartedBtn;
