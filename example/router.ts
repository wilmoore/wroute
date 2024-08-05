import * as root from './resource/root'
import { posts, postById, postComments, postCommentById } from './resource/post'
import { router as wroute } from '../'

const routes = {
  '/': { ...root },
  '/posts': { ...posts },
  '/posts/{id}': { ...postById },
  '/posts/{id}/comments': { ...postComments },
  '/posts/{id}/comments/{commentId}': { ...postCommentById },
}

export const router = () => wroute(routes)
