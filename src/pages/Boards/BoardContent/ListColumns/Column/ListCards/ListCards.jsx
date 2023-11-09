/* eslint-disable react/jsx-key */
import Box from "@mui/material/Box";
import Card from "./Cards/Card";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useState } from "react";
import CardDetails from "./Cards/CardDetails";

export const CardContext = React.createContext();

function ListCards({ cards }) {
  const [isCardDetailsOpen, setIsCardDetailsOpen] = useState(false);
  const openCardDetails = () => {
    setIsCardDetailsOpen(true);
  };

  const closeCardDetails = () => {
    setIsCardDetailsOpen(false);
  };

  return (
    <SortableContext
      items={cards?.map((c) => c._id)}
      strategy={verticalListSortingStrategy}
    >
      <Box
        sx={{
          p: "0 5px 5px 5px",
          m: "0 5px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          overflowX: "hidden",
          overflowY: "auto",
          maxHeight: (theme) => `calc(
            ${theme.trello.boardContentHeight} - 
            ${theme.spacing(5)} - 
            ${theme.trello.columnHeaderHeight} -
            ${theme.trello.columnFooterHeight}
              )`,
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ced0da",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#bfc2cf",
          },
        }}
      >
        {cards?.map((card) => (
          <CardContext.Provider
            key={card._id}
            value={{
              isCardDetailsOpen,
              openCardDetails,
              closeCardDetails,
              selectedCardTitle: card.title,
            }}
          >
            <Card key={card._id} card={card} />
            {isCardDetailsOpen && <CardDetails />}
          </CardContext.Provider>
        ))}
      </Box>
    </SortableContext>
  );
}

export default ListCards;
