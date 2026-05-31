import { useParams } from "wouter";
import { useArticle } from "@/hooks/useStrapi";
import { getStrapiImageUrl } from "@/lib/strapi";
import { ErrorState } from "@/components/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { User, Calendar } from "lucide-react";

export default function Article() {
  const params = useParams<{ id: string }>();
  const idOrSlug = params.id;

  const { data, isLoading, error, refetch } = useArticle(idOrSlug);

  if (error) {
    return (
      <div className="container mx-auto pt-24 pb-12">
        <ErrorState message="This article could not be loaded." onRetry={() => refetch()} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Skeleton className="h-16 w-3/4 mb-8" />
          <Skeleton className="w-full aspect-[21/9] mb-8 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  const article = data?.data;
  if (!article) return null;

  const coverUrl = getStrapiImageUrl(article.cover);
  const authorName = article.author?.name || "Anonymous";
  const categoryName = article.category?.name;

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 glow-purple">
          {article.title}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{authorName}</span>
          </div>
          {article.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time>{format(new Date(article.publishedAt), "MMM d, yyyy")}</time>
            </div>
          )}
          {categoryName && (
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded">
              {categoryName}
            </span>
          )}
        </div>

        {coverUrl && (
          <div className="w-full aspect-[21/9] relative rounded-lg overflow-hidden mb-12 border border-primary/20">
            <img src={coverUrl} alt={article.cover?.alternativeText || article.title} className="w-full h-full object-cover" />
          </div>
        )}

        {article.description && (
          <p className="text-xl italic text-muted-foreground mb-8 border-l-4 border-primary pl-4">
            {article.description}
          </p>
        )}
      </div>
    </div>
  );
}
       
