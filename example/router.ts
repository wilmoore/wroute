import * as root from './resource/root'
import { posts, postById, postComments, postCommentById } from './resource/post'
import { search } from './resource/search'
import { router as wroute } from '../'

const routes = {
  '/': { ...root },
  '/posts': { ...posts },
  '/posts/{id}': { ...postById },
  '/posts/{id}/comments': { ...postComments },
  '/posts/{id}/comments/{commentId}': { ...postCommentById },
  '/search/{query}{?offset,limit}': { ...search },
}

export const router = () => wroute(routes)
