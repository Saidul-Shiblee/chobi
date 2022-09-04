import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { CardMedia } from "@mui/material";
import * as React from "react";

const PostImages = ({ item }) => {
  const [current, setCurrent] = React.useState(0);
  const length = item?.data?.imageURL.length;

  const imageURLS = !Array.isArray(item?.data?.imageURL)
    ? [item?.data?.imageURL]
    : item?.data?.imageURL;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(imageURLS) || imageURLS.length <= 0) {
    return null;
  }
  return (
    <>
      {imageURLS.length > 1 ? (
        <NavigateBeforeIcon
          sx={arrow("left")}
          style={{
            color: "white",
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            padding: "4px",
          }}
          onClick={prevSlide}
        />
      ) : (
        ""
      )}
      {imageURLS.length > 1 ? (
        <NavigateNextIcon
          sx={arrow("right")}
          style={{
            color: "white",
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            padding: "4px",
          }}
          onClick={nextSlide}
        />
      ) : (
        ""
      )}

      {imageURLS.map((slide, index) => {
        return (
          index === current && (
            <CardMedia
              image={slide}
              key={index}
              style={{
                width: "500px",
                height: "584px",
                position: "absolute",
                backgroundPosition: "center",
                transitionDuration: " 1s ease",
              }}
            ></CardMedia>
          )
        );
      })}
    </>
  );
};

export default PostImages;

const arrow = (direction) => {
  return {
    position: "absolute",
    top: "50%",
    [direction]: "32px",
    fontSize: "1rem",
    color: "#000",
    zIndex: 10,
    cursor: "pointer",
    userSelect: "none",
  };
};
