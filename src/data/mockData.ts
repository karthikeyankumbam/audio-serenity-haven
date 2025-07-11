import { Audiobook, User } from "@/types/audiobook";

// Import the generated book covers
import psychologyMoneyCover from "@/assets/book-psychology-money.jpg";
import atomicHabitsCover from "@/assets/book-atomic-habits.jpg";
import silentPatientCover from "@/assets/book-silent-patient.jpg";

export const mockAudiobooks: Audiobook[] = [
  {
    id: "1",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    narrator: "Chris Hill",
    duration: "5h 35m",
    rating: 4.8,
    reviewCount: 12456,
    price: 14.95,
    description: "Timeless lessons on wealth, greed, and happiness. Doing well with money isn't necessarily about what you know. It's about how you behave.",
    coverImage: psychologyMoneyCover,
    categories: ["Business", "Finance", "Psychology"],
    publishDate: "2020-09-08",
    publisher: "Harriman House",
    chapters: [
      { id: "1-1", title: "No One's Crazy", duration: "22m", startTime: 0 },
      { id: "1-2", title: "Luck & Risk", duration: "18m", startTime: 1320 },
      { id: "1-3", title: "Never Enough", duration: "16m", startTime: 2400 },
    ],
    isInWishlist: false,
    isOwned: true,
    progress: 65
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    narrator: "James Clear",
    duration: "5h 35m",
    rating: 4.9,
    reviewCount: 23789,
    price: 16.95,
    description: "The #1 New York Times bestseller. Over 1 million copies sold! Tiny Changes, Remarkable Results.",
    coverImage: atomicHabitsCover,
    categories: ["Self-Help", "Psychology", "Productivity"],
    publishDate: "2018-10-16",
    publisher: "Avery",
    chapters: [
      { id: "2-1", title: "The Surprising Power of Atomic Habits", duration: "25m", startTime: 0 },
      { id: "2-2", title: "How Your Habits Shape Your Identity", duration: "20m", startTime: 1500 },
    ],
    isInWishlist: true,
    isOwned: false
  },
  {
    id: "3",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    narrator: "Louise Brealey",
    duration: "8h 43m",
    rating: 4.6,
    reviewCount: 34567,
    price: 18.95,
    description: "The most gripping psychological thriller since Gone Girl. A woman's act of violence against her husband and her refusal to speak.",
    coverImage: silentPatientCover,
    categories: ["Thriller", "Mystery", "Psychology"],
    publishDate: "2019-02-05",
    publisher: "Celadon Books",
    chapters: [
      { id: "3-1", title: "Alicia", duration: "15m", startTime: 0 },
      { id: "3-2", title: "Theo", duration: "18m", startTime: 900 },
    ],
    isInWishlist: false,
    isOwned: true,
    progress: 23
  },
  {
    id: "4",
    title: "Dune",
    author: "Frank Herbert",
    narrator: "Scott Brick",
    duration: "21h 2m",
    rating: 4.7,
    reviewCount: 15423,
    price: 24.95,
    description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.",
    coverImage: "/placeholder-dune.jpg",
    categories: ["Science Fiction", "Adventure", "Fantasy"],
    publishDate: "1965-08-01",
    publisher: "Ace Books",
    chapters: [
      { id: "4-1", title: "Book One: Dune", duration: "45m", startTime: 0 },
    ],
    isInWishlist: true,
    isOwned: false
  },
  {
    id: "5",
    title: "Becoming",
    author: "Michelle Obama",
    narrator: "Michelle Obama",
    duration: "19h 3m",
    rating: 4.9,
    reviewCount: 67890,
    price: 22.95,
    description: "In her memoir, a work of deep reflection and mesmerizing storytelling, Michelle Obama invites readers into her world.",
    coverImage: "/placeholder-becoming.jpg",
    categories: ["Memoir", "Biography", "Politics"],
    publishDate: "2018-11-13",
    publisher: "Crown",
    chapters: [
      { id: "5-1", title: "Becoming Me", duration: "6h 12m", startTime: 0 },
    ],
    isInWishlist: false,
    isOwned: true,
    progress: 89
  },
  {
    id: "6",
    title: "The Midnight Library",
    author: "Matt Haig",
    narrator: "Carey Mulligan",
    duration: "8h 49m",
    rating: 4.5,
    reviewCount: 28934,
    price: 19.95,
    description: "Between life and death there is a library, and within that library, the shelves go on forever.",
    coverImage: "/placeholder-midnight.jpg",
    categories: ["Fiction", "Fantasy", "Philosophy"],
    publishDate: "2020-08-13",
    publisher: "Viking",
    chapters: [
      { id: "6-1", title: "The Library", duration: "12m", startTime: 0 },
    ],
    isInWishlist: true,
    isOwned: false
  }
];

export const mockUser: User = {
  id: "user-1",
  name: "Alex Thompson",
  email: "alex@example.com",
  avatar: "/placeholder-avatar.jpg",
  listeningHistory: [
    {
      bookId: "1",
      lastListened: "2024-01-15T10:30:00Z",
      progress: 65,
      totalListeningTime: 12600
    },
    {
      bookId: "3",
      lastListened: "2024-01-14T16:45:00Z", 
      progress: 23,
      totalListeningTime: 7200
    }
  ],
  wishlist: ["2", "4", "6"],
  ownedBooks: ["1", "3", "5"]
};

export const categories = [
  "All",
  "Business",
  "Science Fiction", 
  "Self-Help",
  "Thriller",
  "Biography",
  "Fantasy",
  "Psychology",
  "History",
  "Romance"
];