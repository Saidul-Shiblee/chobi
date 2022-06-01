import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import * as React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MultipleImageShow({ imgURL, open, handleClose }) {
  const [current, setCurrent] = React.useState(0);
  const length = imgURL.length;
  console.log(imgURL);

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
          <ArrowBackIosNewIcon
            sx={arrow("left")}
            style={{
              color: "white",
              background: "#383838",
              borderRadius: "50%",
              display: "block",
              width: "32px",
              height: "32px",
              opacity: "0.8",
            }}
            onClick={prevSlide}
          />
        ) : (
          ""
        )}
        {length > 1 ? (
          <ArrowForwardIosIcon
            sx={arrow("right")}
            style={{
              color: "white",
              background: "#383838",
              borderRadius: "50%",
              display: "block",
              width: "32px",
              height: "32px",
              opacity: "0.8",
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
                <img src={slide} alt="" className="image" />
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
    [direction]: "32px",
    fontSize: "1rem",
    color: "#000",
    zIndex: 10,
    cursor: "pointer",
    userSelect: "none",
  };
};
