import { Navbar } from "./Navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <footer className="w-full border-t border-border bg-card/50 py-12 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-2xl tracking-widest text-primary glow-purple mb-4">
            PURPLE RAIN
          </h2>
          <p className="text-muted-foreground font-body italic mb-6">
            Dedicated to the holy trinity of vinyl, amplifiers, and the artists who understood darkness.
          </p>
          <div className="text-sm text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Purple Rain Blog. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
