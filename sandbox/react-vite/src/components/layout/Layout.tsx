const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>header</header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
