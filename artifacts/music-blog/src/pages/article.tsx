import { useParams, Link } from "wouter";
import { format } from "date-fns";
import { User, Calendar, Tag, ArrowLeft } from "lucide-react";
import { useArticle, useArticles } from "@/hooks/useStrapi";
import { getStrapiImageUrl } from "@/lib/strapi";
import { ErrorState } from "@/components/ErrorState";
import { ArticleCard } from "@/components/ArticleCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Article() {
  const params = useParams<{ id: string }>();
  const idOrSlug = params.id;
  
  const { data, isLoading, error } = useArticle(idOrSlug);
  const { data: recentArticles } = useArticles();
  
  if (error) {
    return (
      <div className="container mx-auto pt-24 pb-12">
        <ErrorState message="This record seems to be scratched or missing from the archives." />
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="animate-pulse">
        <Skeleton className="w-full h-[50vh] rounded-none" />
        <div className="container mx-auto px-4 max-w-4xl py-12">
          <Skeleton className="h-16 w-3/4 mb-6" />
          <div className="flex gap-4 mb-12">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  const article = data.data;
  const { title, content, publishedAt, cover, author, category } = article.attributes;
  
  const coverUrl = getStrapiImageUrl(cover) || "https://images.unsplash.com/photo-1614680376593-902f74a77e5b?auto=format&fit=crop&q=80&w=1920";
  const authorName = author?.data?.attributes?.name || "Anonymous";
  const authorAvatar = getStrapiImageUrl(author?.data?.attributes?.avatar);
  const categoryData = category?.data;

  // Filter out current article from related
  const relatedList = recentArticles?.data?.filter(a => a.id !== article.id).slice(0, 3) || [];

  return (
    <article className="min-h-screen bg-background pb-20">
      {/* Hero Image */}
      <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
        <img 
          src={coverUrl} 
          alt={cover?.data?.attributes?.alternativeText || title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-8 left-4 md:left-8 z-20">
          <Link href="/articles">
            <Button variant="outline" size="sm" className="bg-background/50 backdrop-blur border-primary/30 hover:bg-primary/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Archives
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-20 -mt-32 md:-mt-48">
        <div className="mb-12">
          {categoryData && (
            <Link href={`/categories/${categoryData.attributes.slug}`}>
              <Badge className="mb-6 bg-accent hover:bg-accent/80 text-white cursor-pointer px-3 py-1 text-sm">
                {categoryData.attributes.name}
              </Badge>
            </Link>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-tight mb-8 glow-purple">
            {title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-y border-border py-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 border border-primary/30">
                <AvatarImage src={authorAvatar || ""} />
                <AvatarFallback className="bg-primary/20 text-sm">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground">{authorName}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-primary" />
              <time dateTime={publishedAt}>
                {format(new Date(publishedAt), "MMMM d, yyyy")}
              </time>
            </div>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert prose-headings:font-display prose-p:font-body prose-p:text-lg md:prose-p:text-xl prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-accent prose-strong:text-foreground prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:font-body prose-blockquote:italic max-w-none mb-20" dangerouslySetInnerHTML={{ __html: content || "<p>Content goes here...</p>" }} />
      </div>

      {/* Related Articles */}
      {relatedList.length > 0 && (
        <div className="container mx-auto px-4 border-t border-border pt-16">
          <h2 className="text-3xl font-display font-bold mb-8 glow-purple">Related Transmissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedList.map(a => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
