import { Play, Search, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Hero() {
  return (
    <section className="relative min-h-[80vh] bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff8c00' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full shadow-glow">
            <Headphones className="h-16 w-16 text-primary" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          Your Audio
          <span className="bg-gradient-primary bg-clip-text text-transparent"> Library</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover thousands of audiobooks. Listen anytime, anywhere. 
          Transform your daily routine into learning opportunities.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search for books, authors, or narrators..."
            className="pl-10 pr-4 py-6 text-lg bg-background/50 backdrop-blur-sm border-border/50 rounded-full"
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="lg" className="min-w-[200px]">
            <Play className="h-5 w-5 mr-2" />
            Start Listening
          </Button>
          
          <Button variant="outline" size="lg" className="min-w-[200px] border-border/30 bg-background/20 backdrop-blur-sm">
            Browse Library
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 text-center">
          <div>
            <div className="text-3xl font-bold text-primary">50K+</div>
            <div className="text-sm text-muted-foreground">Audiobooks</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">1M+</div>
            <div className="text-sm text-muted-foreground">Happy Listeners</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">4.8★</div>
            <div className="text-sm text-muted-foreground">App Rating</div>
          </div>
        </div>
      </div>
      
      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}