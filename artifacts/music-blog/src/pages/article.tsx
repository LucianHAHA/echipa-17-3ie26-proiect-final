import { ArticleCard } from "@/components/ArticleCard";
import { SkeletonCardGrid } from "@/components/SkeletonCard";
import articlesData from "@/data/articles.json"; // Importăm datele locale

export default function Articles() {
  // Simulăm datele care veneau din hook
  const data = articlesData; 
  const isLoading = false;
  const error = null;

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4 glow-purple">
            All Articles
          </h1>
          <div className="w-full h-px bg-gradient-to-r from-primary via-accent to-transparent opacity-50" />
        </div>

        {error ? (
          <div className="text-center text-red-500">Error loading content.</div>
        ) : isLoading ? (
          <SkeletonCardGrid count={6} />
        ) : data?.data && data.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.data.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl font-body italic text-muted-foreground">The silence is deafening. No articles found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
 
  
