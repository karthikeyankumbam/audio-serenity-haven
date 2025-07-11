export interface Audiobook {
  id: string;
  title: string;
  author: string;
  narrator: string;
  duration: string; // "8h 45m"
  rating: number;
  reviewCount: number;
  price: number;
  description: string;
  coverImage: string;
  categories: string[];
  publishDate: string;
  publisher: string;
  sample?: string; // URL to audio sample
  chapters: Chapter[];
  isInWishlist?: boolean;
  isOwned?: boolean;
  progress?: number; // 0-100
}

export interface Chapter {
  id: string;
  title: string;
  duration: string;
  startTime: number; // in seconds
}

export interface PlaybackState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  currentBook?: Audiobook;
  currentChapter?: Chapter;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  listeningHistory: ListeningHistory[];
  wishlist: string[]; // book IDs
  ownedBooks: string[]; // book IDs
}

export interface ListeningHistory {
  bookId: string;
  lastListened: string;
  progress: number;
  totalListeningTime: number; // in seconds
}