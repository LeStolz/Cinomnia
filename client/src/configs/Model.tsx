export type Film = {
    _id: string;
    id: number;
    title: string;
    poster: {
      img_500: string;
      img_1280: string;
    };
    overview: string;
    release_date: Date;
    rating: number;
    ranking: number;
    review: string[];
    genres: {
      _id: string;
      id: number;
      name: string;
    }[];
    casts: {
      _id: string;
      id: number;
      name: string;
      biography: string;
      birthday: Date;
      gender: string;
      img: {
        img_500: string;
        img_1280: string;
      };
      crews: {
        id: number;
        job: string;
        img_character: {
          img_500: string;
          img_1280: string;
        };
      }[];
    }[];
    directors: {
      _id: string;
      id: number;
      name: string;
      biography: string;
      birthday: Date;
      gender: string;
      img: {
        img_500: string;
        img_1280: string;
      };
      crews: {
        id: number;
        job: string;
        img_character: {
          img_500: string;
          img_1280: string;
        };
      }[];
    }[];
    videos: {
      trailers: {
        _id: string;
        name: string;
        link: string;
      }[];
      video_full: string;
    };
    price: number;
  };
  
  export type Genre = {
    id: number;
    name: string;
  };
  
  export type Actor = {
    id: number;
    name: string;
    biography: string;
    birthday: Date;
    gender: string;
    img: { img_500: string; img_1280: string };
    crews: {
      id: number;
      job: string;
      img_character: { img_500: string; img_1280: string };
    }[];
  };
  
  export type Director = {
    id: number;
    name: string;
    biography: string;
    birthday: Date;
    gender: string;
    img: { img_500: string; img_1280: string };
    crews: {
      id: number;
      job: string;
      img_character: { img_500: string; img_1280: string };
    }[];
  };