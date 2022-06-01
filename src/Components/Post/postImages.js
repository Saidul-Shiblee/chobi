import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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
    <div className="slider">
      {imageURLS.length > 1 ? (
        <ArrowBackIosNewIcon
          sx={arrow("left")}
          style={{ color: "white" }}
          onClick={prevSlide}
        />
      ) : (
        ""
      )}
      {imageURLS.length > 1 ? (
        <ArrowForwardIosIcon
          sx={arrow("right")}
          style={{ color: "white" }}
          onClick={nextSlide}
        />
      ) : (
        ""
      )}

      {imageURLS.map((slide, index) => {
        return (
          <div
            style={{ width: "500px", height: "584px" }}
            className={index === current ? "slide activeSlide" : "slide"}
            key={index}
          >
            {index === current && <img src={slide} alt="" className="image" />}
          </div>
        );
      })}
    </div>
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
