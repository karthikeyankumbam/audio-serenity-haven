import { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  RotateCw,
  Bookmark,
  List,
  Minimize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Audiobook, PlaybackState } from "@/types/audiobook";

interface AudioPlayerProps {
  book?: Audiobook;
  isMinimized?: boolean;
  onMinimize?: () => void;
  onShowChapters?: () => void;
}

export function AudioPlayer({ book, isMinimized = false, onMinimize, onShowChapters }: AudioPlayerProps) {
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    isPlaying: false,
    currentTime: 0,
    duration: 300, // 5 minutes sample
    volume: 0.8,
    playbackRate: 1.0,
    currentBook: book
  });

  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setPlaybackState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleProgressChange = (value: number[]) => {
    setPlaybackState(prev => ({ ...prev, currentTime: value[0] }));
  };

  const handleVolumeChange = (value: number[]) => {
    setPlaybackState(prev => ({ ...prev, volume: value[0] / 100 }));
    setIsMuted(value[0] === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setPlaybackState(prev => ({ ...prev, volume: isMuted ? 0.8 : 0 }));
  };

  const skipBackward = () => {
    setPlaybackState(prev => ({ 
      ...prev, 
      currentTime: Math.max(0, prev.currentTime - 15) 
    }));
  };

  const skipForward = () => {
    setPlaybackState(prev => ({ 
      ...prev, 
      currentTime: Math.min(prev.duration, prev.currentTime + 15) 
    }));
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const currentIndex = rates.indexOf(playbackState.playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackState(prev => ({ ...prev, playbackRate: nextRate }));
  };

  if (!book) {
    return null;
  }

  if (isMinimized) {
    return (
      <Card className="fixed bottom-4 right-4 bg-gradient-player border-border/50 p-3 shadow-player backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-10 h-10 object-cover rounded"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground truncate">{book.title}</p>
            <p className="text-xs text-muted-foreground truncate">{book.author}</p>
          </div>
          <Button size="player" variant="player" onClick={togglePlay}>
            {playbackState.isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="fixed bottom-0 left-0 right-0 bg-gradient-player border-t border-border/50 p-4 shadow-player backdrop-blur-md z-40">
      <div className="max-w-7xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-4">
          <Slider
            value={[playbackState.currentTime]}
            max={playbackState.duration}
            step={1}
            className="w-full"
            onValueChange={handleProgressChange}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(playbackState.currentTime)}</span>
            <span>{formatTime(playbackState.duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Book Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-14 h-14 object-cover rounded-lg shadow-elegant"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground truncate">{book.title}</h3>
              <p className="text-sm text-muted-foreground truncate">By {book.author}</p>
              <p className="text-xs text-muted-foreground truncate">Narrated by {book.narrator}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 mx-8">
            <Button size="player" variant="player" onClick={skipBackward}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button size="lg" variant="premium" onClick={togglePlay}>
              {playbackState.isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <Button size="player" variant="player" onClick={skipForward}>
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>

          {/* Additional Controls */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            <Button size="player" variant="player" onClick={changePlaybackRate}>
              <span className="text-xs font-medium">{playbackState.playbackRate}x</span>
            </Button>
            
            <Button size="player" variant="player">
              <Bookmark className="h-4 w-4" />
            </Button>
            
            <Button size="player" variant="player" onClick={onShowChapters}>
              <List className="h-4 w-4" />
            </Button>

            {/* Volume Control */}
            <div className="flex items-center gap-2 w-24">
              <Button size="player" variant="ghost" onClick={toggleMute}>
                {isMuted || playbackState.volume === 0 ? 
                  <VolumeX className="h-4 w-4" /> : 
                  <Volume2 className="h-4 w-4" />
                }
              </Button>
              <Slider
                value={[isMuted ? 0 : playbackState.volume * 100]}
                max={100}
                step={1}
                className="flex-1"
                onValueChange={handleVolumeChange}
              />
            </div>

            <Button size="player" variant="ghost" onClick={onMinimize}>
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}