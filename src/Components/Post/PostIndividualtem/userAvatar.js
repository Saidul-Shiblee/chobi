import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import * as React from "react";
import AvatartWraper from "./avatartWraper";

export default function UserAvatar({ item }) {
  return (
    <AvatartWraper outerRing={"48px"} innerRing={"43px"}>
      <Tooltip
        TransitionComponent={Zoom}
        title={item?.data?.uName || item?.data?.uEmail}
      >
        <Avatar src={item?.uPhoto} imgProps={{ "aria-hidden": true }} />
      </Tooltip>
    </AvatartWraper>
  );
}
