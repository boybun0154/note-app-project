import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Tooltip
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Box from '@mui/material/Box'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste
} from '@mui/icons-material'
import AddCardIcon from '@mui/icons-material/AddCard'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { createNewCard, updateColumn } from '~/apis'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { cloneDeep } from 'lodash'

function Column({ column, board, onCardChange }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const [openChangeColumnTitle, setOpenChangeColumnTitle] = useState(false)
  const [changeColumnTitle, setChangeColumnTitle] = useState(column.title)
  const [newCardTitle, setNewCardTitle] = useState('');
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })
  function openDeleteColumnDialog() {
    setOpenDialog(true);
  }
  function handleCloseDialog() {
    setOpenDialog(false);
  }

  const dndKitColumnStyles = {
    // touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  const toggleOpenChangeColumnTitle = () => setOpenChangeColumnTitle(!openChangeColumnTitle)

  const addNewCard = () => {
    if (!newCardTitle) {
      toast.error('Please enter Card Title!', { position: 'bottom-right' })
      return
    }
    // console.log(newCardTitle)
    // Goi API o day

    const newCardToAdd = {
      boardId: board._id,
      columnId: column._id,
      title: newCardTitle.trim()
    }

    createNewCard(newCardToAdd).then(card => {
      let newColumns = cloneDeep(column)
      newColumns.cards.push(card)

      onCardChange(newColumns)
    })

    // Đóng lại trạng thái thêm Card mới & Clear Input
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }

  const editColumnTitle = () => {
    if (!changeColumnTitle) {
      toast.error('Please enter new Column Title!', { position: 'bottom-right' })
      newCardInputRef.current.focus()
      return
    }
    // console.log(newCardTitle)
    // Goi API o day

    const newColumnTitle = {
      title: changeColumnTitle
    }

    updateColumn(column._id, newColumnTitle).then(() => {
      // Assuming updatedTitle is the response from the API containing the updated title
      let newColumns = cloneDeep(column);

      onCardChange(newColumns);
    });

    // Đóng lại trạng thái thêm Card mới & Clear Input
    toggleOpenChangeColumnTitle()
    setChangeColumnTitle('')
  }

  const deleteColumn = () => {

    const destroyColumn = {
      _destroy: 'true'
    }

    updateColumn(column._id, destroyColumn).then(() => {
      let newColumns = cloneDeep(column);

      onCardChange(newColumns);
    });
    setChangeColumnTitle('')
  }

  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          overflowY: 'auto',
        overflowX: 'auto',
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}
      >
        {/* Box Column Header */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 2,
            display: 'flex',
            alignItemts: 'center',
            justifyContent: 'space-between'
            // position: "fixed",
            // backgroundColor: "#fff" /* Thay đổi màu nền theo ý muốn */,
            // zIndex: 999,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {!openChangeColumnTitle
              ? column && column.title
              : <Box sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <TextField
                  type="text"
                  size="small"
                  variant="outlined"
                  autoFocus
                  value={changeColumnTitle}
                  onChange={(e) => setChangeColumnTitle(e.target.value)}

                  sx={{
                    '& label': { color: 'text.primary' },
                    '& input': {
                      color: (theme) => theme.palette.primary.main,
                      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                    },
                    '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: (theme) => theme.palette.primary.main },
                      '&:hover fieldset': { borderColor: (theme) => theme.palette.primary.main },
                      '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.primary.main }
                    },
                    '& .MuiOutlinedInput-input': {
                      borderRadius: 1
                    }
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    onClick={editColumnTitle}
                    variant="contained" color="success" size="small"
                    sx={{
                      boxShadow: 'none',
                      border: '0.5px solid',
                      borderColor: (theme) => theme.palette.success.main,
                      '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                    }}
                  >
                    Edit
                  </Button>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CloseIcon
                      fontSize='small'
                      sx={{
                        color: (theme) => theme.palette.warning.light,
                        cursor: 'pointer'
                      }}
                      onClick={toggleOpenChangeColumnTitle}
                    />
                  </Box>
                </Box>
              </Box>
            }
          </Typography>
          <Box>
            <Tooltip title="More options">
              <ExpandMoreIcon
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem onClick={() => { toggleOpenNewCardForm(); handleClose(); }} >
                <ListItemIcon>
                  <AddCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText> Add New Card </ListItemText>
              </MenuItem>
              <MenuItem onClick={() => { toggleOpenChangeColumnTitle(); handleClose(); }} >
                <ListItemIcon>
                  <AddCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText> Edit Title </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText> Cut </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText> Copy </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText> Paste </ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
              <MenuItem onClick={openDeleteColumnDialog}>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* List Card */}
        <ListCards cards={orderedCards} />

        {/* Box Column Footer */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p: 2,
            display: 'flex',
            alignItemts: 'center',
            justifyContent: 'space-between'
          }}
        >
          {!openNewCardForm
            ? <Box sx={{
              height: '100%',
              display: 'flex',
              alighItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Button startIcon={<AddCardIcon />} onClick={toggleOpenNewCardForm}> Add new card</Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon
                  sx={{
                    cursor: 'pointer'
                  }}
                />
              </Tooltip>
            </Box>
            : <Box sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <TextField
                label="Enter card title..."
                type="text"
                size="small"
                variant="outlined"
                autoFocus
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}

                sx={{
                  '& label': { color: 'text.primary' },
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                  },
                  '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: (theme) => theme.palette.primary.main },
                    '&:hover fieldset': { borderColor: (theme) => theme.palette.primary.main },
                    '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.primary.main }
                  },
                  '& .MuiOutlinedInput-input': {
                    borderRadius: 1
                  }
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  onClick={addNewCard}
                  variant="contained" color="success" size="small"
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                  }}
                >
                  Add
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CloseIcon
                    fontSize='small'
                    sx={{
                      color: (theme) => theme.palette.warning.light,
                      cursor: 'pointer'
                    }}
                    onClick={toggleOpenNewCardForm}
                  />
                </Box>
              </Box>
            </Box>
          }
        </Box>
        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Are you sure you want to delete column "{column.title}"?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deleting this column will remove all associated cards. This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteColumn} color="primary" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  )
}

export default Column
