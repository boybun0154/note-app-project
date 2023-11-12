import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import FilterListIcon from '@mui/icons-material/FilterList'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Typography } from '@mui/material'
import { fetchBoardDetailsAPI, findUsernameById } from '~/apis'
import { cloneDeep } from 'lodash'

function FilterItem({ userid, handleChange }) {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    findUsernameById(userid).then((username) => {
      setUsername(username);
    });
  }, [userid]);

  if (!username) {
    return null;
  }
  return (
    <MenuItem sx={{ py: '4px' }} disableRipple>
      <FormControlLabel control={<Checkbox size='small' onChange={handleChange} id={userid} name={username} />} label={username} />
    </MenuItem>
  )
}

export default function Filters({ board, setBoard }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [state, setState] = React.useState({})
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  // console.log('board.memberIds: ', board?.memberIds)

  const findColumnByMemberId = (memberId) =>{
    const filteredColumns = board.lists?.filter(column => column?.cards?.map(c => c._id)?.memberIds?.includes(memberId))
    return filteredColumns
  }

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    })
    if (event.target.checked) {
      // console.log('event.target.id: ', event.target.id)
      setBoard(prevBoard => {
        const newBoard = cloneDeep(prevBoard)
        newBoard.lists = board.lists.filter(column => column.cards.some(c => c.memberIds.includes(event.target.id)))
        newBoard.lists.cards = newBoard.lists.map(column => column.cards.filter(card => card.memberIds.includes(event.target.id)))
        return newBoard
      })
    }
    if (!event.target.checked) {
      // reset state before filtering
      fetchBoardDetailsAPI(board._id).then(board => setBoard(board))
    }
  }


  return (
    <Box>
      <Chip
        sx={{
          color: 'white',
          bgcolor: 'transparent',
          border: 'none',
          paddingX: '5px',
          borderRadius: '4px',
          '.MuiSvgIcon-root': {
            color: 'white'
          },
          '&:hover': {
            bgcolor: 'primary.50'
          }
        }}
        icon={<FilterListIcon />}
        label="Filters"
        id="basic-button-filter"
        aria-controls={open ? 'basic-menu-filter' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu-filter"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-filter'
        }}
      >
        <MenuItem sx={{ py: '4px', '&:hover': { bgcolor: 'transparent' } }} divider disableRipple>
          <Typography sx={{ fontWeight: 500 }} variant='body2' color='text.secondary'>Members</Typography>
        </MenuItem>
        {board?.memberIds?.map(id => <FilterItem key={id} userid={id} handleChange={handleChange} />)}
      </Menu>
    </Box>
  )
}
