import { Link } from "wouter";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = "Something went wrong", 
  message = "We couldn't load this content. The darkness might be too thick today.", 
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]" data-testid="error-state">
      <AlertCircle className="w-12 h-12 text-destructive mb-4" />
      <h3 className="text-2xl font-display font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>
      
      {onRetry ? (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      ) : (
        <Link href="/">
          <Button variant="outline">Return Home</Button>
        </Link>
      )}
    </div>
  );
}
