import { RouteParameters } from '../../types'

export const posts = {
  GET: async ({ res }: RouteParameters) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ content: [{}] }))
  }
}

export const postById = {
  GET: async ({ res, _ }: RouteParameters) => {
    const id = _.uri.get('id')
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ content: { id, type: 'Post' } }))
  }
}

export const postComments = {
  GET: async ({ res, _ }: RouteParameters) => {
    const id = _.uri.get('id')
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ content: [{ postId: id }] }))
  }
}

export const postCommentById = {
  GET: async ({ res, _ }: RouteParameters) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ content: Object.fromEntries(_.uri) }))
  }
}
