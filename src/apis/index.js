import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

export const createNewColumn = async (id) => {
  const request = await axios.post(`${API_ROOT}/v1/lists/${id}`)
  return request.data
}

export const createNewCard = async (id) => {
  const request = await axios.post(`${API_ROOT}/v1/cards/${id}`)
  return request.data
}