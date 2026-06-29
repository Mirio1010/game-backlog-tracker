const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-foreground">
      {children}
    </div>
  );
};
export default MainLayout;
