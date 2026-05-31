import { useAbout } from "@/hooks/useStrapi";
import { getStrapiImageUrl } from "@/lib/strapi";
import { Skeleton } from "@/components/ui/skeleton";

export default function About() {
  const { data, isLoading, error } = useAbout();

  if (error) return <AboutFallback />;

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Skeleton className="h-16 w-1/2 mb-12" />
          <Skeleton className="w-full aspect-[21/9] mb-12 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!data?.data) return <AboutFallback />;

  const { title, content, cover } = data.data;
  const coverUrl = getStrapiImageUrl(cover);

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 glow-purple text-center">{title || "About"}</h1>
        {coverUrl && (
          <div className="w-full aspect-[21/9] relative rounded-lg overflow-hidden mb-16 card-glow border border-primary/20">
            <img src={coverUrl} alt="About Cover" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="prose prose-lg dark:prose-invert mx-auto" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

function AboutFallback() {
  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 glow-purple text-center">The Manifesto</h1>
        <div className="prose prose-lg dark:prose-invert mx-auto">
          <p className="text-2xl font-bold text-primary">Welcome to the velvet darkness.</p>
          <p>Purple Rain is a sanctuary for the analog obsessive.</p>
        </div>
      </div>
    </div>
  );
}
