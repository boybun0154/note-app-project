// Board list
import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./index.css";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Create from "../../components/AppBar/Menus/Create";
import {auth as authHelper} from "../../helpers";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginTop: 12,
  "&:hover": {
    backgroundColor: "#303842",
  },
}));

const BoardList: React.FC = () => {
  const userId = authHelper.getCurrentUserId();
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // get boards data
  });
  
  return (
    <>
      <CssBaseline />
      <Container className="board-list-container" maxWidth="sm">
        <Typography variant="h3" gutterBottom>
          Board List
        </Typography>
        <Stack>
          <Create />
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </Stack>
      </Container>
    </>
  );
};

export default BoardList;
