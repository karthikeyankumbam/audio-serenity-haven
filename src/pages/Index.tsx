import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { FeaturedSection } from "@/components/FeaturedSection";
import { CategoryFilter } from "@/components/CategoryFilter";
import { BookCard } from "@/components/BookCard";
import { AudioPlayer } from "@/components/AudioPlayer";
import { mockAudiobooks, categories } from "@/data/mockData";
import { Audiobook } from "@/types/audiobook";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentBook, setCurrentBook] = useState<Audiobook | undefined>();
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(["2", "4", "6"]);

  const handlePlayBook = (book: Audiobook) => {
    setCurrentBook(book);
    setIsPlayerMinimized(false);
  };

  const handleToggleWishlist = (bookId: string) => {
    setWishlist(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const filteredBooks = selectedCategory === "All" 
    ? mockAudiobooks 
    : mockAudiobooks.filter(book => book.categories.includes(selectedCategory));

  const featuredBooks = mockAudiobooks.slice(0, 6);
  const continueListening = mockAudiobooks.filter(book => book.isOwned && book.progress);
  const newReleases = mockAudiobooks.filter(book => !book.isOwned).slice(0, 6);

  const renderContent = () => {
    switch (currentPage) {
      case "browse":
        return (
          <div className="min-h-screen bg-background">
            <div className="pt-8">
              <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-foreground mb-6">Browse Audiobooks</h1>
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
                  {filteredBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={{...book, isInWishlist: wishlist.includes(book.id)}}
                      variant="list"
                      onPlay={handlePlayBook}
                      onWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "wishlist":
        const wishlistBooks = mockAudiobooks.filter(book => wishlist.includes(book.id));
        return (
          <div className="min-h-screen bg-background">
            <div className="pt-8">
              <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-foreground mb-8">My Wishlist</h1>
                {wishlistBooks.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-xl text-muted-foreground">Your wishlist is empty</p>
                    <p className="text-muted-foreground mt-2">Add some books to your wishlist to see them here</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
                    {wishlistBooks.map((book) => (
                      <BookCard
                        key={book.id}
                        book={{...book, isInWishlist: true}}
                        variant="list"
                        onPlay={handlePlayBook}
                        onWishlist={handleToggleWishlist}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="min-h-screen bg-background">
            <div className="pt-8">
              <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-foreground mb-8">My Library</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-32">
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Continue Listening</h2>
                    <div className="space-y-4">
                      {continueListening.map((book) => (
                        <BookCard
                          key={book.id}
                          book={{...book, isInWishlist: wishlist.includes(book.id)}}
                          variant="list"
                          onPlay={handlePlayBook}
                          onWishlist={handleToggleWishlist}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Stats</h2>
                    <div className="space-y-4">
                      <div className="bg-gradient-card border border-border/50 rounded-lg p-6">
                        <div className="text-3xl font-bold text-primary">24h</div>
                        <div className="text-sm text-muted-foreground">This month</div>
                      </div>
                      <div className="bg-gradient-card border border-border/50 rounded-lg p-6">
                        <div className="text-3xl font-bold text-primary">12</div>
                        <div className="text-sm text-muted-foreground">Books completed</div>
                      </div>
                      <div className="bg-gradient-card border border-border/50 rounded-lg p-6">
                        <div className="text-3xl font-bold text-primary">3</div>
                        <div className="text-sm text-muted-foreground">Current streak</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="min-h-screen bg-background">
            <Hero />
            
            {continueListening.length > 0 && (
              <FeaturedSection
                title="Continue Listening"
                books={continueListening.map(book => ({...book, isInWishlist: wishlist.includes(book.id)}))}
                onPlayBook={handlePlayBook}
                onToggleWishlist={handleToggleWishlist}
              />
            )}
            
            <FeaturedSection
              title="Featured Audiobooks"
              books={featuredBooks.map(book => ({...book, isInWishlist: wishlist.includes(book.id)}))}
              onPlayBook={handlePlayBook}
              onToggleWishlist={handleToggleWishlist}
            />
            
            <FeaturedSection
              title="New Releases"
              books={newReleases.map(book => ({...book, isInWishlist: wishlist.includes(book.id)}))}
              onPlayBook={handlePlayBook}
              onToggleWishlist={handleToggleWishlist}
            />
            
            <div className="pb-32" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderContent()}
      
      <AudioPlayer
        book={currentBook}
        isMinimized={isPlayerMinimized}
        onMinimize={() => setIsPlayerMinimized(true)}
        onShowChapters={() => console.log("Show chapters")}
      />
    </div>
  );
};

export default Index;
