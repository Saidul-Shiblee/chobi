import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import useImage from "../../Hooks/useImage";
import Comments from "../ImageItem/comments";
import Likes from "../ImageItem/likes";
import Options from "../ImageItem/options";
import TimeStamp from "../ImageItem/timestamp";
import UserAvatar from "../ImageItem/useravatar";

// function srcset(image, size, rows = 1, cols = 1) {
//   return {
//     src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
//     srcSet: `${image}?w=${size * cols}&h=${
//       size * rows
//     }&fit=crop&auto=format&dpr=2 2x`,
//   };
// }

export default function ImagesList() {
  // addToDB = (collectionName, data, docID, cID)
  const { documents } = useImage("images");

  console.log("I am Rendered");
  return (
    <SimpleReactLightbox>
      <SRLWrapper>
        <ImageList
          sx={{ mt: "10px" }}
          variant="quilted"
          cols={4}
          rowHeight={200}
        >
          {documents.map((item, index) => (
            <ImageListItem
              key={item?.id}
              // cols={pattern[index % pattern.length].cols}
              // rows={pattern[index % pattern.length].rows}
              sx={{
                opacity: ".7",
                transition: "opacity .3s linear",
                cursor: "pointer",
                "&:hover": { opacity: 1 },
              }}
            >
              <img
                // {...srcset(
                //   item?.data?.imageURL,
                //   200,
                //   pattern[index % pattern.length].rows,
                //   pattern[index % pattern.length].cols
                // )}
                src={`${item?.data?.imageURL}?w=248&fit=crop&auto=format`}
                srcSet={`${item?.data?.imageURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item?.data?.uName || item?.data?.uEmail}
                loading="lazy"
              />
              <Comments item={item} />

              <Likes item={item} />
              <TimeStamp item={item} />
              <UserAvatar item={item} />
              <Options item={item} />
            </ImageListItem>
          ))}
        </ImageList>
      </SRLWrapper>
    </SimpleReactLightbox>
  );
}

const pattern = [
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
];
