import CardHeader from "@mui/material/CardHeader";
import Options from "../ImageItem/options";
import TimeStamp from "../ImageItem/timestamp";
import UserAvatar from "../ImageItem/useravatar";

const PostHeader = ({ item }) => {
  return (
    <CardHeader
      style={{ paddingLeft: "8px" }}
      avatar={<UserAvatar item={item} />}
      action={<Options item={item} />}
      title={item.uID}
      subheader={<TimeStamp item={item} />}
    />
  );
};

export default PostHeader;
