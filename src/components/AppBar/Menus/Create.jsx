import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { FormGroup, TextField } from '@mui/material'
import { createNewBoard } from '~/apis'
import { useNavigate } from 'react-router-dom'

export default function Create() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [title, setTitle] = React.useState('')
  const [type, setType] = React.useState('private')
  const [errors, setErrors] = React.useState({})
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const validate = (title) => {
    const errors = {}
    if (!title) {
      errors.title = 'Title is required'
    }
    return errors
  }
  const handleSubmit = (event) => {
    // console.log('event: ', event)
    event.preventDefault()
    const errors = validate(title)
    setErrors(errors)
    if (Object.keys(errors).length === 0) {
      // console.log('title:', title)
      // console.log('type:', type)
      // submit the form
      const newBoardToCreate = {
        title: title,
        description: 'Empty description',
        type: type,
        ownerId: '654324cb637a7840b2af0edc'
      }
      createNewBoard(newBoardToCreate).then((board) => {
        console.log('newBoard:', board)
        // does not auto redirect, only change url
        navigate(`/boards/${board._id}`)
        // navigate(0)
      })
    }
  }

  return (
    <Box>
      <Button
        sx={{ color: 'white' }}
        id="basic-button-create"
        aria-controls={open ? 'basic-menu-create' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<LibraryAddIcon />}
      >
        Create
      </Button>
      <Menu
        id="basic-menu-create"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-create'
        }}
      >
        <Box component='form'
        sx={{
        '& .MuiTextField-root': { m: 1 },
        '& .MuiButton-root': { mt: 1 },
        p: 1
        }}
        onSubmit={handleSubmit}
        noValidate
        >
          <FormGroup>
            <TextField
            label='Board title' id='title'
            size='small' name='title'
            error={!!errors.title}
            helperText={errors.title}
            InputLabelProps={{ shrink: true }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            required />
            <TextField
            label='Type'
            size='small'
            id='type' name='type'
            value={type}
            onChange={(e) => setType(e.target.value)}
            defaultValue='private'
            select >
              <MenuItem key='private' value='private'>Private</MenuItem>
              <MenuItem key='public' value='public'>Public</MenuItem>
            </TextField>
            <Button variant="contained" type='submit'>Create</Button>
          </FormGroup>
        </Box>
      </Menu>
    </Box>
  )
}
