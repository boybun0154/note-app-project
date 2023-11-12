import Container from '@mui/material/Container'
import Appbar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI, fetchBoardByUserIdDetailsAPI } from '~/apis'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Board() {
  const [board, setBoard] = useState('')
  const [boardByUserId, setBoardByUserId] = useState('')
  let { boardId } = useParams()
  // const boardId = '654a2bd9ba34f2d67a98ddcb'
  const handleBoardChange = (newBoard) => {
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
    // First fetch
    fetchBoardDetailsAPI(boardId)
      .then(board => {
        console.log('Board data received:', board);
        setBoard(board);
  
        // Second fetch - only initiated after the first fetch is successful
        return fetchBoardByUserIdDetailsAPI(board?.ownerId);
      })
      .then(boardByUserId => {
        console.log('Board by user id data received:', boardByUserId);
        setBoardByUserId(boardByUserId);
        boardByUserId?.map((board) => {
          console.log("Title: ", board.title);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
    return () => {
      // Cleanup or cancellation logic (if needed)...
    };
  }, []);

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Appbar boardByUserId = {boardByUserId}/>
      <BoardBar board = {board} setBoard = {setBoard}/>
      <BoardContent board = {board} onBoardChange={handleBoardChange} />
    </Container>
  )
}

export default Board
