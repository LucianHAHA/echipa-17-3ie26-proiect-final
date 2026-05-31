import { Link } from "wouter";
import { ArrowRight, Disc, Speaker } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { ArticleCard } from "@/components/ArticleCard";
import { SkeletonCardGrid } from "@/components/SkeletonCard";
import { ErrorState } from "@/components/ErrorState";
import { useArticles, useCategories } from "@/hooks/useStrapi";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: articlesData, isLoading: isLoadingArticles, error: articlesError } = useArticles();
  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories();

  const recentArticles = articlesData?.data?.slice(0, 6) || [];
  const featuredCategories = categoriesData?.data?.slice(0, 4) || [];

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
                Latest Transmissions
              </h2>
              <div className="w-24 h-1 bg-primary glow-purple" />
            </div>
            <Link href="/articles">
              <Button variant="ghost" className="hidden md:flex items-center gap-2 hover:text-primary">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {articlesError ? (
            <ErrorState />
          ) : isLoadingArticles ? (
            <SkeletonCardGrid count={3} />
          ) : recentArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic font-body text-xl">The archives are currently empty.</p>
          )}
          
          <div className="mt-8 flex justify-center md:hidden">
            <Link href="/articles">
              <Button variant="outline" className="w-full">
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-12 glow-purple">
            Explore the Frequencies
          </h2>
          
          {isLoadingCategories ? (
            <div className="flex flex-wrap justify-center gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-32 h-12 bg-muted animate-pulse rounded-full" />
              ))}
            </div>
          ) : featuredCategories.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-4">
              {featuredCategories.map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full border-primary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    {category.name}
                  </Button>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 glow-magenta">
              Analog Altars
            </h2>
            <p className="text-xl font-body italic text-muted-foreground">
              Because compressed digital files have no soul. The equipment we worship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-card border border-primary/30 p-8 rounded-lg card-glow flex flex-col items-center text-center">
              <Disc className="w-16 h-16 text-accent mb-6" />
              <h3 className="text-2xl font-display font-bold mb-4">Camry CR 1113</h3>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                A turntable that looks like it was rescued from a 1920s speakeasy, but plays with the precision of modern engineering. Its wooden chassis absorbs vibrations like a sponge, while the needle finds every hidden frequency in the grooves of your darkest vinyl.
              </p>
            </div>
            
            <div className="bg-card border border-primary/30 p-8 rounded-lg card-glow flex flex-col items-center text-center">
              <Speaker className="w-16 h-16 text-primary mb-6" />
              <h3 className="text-2xl font-display font-bold mb-4">Edifier Obsidian</h3>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Bookshelf speakers that don't just reproduce sound—they resurrect it. When the heavy bassline of a Massive Attack track drops, these dark monolithic blocks push the air in your room until you feel the music in your sternum.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
