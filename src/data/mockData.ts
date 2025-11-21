export interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: 'movie' | 'series';
  year: number;
  posterUrl: string; // Vertical poster
  backdropUrl: string; // Horizontal backdrop
  trailerUrl: string; // YouTube embed URL
  cast: string[];
}

export const mockData: MediaItem[] = [
  {
    id: '1',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    type: 'movie',
    year: 2010,
    posterUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800&q=80', // Abstract sci-fi
    backdropUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&w=1920&q=80',
    trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page', 'Tom Hardy']
  },
  {
    id: '2',
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    type: 'movie',
    year: 2014,
    posterUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80', // Space
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine']
  },
  {
    id: '3',
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    type: 'series',
    year: 2008,
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80', // Moody dark
    backdropUrl: 'https://images.unsplash.com/photo-1563198804-b144dfc78cd6?auto=format&fit=crop&w=1920&q=80',
    trailerUrl: 'https://www.youtube.com/embed/HhesaQXLuRY',
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn', 'Dean Norris']
  },
  {
    id: '4',
    title: 'Stranger Things',
    description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
    type: 'series',
    year: 2016,
    posterUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800&q=80', // Sci-fi vibe
    backdropUrl: 'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?auto=format&fit=crop&w=1920&q=80',
    trailerUrl: 'https://www.youtube.com/embed/b9EkMc79ZSU',
    cast: ['Winona Ryder', 'David Harbour', 'Finn Wolfhard', 'Millie Bobby Brown']
  },
  {
    id: '5',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    type: 'movie',
    year: 2008,
    posterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&w=800&q=80', // Dark city
    backdropUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&w=1920&q=80',
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine']
  }
];
