import Container from '@mui/material/Container'
import Appbar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI } from '~/apis'
import { useState, useEffect } from 'react'

function Board() {
  const [board, setBoard] = useState('')
  const handleBoardChange = (newBoard) => {
    const boardId = '654a2bd9ba34f2d67a98ddcb'
    fetchBoardDetailsAPI(boardId)
      .then(board => {
        // console.log('card change:', board) // Log the received board data
        setBoard(board)
      })
      .catch(error => {
        console.error('Error fetching board data:', error) // Log any errors
      })
  }

  useEffect(() => {
    // console.log('Fetching board data...') // Log when fetching starts
    const boardId = '654a2bd9ba34f2d67a98ddcb'
    // console.log(boardId)
    fetchBoardDetailsAPI(boardId)
      .then(board => {
        console.log('Board data received:', board) // Log the received board data
        setBoard(board)
      })
      .catch(error => {
        console.error('Error fetching board data:', error) // Log any errors
      })

    return () => {
      // console.log('Cleanup or cancellation logic (if needed)...')
    }
  }, []) // Empty dependency array means this effect runs once after the initial render

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Appbar board = {board}/>
      <BoardBar board = {board}/>
      <BoardContent board = {board} onBoardChange={handleBoardChange} />
    </Container>
  )
}

export default Board
