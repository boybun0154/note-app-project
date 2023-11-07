import Container from '@mui/material/Container'
import Appbar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { fetchBoardDetailsAPI } from '~/apis'
import { useState, useEffect } from 'react'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '653a09df6774aca7178c8bdd'
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Appbar />
      <BoardBar board = {board}/>
      <BoardContent board = {board} />
    </Container>
  )
}

export default Board
