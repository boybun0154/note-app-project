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
import { auth as authHelper } from "../../helpers";
import { fetchBoardDetailsAPI, getBoardsIdByUserId } from "~/apis";
import { redirect, useNavigate } from "react-router-dom";



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginTop: 12,
  "&:hover": {
    backgroundColor: "gray",
  },
  cursor: "pointer"
}));

const BoardList: React.FC = () => {
  const userId: string = authHelper.getCurrentUserId();
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

  if (!userId) {
    return <div>403 Bad Request</div>;
  }

  const onClickItem = (e, id) => {
    e.preventDefault();
    navigate(`/boards/${id}`);
  };

  const getBoardTitle = async (id) => {
    const board = await fetchBoardDetailsAPI(id);
    return board.title;
  };
  const getBoardIds = async () => {
    const boardIds: string[] = await getBoardsIdByUserId(userId);
    const boards: {}[] =  await boardIds.map(async (id) => {
      const title = await getBoardTitle(id);
      setBoards((prev) => [
        ...prev,
        {
          id,
          title,
        },
      ]);
    });
  };

  useEffect(() => {
    // get boards data
    
    getBoardIds();
  }, [userId]);


  return (
    <>
      <CssBaseline />
      <Container className="board-list-container" maxWidth="sm">
        <Typography variant="h3" gutterBottom>
          Board List
        </Typography>
        <Stack>
          <Create />
          {boards &&
            boards.map((board) => {
              return (
                <Item key={board.id} onClick={(e) => onClickItem(e, board.id)}>
                  {board.title}
                </Item>
              );
            })}
        </Stack>
      </Container>
    </>
  );
};

export default BoardList;
