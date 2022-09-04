import Box from "@mui/material/Box";
import React from "react";

const AvatartWraper = ({ children, outerRing, innerRing }) => {
  return (
    <Box
      sx={{
        width: `${outerRing}`,
        height: `${outerRing}`,

        borderRadius: "50%",
        background:
          "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(45,70,253,1) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: `${innerRing}`,
          height: `${innerRing}`,

          borderRadius: "50%",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AvatartWraper;
