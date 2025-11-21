const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export interface TMDBMedia {
    id: number;
    title?: string;
    name?: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date?: string;
    first_air_date?: string;
    media_type?: 'movie' | 'tv';
    origin_country?: string[];
}

export interface MediaItem {
    id: string;
    title: string;
    description: string;
    type: 'movie' | 'series';
    year: number;
    posterUrl: string;
    backdropUrl: string;
    trailerUrl: string;
    cast: string[];
}

const fetchTMDB = async (endpoint: string, params: Record<string, string> = {}) => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', API_KEY || '');
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`TMDB API Error: ${res.statusText}`);
    return res.json();
};

const getImageUrl = (path: string | null, size: 'w500' | 'original' = 'w500') => {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : 'https://via.placeholder.com/500x750?text=No+Image';
};

export const getTrendingMovies = async (page: number = 1): Promise<MediaItem[]> => {
    // Discover movies from US and GB, sorted by release date (newest first)
    // Note: 'with_origin_country' works well with discover
    const data = await fetchTMDB('/discover/movie', {
        sort_by: 'primary_release_date.desc',
        'vote_count.gte': '100', // Filter out very obscure stuff
        with_origin_country: 'US|GB',
        page: page.toString()
    });

    return data.results.map((item: TMDBMedia) => ({
        id: item.id.toString(),
        title: item.title || 'Unknown',
        description: item.overview,
        type: 'movie',
        year: item.release_date ? new Date(item.release_date).getFullYear() : 0,
        posterUrl: getImageUrl(item.poster_path),
        backdropUrl: getImageUrl(item.backdrop_path, 'original'),
        trailerUrl: '', // Fetched separately
        cast: [] // Fetched separately
    }));
};

export const getTrendingSeries = async (page: number = 1): Promise<MediaItem[]> => {
    const data = await fetchTMDB('/discover/tv', {
        sort_by: 'first_air_date.desc',
        'vote_count.gte': '100',
        with_origin_country: 'US|GB',
        page: page.toString()
    });

    return data.results.map((item: TMDBMedia) => ({
        id: item.id.toString(),
        title: item.name || 'Unknown',
        description: item.overview,
        type: 'series',
        year: item.first_air_date ? new Date(item.first_air_date).getFullYear() : 0,
        posterUrl: getImageUrl(item.poster_path),
        backdropUrl: getImageUrl(item.backdrop_path, 'original'),
        trailerUrl: '',
        cast: []
    }));
};

export const getMediaDetails = async (id: string, type: 'movie' | 'series') => {
    const endpoint = type === 'series' ? `/tv/${id}` : `/movie/${id}`;
    const data = await fetchTMDB(endpoint, {
        append_to_response: 'videos,credits,watch/providers'
    });

    const trailer = data.videos.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube')
        || data.videos.results.find((v: any) => v.site === 'YouTube');

    const cast = data.credits.cast.slice(0, 4).map((c: any) => c.name);

    // Extract watch providers (prioritize US and GB flatrate)
    const providers = data['watch/providers']?.results;
    const flatrate = providers?.US?.flatrate || providers?.GB?.flatrate || [];

    const watchProviders = flatrate.map((p: any) => ({
        name: p.provider_name,
        logoUrl: getImageUrl(p.logo_path, 'original')
    })).slice(0, 5); // Limit to top 5

    return {
        trailerUrl: trailer ? `https://www.youtube.com/embed/${trailer.key}` : '',
        cast,
        watchProviders
    };
};
