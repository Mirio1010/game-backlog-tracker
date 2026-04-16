const MainLayout = ({children}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-slate-900 to-black text-white">
        {children}
    </div>
  );
};
export default MainLayout;
