import {
  IncomingMessage as Request,
  ServerResponse as Response
} from 'node:http'

export type Method = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE'
export type RouteHandler = (req: Request, res: Response, ctx?: { query?: {}, params?: {} }) => void
export interface Wroutes {
  [endpoint: string]: {
    [method in Method]?: RouteHandler
  }
}
