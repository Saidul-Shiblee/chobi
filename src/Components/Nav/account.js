import { Box } from "@mui/material";
import AddPost from "./NavItems/addPost";
import Explore from "./NavItems/explore";
import Home from "./NavItems/home";
import UserMenu from "./NavItems/userMenu";

const Account = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Home />
      <AddPost />
      <Explore />
      <UserMenu />
    </Box>
  );
};

export default Account;
