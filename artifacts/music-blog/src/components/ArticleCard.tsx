import { Link } from "wouter";
import { format } from "date-fns";
import { User, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Article, getStrapiImageUrl } from "@/lib/strapi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { title, slug, description, publishedAt, cover, category, author } = article;
  const coverUrl = getStrapiImageUrl(cover) || "https://images.unsplash.com/photo-1614680376593-902f74a77e5b?auto=format&fit=crop&q=80&w=800";
  const authorName = author?.name || "Anonymous";
  const authorAvatar = getStrapiImageUrl(author?.avatar);
  const categoryName = category?.name;

  return (
    <Link href={`/articles/${slug || article.id}`}>
      <Card className="group h-full flex flex-col overflow-hidden bg-card border-card-border hover:-translate-y-1 transition-all duration-300 card-glow cursor-pointer">
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <img src={coverUrl} alt={cover?.alternativeText || title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          {categoryName && (
            <Badge className="absolute top-4 right-4 z-20 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              {categoryName}
            </Badge>
          )}
        </div>
        <CardHeader className="flex-grow space-y-2">
          <h3 className="text-xl md:text-2xl font-display font-bold leading-tight line-clamp-2 text-card-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground font-body text-lg line-clamp-2">
            {description || "No description available."}
          </p>
        </CardContent>
        <CardFooter className="pt-4 border-t border-border flex flex-wrap justify-between items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6 border border-border">
              <AvatarImage src={authorAvatar || ""} />
              <AvatarFallback className="bg-primary/20 text-xs"><User className="h-3 w-3" /></AvatarFallback>
            </Avatar>
            <span className="font-medium">{authorName}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <time dateTime={publishedAt}>{format(new Date(publishedAt), "MMM d, yyyy")}</time>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
