import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [stars, setStars] = useState<{ id: number; left: string; top: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    // Generate random stars for the background
    const generatedStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-background" data-testid="hero-section">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-background to-background" />
      
      {/* Stars animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star w-1 h-1 md:w-1.5 md:h-1.5"
            style={{
              left: star.left,
              top: star.top,
              '--delay': star.delay,
              '--duration': star.duration,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-wider text-white glow-purple mb-6 uppercase">
          PURPLE RAIN
        </h1>
        
        <p className="text-xl md:text-2xl lg:text-3xl font-body italic text-muted-foreground max-w-3xl mb-12">
          "The beautiful ones always smash the picture. Always every time."
        </p>
        
        <Link href="/articles">
          <Button 
            size="lg" 
            className="font-display font-bold text-lg px-8 h-14 rounded-none border-2 border-accent bg-transparent text-white hover:bg-accent hover:text-white glow-magenta transition-all duration-300"
            data-testid="hero-cta"
          >
            Enter the Void
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
      
      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
