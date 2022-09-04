import Typography from "@mui/material/Typography";
import moment from "moment";
import * as React from "react";
export default function TimeStamp({ item }) {
  return (
    <Typography variant="body2" component="span">
      {item?.data.updated ? "Updated " : "Posted "}
      {moment(item?.data?.timestamp?.toDate()).fromNow()}
    </Typography>
  );
}
