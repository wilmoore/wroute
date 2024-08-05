import { IncomingMessage as Request, ServerResponse as Response } from 'node:http'

export const posts = {
  GET: async (_: Request, res: Response) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ content: [{}] }))
  }
}

export const postById = {
  GET: async (req: Request, res: Response, ctx: any) => {
    const { id } = ctx.params
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ content: { id, type: 'Post' } }))
  }
}

export const postComments = {
  GET: async (_: Request, res: Response, ctx: any) => {
    const { id: postId } = ctx.params
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ content: [{ postId }] }))
  }
}

export const postCommentById = {
  GET: async (_: Request, res: Response, ctx: any) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ content: { ...ctx.params } }))
  }
}
