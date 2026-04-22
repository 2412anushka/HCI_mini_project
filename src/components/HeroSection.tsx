import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Gourmet dining experience"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-foreground/60" />
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h1 className="font-display text-4xl md:text-6xl font-extrabold text-background mb-4 drop-shadow-lg">
          Savor Every Bite
        </h1>
        <p className="text-lg md:text-xl text-background/90 mb-6 font-body">
          Explore our handcrafted menu made with the freshest ingredients and a passion for flavor.
        </p>
        <a
          href="#menu"
          className="inline-block bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity shadow-lg"
        >
          View Menu
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
