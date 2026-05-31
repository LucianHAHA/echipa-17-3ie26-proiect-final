import { useParams } from "wouter";
import { useCategory } from "@/hooks/useStrapi";
import { ErrorState } from "@/components/ErrorState";
import { ArticleCard } from "@/components/ArticleCard";
import { SkeletonCardGrid } from "@/components/SkeletonCard";

export default function Category() {
  const params = useParams<{ id: string }>();
  const idOrSlug = params.id;
  
  const { data, isLoading, error, refetch } = useCategory(idOrSlug);

  if (error) {
    return (
      <div className="container mx-auto pt-24 pb-12">
        <ErrorState message="This frequency cannot be tuned into at the moment." onRetry={() => refetch()} />
      </div>
    );
  }

  const category = data?.data?.attributes;
  const articles = category?.articles?.data || [];

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="mb-16 animate-pulse">
            <div className="h-16 w-1/3 bg-muted rounded mb-4" />
            <div className="h-6 w-1/2 bg-muted rounded" />
          </div>
        ) : (
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 glow-purple">
              {category?.name}
            </h1>
            {category?.description && (
              <p className="text-xl font-body italic text-muted-foreground max-w-2xl mx-auto">
                {category.description}
              </p>
            )}
            <div className="w-24 h-1 bg-primary mx-auto mt-8 glow-purple" />
          </div>
        )}

        {isLoading ? (
          <SkeletonCardGrid count={6} />
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card/50 rounded-lg border border-border">
            <p className="text-2xl font-body italic text-muted-foreground">No transmissions in this frequency yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
