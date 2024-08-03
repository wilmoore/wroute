import {
  IncomingMessage as Request,
  ServerResponse as Response
} from 'node:http'

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'
export type RouteHandler = (req: Request, res: Response, ctx?: { query?: {}, params?: {} }) => void
export interface Wroutes {
  [endpoint: string]: {
    [method in Method]?: RouteHandler
  }
}
