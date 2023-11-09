import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import Popper from "@mui/material/Popper";
import { CardContext } from "../ListCards";
import SubtitlesIcon from "@mui/icons-material/Subtitles";

function CardDetails() {
  const { isCardDetailsOpen, closeCardDetails, selectedCardTitle } =
    React.useContext(CardContext);
  console.log("chạy cái lồn", { selectedCardTitle });

  return (
    <Popper open={isCardDetailsOpen}>
      <Box
        sx={{
          width: "600px",
          height: "500px",
          backgroundColor: "#424242",
          borderRadius: "8px",
          display: "flex",
          ml: 30,
          mt: 20,
        }}
      >
        {/* Card Details header */}
        <Box
          sx={{
            width: "600px",
            height: "100px",
          }}
        >
          {selectedCardTitle}
        </Box>
        {/* Card Main Details */}
        <Box sx={{}}>
          <Typography>abc</Typography>
        </Box>
        <Button onClick={closeCardDetails}>Close</Button>
      </Box>
    </Popper>
  );
}

export default CardDetails;
