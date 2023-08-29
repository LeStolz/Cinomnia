import { FilmDetailView } from "../FilmDetail/FilmDetailView";
import { FilmUpdateViewProps } from "./FilmUpdate";

export function FilmUpdateView({
  movie,
  onSubmit,
  ...rest
}: FilmUpdateViewProps) {
  return (
    <FilmDetailView onSubmit={onSubmit} movie={movie} {...rest} editMode />
  );
}
