import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import * as React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImageSlideShow({ imgURL, open, handleClose }) {
  const [current, setCurrent] = React.useState(0);
  const length = imgURL.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(imgURL) || length <= 0) {
    return null;
  }

  return (
    <Dialog
      className="sliderProfile"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent style={{ overflow: "hidden", padding: "0px" }}>
        {length > 1 ? (
          <NavigateBeforeIcon
            sx={arrow("left")}
            style={{
              color: "rgba(255, 255, 255, 1.0)",
              background: "#383838",
              borderRadius: "50%",
              display: "block",
              width: "25px",
              height: "25px",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
            onClick={prevSlide}
          />
        ) : (
          ""
        )}
        {length > 1 ? (
          <NavigateNextIcon
            sx={arrow("right")}
            style={{
              color: "rgba(255, 255, 255, 1.0)",
              background: "#383838",
              borderRadius: "50%",
              display: "block",
              width: "25px",
              height: "25px",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
            onClick={nextSlide}
          />
        ) : (
          ""
        )}

        {imgURL.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide activeSlide" : "slide"}
              key={index}
            >
              {index === current && (
                <img src={slide} alt="" className="image-slideshow" />
              )}
            </div>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}

const arrow = (direction) => {
  return {
    position: "absolute",
    top: "50%",
    translateY: "-50%",
    [direction]: "32px",
    fontSize: "1rem",
    color: "#000",
    zIndex: 10,
    cursor: "pointer",
    userSelect: "none",
  };
};
