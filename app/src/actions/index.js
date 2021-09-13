import { SAVE_COMMENT, FETCH_COMMENTS } from './types'
import jsonplaceholder from 'api/jsonplaceholder'
import axios from 'axios'

export const saveComment = (comment) => {
  return {
    type: SAVE_COMMENT,
    payload: comment
  }
}

export const fetchComments = () => async dispatch => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/comments')//jsonplaceholder.get('comments')

  dispatch({ type: FETCH_COMMENTS, payload: response })
}