import { useAbout } from "@/hooks/useStrapi";
import { getStrapiImageUrl } from "@/lib/strapi";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ErrorState";

export default function About() {
  const { data, isLoading, error } = useAbout();

  if (error) {
    // If we fail to fetch the About page from Strapi, we show a beautiful fallback
    return <AboutFallback />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Skeleton className="h-16 w-1/2 mb-12" />
          <Skeleton className="w-full aspect-[21/9] mb-12 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // If no data returned from Strapi, show fallback
  if (!data?.data?.attributes) {
    return <AboutFallback />;
  }

  const { title, content, cover } = data.data.attributes;
  const coverUrl = getStrapiImageUrl(cover);

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 glow-purple text-center">
          {title || "About Purple Rain"}
        </h1>
        
        {coverUrl && (
          <div className="w-full aspect-[21/9] relative rounded-lg overflow-hidden mb-16 card-glow border border-primary/20">
            <img 
              src={coverUrl} 
              alt="About Cover" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div 
          className="prose prose-lg dark:prose-invert prose-headings:font-display prose-p:font-body prose-p:text-xl prose-p:leading-relaxed mx-auto"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}

function AboutFallback() {
  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 glow-purple text-center">
          The Manifesto
        </h1>
        
        <div className="w-full aspect-[21/9] relative rounded-lg overflow-hidden mb-16 card-glow border border-primary/20 bg-muted">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-background to-accent/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-black text-6xl text-white/20 tracking-[1em]">PURPLE RAIN</span>
          </div>
        </div>
        
        <div className="prose prose-lg dark:prose-invert prose-headings:font-display prose-p:font-body prose-p:text-xl prose-p:leading-relaxed mx-auto">
          <p className="lead text-2xl font-bold text-primary">
            Welcome to the velvet darkness.
          </p>
          <p>
            Purple Rain is not just a blog; it is a sanctuary for the analog obsessive. We believe that music is not meant to be streamed through tiny white earbuds while you answer emails. Music is a ritual. It is a physical act.
          </p>
          <p>
            When you drop the needle on a vinyl record, you are conjuring spirits. The crackle, the warmth, the slight imperfections—these are the textures of reality that digital compression scrubs away.
          </p>
          <h3>Our Holy Trinity</h3>
          <ul>
            <li><strong>The Artists:</strong> Those who understood darkness and made it beautiful. Prince, Freddie Mercury, HIM, Rammstein, Massive Attack.</li>
            <li><strong>The Medium:</strong> Vinyl, tapes, analog synthesis. The physical artifacts of sound.</li>
            <li><strong>The Altars:</strong> Amplifiers, turntables, speakers. The equipment that translates the groove into physical vibration.</li>
          </ul>
          <p>
            Turn down the lights. Turn up the volume. Listen deeply.
          </p>
        </div>
      </div>
    </div>
  );
}
