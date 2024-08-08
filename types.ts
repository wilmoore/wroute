import {
  IncomingMessage as Request,
  ServerResponse as Response
} from 'node:http'

export type Method = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE'
export type Context = {
  uri: Map<string, any>,
  qry: Map<string, any>
}
export type RouteParameters = { req?: Request, res: Response, _: Context }
export type RouteHandler = ({ req, res, _ }: RouteParameters) => void
export interface Wroutes {
  [endpoint: string]: {
    [method in Method]?: RouteHandler
  }
}
