import { Link } from "react-router-dom";
const GetStartedBtn = () => {
  return (
    <Link to="/Signup">
      <button className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400">
        Get Started
      </button>
    </Link>
  );
}
export default GetStartedBtn;