import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Column from "./Column/Column";
import QueueIcon from "@mui/icons-material/Queue";
import { createNewColumn } from "~/apis";
import { useState, useRef, useCallback } from "react";
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'

function ListColumns({ columns, board, onColumnChange, onCardChange }) {
  const [columnState, setColumnState] = useState([])
  const [boardState, setBoardState] = useState([])
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const onNewColumnTitleChange = useCallback((e) => setNewColumnTitle(e.target.value), [])

  const newColumnInputRef = useRef(null)

  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error("Please enter Column Title!")
      return
    }

    const newColumnToAdd = {
      boardId: board._id,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards: []
    }

    createNewColumn(newColumnToAdd).then(column => {
      let newColumns = [...columns]
      newColumns.push(column)

      let newBoard = { ...board }
      newBoard.columnOrder = newColumns.map(c => c._id)
      newBoard.columns = newColumns

      setColumnState(newColumns)
      setBoardState(newBoard)
      setNewColumnTitle('')
      toggleOpenNewColumnForm()
      
      // Call the callback function
      console.log("newBoard: " + newBoard)
      onColumnChange(newBoard)
    })
    // console.log(newColumnTitle)
    // Goi API o day

    // Đóng lại trạng thái thêm Column mới & Clear Input
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  const onUpdateColumn = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate._id

    let newColumns = [...columns]
    const columnIndexToUpdate = newColumns.findIndex(i => i._id === columnIdToUpdate)

    if (newColumnToUpdate._destroy) {
      // remove column
      newColumns.splice(columnIndexToUpdate, 1)
    } else {
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
    }

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c._id)
    newBoard.columns = newColumns

    setColumnState(newColumns)
    setBoardState(newBoard)
  }

  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  return (
    <Box
      sx={{
        bgcolor: "inherit",
        width: "100%",
        height: "100%",
        display: "flex",
        overflowX: "auto",
        overflowY: "hidden",
        "&::-webkit-scrollbar-track": {
          m: 2
        }
      }}
    >
      {columns?.map((column) => (
        <Column key={column._id} column={column} board={board} onUpdateColumn={onUpdateColumn} onCardChange={onCardChange}/>
      ))}
      {!openNewColumnForm
        ? <Box onClick={toggleOpenNewColumnForm}
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
              color: "white",
              width: "100%",
              justifyContent: "flex-start",
              pl: 2.5,
              py: 1,
            }}
          >
            Add New Column
          </Button>
        </Box>
        : <Box sx={{
          minWidth: "250px",
          maxWidth: "250px",
          mx: 2,
          p: 1,
          borderRadius: "6px",
          height: "fit-content",
          bgcolor: "#ffffff3d",
          display: "flex",
          flexDirection: "column",
          gap: 1
        }}>
          <TextField
            label="Enter column title..."
            type="text"
            size="small"
            variant="outlined"
            autoFocus
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}

            sx={{
              '& label': { color: 'white' },
              '& input': { color: 'white' },
              '& label.Mui-focused': { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              }
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              onClick={addNewColumn}
              variant="contained" color="success" size="small"
              sx={{
                boxShadow: 'none',
                border: '0.5px solid',
                borderColor: (theme) => theme.palette.success.main,
                '&:hover': { bgcolor: (theme) => theme.palette.success.main }
              }}
            >
              Add Column
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CloseIcon
                fontSize='small'
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        </Box>
      }
    </Box>
  );
}

export default ListColumns;
