import { IncomingMessage, ServerResponse } from 'node:http'

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'
export type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void
export interface Wroutes {
  [endpoint: string]: {
    [method in Method]?: RouteHandler
  }
}