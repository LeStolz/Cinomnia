import { FormEvent } from "react";
import { FilmDetailView } from "../FilmDetail/FilmDetailView";
import { Form } from "react-router-dom";
import { FilmUpdateViewProps } from "./FilmUpdate";

export function FilmUpdateView({ movie, onSubmit }: FilmUpdateViewProps) {
  const onSubmitWrapped = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit();
  };

  return (
    <Form onSubmit={onSubmitWrapped}>
      <FilmDetailView movie={movie} editMode />
    </Form>
  );
}
