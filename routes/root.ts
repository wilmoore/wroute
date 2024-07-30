import { IncomingMessage, ServerResponse } from 'node:http';

export const GET = async (_: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ content: 'Hello World!' }))
}