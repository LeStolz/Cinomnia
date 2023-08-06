import axios from "axios";

const API_KEY = "f2909dc007437182788213bd977a0dfc";
const TMBD_BASE_URL = "https://api.themoviedb.org/3";

export class HomeModel {
  static async getGenres() {
    const {
      data: { genres },
    } = await axios.get(`${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return genres;
    // api.get(/movie)
  }

  static async getMovieDetails(movieId: number) {
    const { data } = await axios.get(`${TMBD_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find((vid: any) => vid.name === "Official Trailer");
      data.trailer = trailer ? trailer : data.videos.results[0];
    }

    return data;
  }

  static createArrayFromRawData(array: any[], moviesArray: any[], genres: any[]) {
    array.forEach(async (movie) => {
      const moviesGenres: string[] = [];
      movie.genre_ids.forEach((genre: number) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) moviesGenres.push(name.name);
      });

      if (movie.backdrop_path) {
        const detailedMovieInfo = await this.getMovieDetails(movie.id);
        const trailer = detailedMovieInfo.trailer;

        moviesArray.push({
          id: movie.id,
          name: movie?.original_name ? movie.original_name : movie.original_title,
          image: movie.backdrop_path,
          adult: movie.adult,
          overview: movie.overview,
          rating: movie.vote_average,
          release_date: movie.release_date,
          language: movie.original_language,
          genres: moviesGenres.slice(0, 3),
          trailer: trailer, // Add the trailer information to the movie object
        });
      }
    });
  }

  static async getRawData(api: string, genres: any[], paging: boolean) {
    const moviesArray: any[] = [];
    for (let i = 1; moviesArray.length < 100 && i < 10; i++) {
      const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      this.createArrayFromRawData(results, moviesArray, genres);
    }
    console.log(moviesArray);
    return moviesArray;
  }

  static async fetchMovie(props: string) {
    const type = props ? "search/movie" : "movie/popular";
    const genres = await this.getGenres();
    return await this.getRawData(
      `${TMBD_BASE_URL}/${type}?api_key=${API_KEY}&query=${props}`,
      genres,
      true
    );
  }
}
