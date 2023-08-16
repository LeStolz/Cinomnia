import React, { CSSProperties, FC } from "react";


interface RatingProps {
  rating: number;
  onClick: (index: number) => void;
  style?: CSSProperties;
}

const Rating: FC<RatingProps> = ({ rating, onClick, style }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <span key={i} onClick={() => onClick(i)} style={style}>
          {rating > i ? (
            <i className="bi bi-star-fill"></i>
          ) : (
            <i className="bi bi-star"></i>
          )}
        </span>
      ))}
    </>
  );
};

export default Rating;
