import {
  IncomingMessage as Request,
  ServerResponse as Response
} from 'node:http';

export const GET = async (_: Request, res: Response) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ content: 'Hello World!' }))
}