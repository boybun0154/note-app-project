import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const updateBoard = async (boardId, data) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, data)
  return response.data
}

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

export const createNewColumn = async (data) => {
  console.log(data.boardId, data.title)
  const request = await axios.post(`${API_ROOT}/v1/lists`,
    {
      boardId: data.boardId,
      title: data.title
    }
  )
  return request.data
}

export const createNewCard = async (data) => {
  console.log(data.boardId, data.title)
  const request = await axios.post(`${API_ROOT}/v1/cards`,
    {
      boardId: data.boardId,
      listId: data.columnId,
      title: data.title
    }
  )
  return request.data
}

export const updateColumn = async (id, data) => {
  const request = await axios.put(`${API_ROOT}/v1/lists/${id}`, data)
  return request.data
}

export const updateCard = async (id, data) => {
  const request = await axios.put(`${API_ROOT}/v1/cards/${id}`, data)
  return request.data
}
