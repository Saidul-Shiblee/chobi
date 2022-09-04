import CardHeader from "@mui/material/CardHeader";
import Options from "./PostIndividualtem/options";
import TimeStamp from "./PostIndividualtem/timeStamp";
import UserAvatar from "./PostIndividualtem/userAvatar";

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
