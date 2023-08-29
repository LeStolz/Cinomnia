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
  review: Review[];
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
  duration: number;
  status: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type Person = {
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
export type Review = {
  _id: string;
  user: string;
  content: string;
  createdAt: Date;
};

export type ListFilm = {
  film: Film;
  status: string;
};

export type PurchaseHistory = {
  email: string;
  film: Film;
  createdAt: Date;
};

export type User = {
  email: string;
  type: string;
  balance: number;
  createdAt: Date;
  bought: ListFilm[];
  wishlist: ListFilm[];
};
