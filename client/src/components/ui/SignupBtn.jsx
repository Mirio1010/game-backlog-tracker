import { Link } from "react-router-dom";

const SignupBtn = () => {
  return (
    <Link to="/Signup">
      <button className="whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition cursor-pointer hover:bg-primary/60">
        Signup
      </button>
    </Link>
  );
};

export default SignupBtn;
