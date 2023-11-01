import Container from '@mui/material/Container'
import Appbar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import {mockData} from '../../apis/mock-data'
import {fetchBoardDetailsAPI} from '~/apis'
import { useState, useEffect } from 'react'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    console.log('Fetching board data...'); // Log when fetching starts
    const boardId = '6541f84c9e88cea5044a321e';
    console.log(boardId)
    fetchBoardDetailsAPI(boardId)
      .then(board => {
        console.log('Board data received:', board); // Log the received board data
        setBoard(board);
      })
      .catch(error => {
        console.error('Error fetching board data:', error); // Log any errors
      });
  
    return () => {
      console.log('Cleanup or cancellation logic (if needed)...');
    };
  }, []); // Empty dependency array means this effect runs once after the initial render
  
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Appbar />
      <BoardBar board = {board}/>
      <BoardContent board = {board} />
    </Container>
  )
}

export default Board
