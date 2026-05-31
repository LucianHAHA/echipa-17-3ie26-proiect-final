import { Link } from "wouter";
import { useCategories } from "@/hooks/useStrapi";
import { ErrorState } from "@/components/ErrorState";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Disc } from "lucide-react";

export default function Categories() {
  const { data, isLoading, error, refetch } = useCategories();

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4 glow-magenta">Frequencies</h1>
          <p className="text-xl font-body italic text-muted-foreground">Explore the spectrum of analog worship.</p>
          <div className="w-full h-px bg-gradient-to-r from-accent via-primary to-transparent opacity-50 mt-8" />
        </div>
        {error ? (
          <ErrorState onRetry={() => refetch()} />
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-48 w-full bg-card" />)}
          </div>
        ) : data?.data && data.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.data.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className="h-full bg-card border-card-border hover:border-accent/50 hover:-translate-y-1 transition-all duration-300 card-glow cursor-pointer group">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <Disc className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                    </div>
                    <h2 className="text-2xl font-display font-bold group-hover:text-accent transition-colors">{category.name}</h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground font-body text-lg">{category.description || `Explore articles about ${category.name.toLowerCase()}.`}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl font-body italic text-muted-foreground">No frequencies discovered yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
