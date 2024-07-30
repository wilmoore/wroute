import { Method, Wroutes } from './types'
import {
  IncomingMessage as Request,
  ServerResponse as Response,
} from 'node:http'

export const router = (routes: Wroutes) => {
  return (req: Request, res: Response) => {
    const { method, url } = req;

    if ((typeof url === 'string') && (url in routes)) {
      const routeHandler = routes[url][method as Method]

      if (routeHandler) {
        routeHandler(req, res)
      } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' })
        res.end('Method Not Allowed')
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Not Found')
    }
  }
}
