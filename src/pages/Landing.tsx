import { Link } from "react-router-dom";
import { UtensilsCrossed, Clock, Award, MapPin } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="Gourmet dining" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/65" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <div className="flex items-center justify-center gap-2 mb-6">
            <UtensilsCrossed className="h-10 w-10 text-primary" />
            <span className="font-display text-2xl font-bold text-background">Savory Bites</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold text-background mb-6 drop-shadow-lg">
            A Culinary Journey Awaits
          </h1>
          <p className="text-lg md:text-xl text-background/90 mb-8 max-w-xl mx-auto">
            Experience exquisite flavors crafted by our passionate chefs using the finest locally-sourced ingredients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="inline-block bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity shadow-lg text-lg"
            >
              Explore Menu
            </Link>
            <a
              href="#about"
              className="inline-block border-2 border-background text-background font-semibold px-8 py-3 rounded-full hover:bg-background/10 transition-colors text-lg"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Premium Quality", desc: "Only the finest ingredients make it to your plate." },
              { icon: Clock, title: "Quick Service", desc: "Fresh meals prepared and served with care and speed." },
              { icon: MapPin, title: "Cozy Ambiance", desc: "A warm and inviting atmosphere for every occasion." },
            ].map((f) => (
              <div key={f.title} className="text-center p-8 rounded-xl border border-border">
                <f.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Our Story</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Founded in 2020, Savory Bites is a celebration of culinary artistry. Our chefs blend traditional techniques with modern creativity, bringing you a menu that surprises and delights with every dish.
          </p>
          <Link
            to="/menu"
            className="inline-block bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            View Our Menu
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Visit Us</h2>
          <p className="text-muted-foreground mb-2">123 Flavor Street, Gourmet City</p>
          <p className="text-muted-foreground mb-2">Open Daily: 8 AM – 10 PM</p>
          <p className="text-muted-foreground">Phone: (555) 123-4567</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="font-display text-lg font-bold mb-1">Savory Bites</p>
          <p className="text-sm text-background/70">© 2026 Savory Bites Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
