import { Box } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";
import { mockData } from "~/apis/mock-data";
import { useState } from "react";

function BoardContent({ board, onBoardChange }) {
  if (!board) {
    return null;
  }
  const orderedColumns = mapOrder(board.lists, board.listOrderIds, "_id");
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
        width: "100%",
        height: (theme) => theme.trello.boardContentHeight,
        p: "10px 0",
      }}
    >
      <ListColumns board={board} columns={orderedColumns} onColumnChange={onBoardChange} onCardChange={onBoardChange}/>
    </Box>
  );
}

export default BoardContent;
