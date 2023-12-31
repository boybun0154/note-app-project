import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Column from "./Column/Column";
import QueueIcon from "@mui/icons-material/Queue";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { createNewColumn } from "~/apis";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { generatePlaceholderCard } from "~/utils/formatters";
import { cloneDeep } from "lodash";

function ListColumns({ columns, board, onColumnChange, onCardChange }) {
  const [columnState, setColumnState] = useState([]);
  const [boardState, setBoardState] = useState([]);
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const toggleOpenNewColumnForm = () =>
    setOpenNewColumnForm(!openNewColumnForm);

  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error("Please enter Column Title!");
      return;
    }

    const newColumnToAdd = {
      boardId: board._id,
      title: newColumnTitle.trim(),
      cardOrderIds: [],
      cards: [],
    };

    createNewColumn(newColumnToAdd).then((column) => {
      let newColumns = cloneDeep(columns);
      column.cards = [generatePlaceholderCard(column)];
      column.cardOrderIds = column.cards.map((c) => c._id);
      newColumns.push(column);

      let newBoard = cloneDeep(board);
      newBoard.columnOrder = newColumns.map((c) => c._id);
      newBoard.columns = newColumns;

      setColumnState(newColumns);
      setBoardState(newBoard);
      setNewColumnTitle("");
      toggleOpenNewColumnForm();

      // Call the callback function
      // console.log('newBoard: ' + newBoard)
      onColumnChange(newBoard);
    });
    // console.log(newColumnTitle)
    // Goi API o day

    // Đóng lại trạng thái thêm Column mới & Clear Input
    toggleOpenNewColumnForm();
    setNewColumnTitle("");
  };

  return (
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          "&::-webkit-scrollbar-track": {
            m: 2,
          },
        }}
      >
        {columns?.map((column) => (
          <Column
            key={column._id}
            column={column}
            board={board}
            onCardChange={onCardChange}
          />
        ))}

        {!openNewColumnForm ? (
          <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
            }}
          >
            {/* Add New Column */}
            <Button
              startIcon={<QueueIcon />}
              sx={{
                color: "ffffff3d",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
              }}
            >
              Add New Column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              p: 1,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              label="Enter column title..."
              type="text"
              size="small"
              variant="outlined"
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                "& label": { color: "ffffff3d" },
                "& input": { color: "ffffff3d" },
                "& label.Mui-focused": { color: "ffffff3d" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "ffffff3d" },
                  "&:hover fieldset": { borderColor: "ffffff3d" },
                  "&.Mui-focused fieldset": { borderColor: "ffffff3d" },
                },
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                onClick={addNewColumn}
                variant="contained"
                color="success"
                size="small"
                sx={{
                  boxShadow: "none",
                  border: "0.5px solid",
                  borderColor: (theme) => theme.palette.success.main,
                  "&:hover": { bgcolor: (theme) => theme.palette.success.main },
                }}
              >
                Add Column
              </Button>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CloseIcon
                  fontSize="small"
                  sx={{
                    color: "white",
                    cursor: "pointer",
                    "&:hover": {
                      color: (theme) => theme.palette.warning.light,
                    },
                  }}
                  onClick={toggleOpenNewColumnForm}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
}

export default ListColumns;
