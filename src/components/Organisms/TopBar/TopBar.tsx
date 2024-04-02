import Logo from "@/components/Molecules/Logo/Logo";
import Navigation from "@/components/Molecules/Navigation/Navigation";

const TopBar = () => {
  return (
    <section className="topbar">
      <Logo />
      <Navigation />
    </section>
  );
};

export default TopBar;
