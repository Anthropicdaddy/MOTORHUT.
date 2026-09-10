import { Car, Users, Award, MapPin } from "lucide-react";

const stats = [
  { icon: Car, label: "Cars Sold", value: "500+" },
  { icon: Users, label: "Happy Clients", value: "450+" },
  { icon: Award, label: "Years Experience", value: "10+" },
  { icon: MapPin, label: "Location", value: "Nairobi, KE" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-primary">Motor Hut</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Motor Hut is a premier car dealership based in Nairobi, Kenya. We
            specialize in quality pre-owned vehicles, offering a curated
            selection of cars that meet the highest standards of reliability and
            performance.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6 text-center"
            >
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-3xl font-heading font-bold text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl font-bold mb-8 text-center">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-heading text-xl font-semibold mb-3 text-primary">
                Quality First
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Every vehicle in our inventory undergoes a rigorous inspection
                process. We only sell cars that meet our strict quality
                standards, ensuring you drive away with confidence.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold mb-3 text-primary">
                Transparency
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We believe in honest, straightforward dealings. No hidden fees,
                no pressure tactics. Just fair prices and complete vehicle
                history for every car we sell.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold mb-3 text-primary">
                Customer Focus
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Your satisfaction is our priority. From the first inquiry to
                after-sales support, we are committed to providing an
                exceptional experience.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold mb-3 text-primary">
                Convenience
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                With WhatsApp integration, browsing online, and visiting our
                showroom, we make car buying easy and accessible from wherever
                you are.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
