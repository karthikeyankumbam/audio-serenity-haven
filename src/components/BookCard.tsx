import { useState } from "react";
import { Heart, Play, Clock, Star, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Audiobook } from "@/types/audiobook";

interface BookCardProps {
  book: Audiobook;
  variant?: "grid" | "list" | "compact";
  onPlay?: (book: Audiobook) => void;
  onWishlist?: (bookId: string) => void;
}

export function BookCard({ book, variant = "grid", onPlay, onWishlist }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = () => {
    onPlay?.(book);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onWishlist?.(book.id);
  };

  if (variant === "list") {
    return (
      <Card 
        className="bg-gradient-card border-border/50 p-4 transition-all duration-300 hover:shadow-elegant hover:scale-[1.02] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-16 h-20 object-cover rounded-md shadow-elegant"
            />
            {isHovered && (
              <Button
                size="player"
                variant="premium"
                className="absolute inset-0 m-auto opacity-0 animate-fade-in"
                onClick={handlePlay}
              >
                <Play className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{book.title}</h3>
            <p className="text-sm text-muted-foreground">By {book.author}</p>
            <p className="text-xs text-muted-foreground">Narrated by {book.narrator}</p>
            
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm text-foreground">{book.rating}</span>
                <span className="text-xs text-muted-foreground">({book.reviewCount.toLocaleString()})</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{book.duration}</span>
              </div>
            </div>

            {book.progress && (
              <div className="mt-2">
                <div className="w-full bg-muted rounded-full h-1">
                  <div 
                    className="bg-primary h-1 rounded-full transition-all duration-300"
                    style={{ width: `${book.progress}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground mt-1">{book.progress}% complete</span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <Button
              size="player"
              variant="ghost"
              onClick={handleWishlist}
              className={cn("", book.isInWishlist && "text-primary")}
            >
              <Heart className={cn("h-4 w-4", book.isInWishlist && "fill-current")} />
            </Button>
            
            {book.isOwned ? (
              <Badge variant="secondary" className="text-xs">Owned</Badge>
            ) : (
              <span className="text-sm font-semibold text-primary">${book.price}</span>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="bg-gradient-card border-border/50 p-4 transition-all duration-300 hover:shadow-elegant hover:scale-105 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full aspect-[3/4] object-cover rounded-lg shadow-elegant mb-3"
        />
        
        {isHovered && (
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="lg"
              variant="premium"
              onClick={handlePlay}
              className="animate-scale-in"
            >
              <Play className="h-5 w-5 mr-2" />
              {book.isOwned ? "Continue" : "Preview"}
            </Button>
          </div>
        )}

        <Button
          size="player"
          variant="ghost"
          onClick={handleWishlist}
          className={cn("absolute top-2 right-2 bg-black/50 backdrop-blur-sm", book.isInWishlist && "text-primary")}
        >
          <Heart className={cn("h-4 w-4", book.isInWishlist && "fill-current")} />
        </Button>

        {book.progress && (
          <div className="absolute bottom-2 left-2 right-2">
            <div className="w-full bg-black/50 rounded-full h-1">
              <div 
                className="bg-primary h-1 rounded-full transition-all duration-300"
                style={{ width: `${book.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">{book.title}</h3>
        <p className="text-sm text-muted-foreground">By {book.author}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm text-foreground">{book.rating}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{book.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {book.isOwned ? (
            <Badge variant="secondary" className="text-xs">Owned</Badge>
          ) : (
            <span className="text-lg font-semibold text-primary">${book.price}</span>
          )}
          
          <Button size="player" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}