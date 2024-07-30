import { IncomingMessage, ServerResponse } from 'node:http';
import { RouteMap, HttpMethod } from './router.types';

export const router = (routes: RouteMap) => {
  const routeMap: RouteMap = { ...routes }

  return (req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;

    if (typeof method === 'string' && url && (url in routeMap)) {
      const handler = routeMap[url]?.[method as HttpMethod]

      if (handler) {
        handler(req, res);
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