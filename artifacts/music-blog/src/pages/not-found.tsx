import { Link } from "wouter";
import { Disc } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative flex justify-center">
          <Disc className="w-32 h-32 text-primary animate-spin-slow opacity-20" style={{ animationDuration: '8s' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-display font-black text-foreground glow-purple">404</span>
          </div>
        </div>
        
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-4">Dead Wax</h1>
          <p className="text-muted-foreground font-body text-lg italic">
            You've reached the end of the record. There's nothing but silence here.
          </p>
        </div>
        
        <Link href="/">
          <Button variant="outline" size="lg" className="font-display hover:bg-primary hover:text-primary-foreground border-primary/50">
            Flip the Record (Return Home)
          </Button>
        </Link>
      </div>
    </div>
  );
}
