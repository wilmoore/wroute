import * as root from './root'
import { posts, postById, postComments, postCommentById } from './posts'

export const routes = {
  '/': { ...root },
  '/posts': { ...posts },
  '/posts/{id}': { ...postById },
  '/posts/{id}/comments': { ...postComments },
  '/posts/{id}/comments/{commentId}': { ...postCommentById },
}
