import { IncomingMessage, ServerResponse } from 'node:http'

export type HandlerFunction = (req: IncomingMessage, res: ServerResponse) => void

export interface RouteMap {
  [endpoint: string]: {
    [method in HttpMethod]?: HandlerFunction
  }
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'