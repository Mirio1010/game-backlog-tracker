const MainLayout = ({children}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background text-foreground">
        {children}
    </div>
  );
};
export default MainLayout;
