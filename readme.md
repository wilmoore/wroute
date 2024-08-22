 [![LICENSE](http://img.shields.io/npm/l/wroute.svg?style=flat&colorA=000000&colorB=000000)](license) [![npm](https://img.shields.io/npm/v/wroute.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.org/package/wroute) [![downloads](http://img.shields.io/npm/dm/wroute.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.org/package/wroute) [![bundle size](https://img.shields.io/bundlephobia/minzip/wroute?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=wroute)

<p align="center">
  <img src="https://raw.githubusercontent.com/wilmoore/wroute/main/logo.png" />
</p>

## wroute
> Minimal [RFC6570] conforming HTTP multiplexer for defining endpoints with **typed URI Template** Syntax

```shell
pnpm add wroute
```

## features

- [RFC6570]
- Typed URL & Query Parameters
- No Dependencies

## example
### define routes
###### `router.ts`
```ts
import { IncomingMessage as Request, ServerResponse as Response } from 'node:http'
import { router as wroute } from 'wroute'

const routes = {
  '/': {
    GET: async (req: Request, res: Response) => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ content: 'Hello World!' }))
    },
  },
}

export const router = () => wroute(routes)
```

###### `server.ts`
```ts
import { createServer } from 'node:http'
import { router } from './router'

const port = Number(process.env.PORT || 3000)
const host = String(process.env.HOST || `0.0.0.0`)

createServer(router())
  .listen(port, host, () => console.log(
    `🚀 Server is running! | Listening @ http://${host}:${port}. | To stop the server, press CTRL+C`
  ))
```

###### :rocket: launch the server
```
» pnpm i
» touch .env
» node --watch --env-file=.env -r ts-node/register server
🚀 Server is running! | Listening on http://0.0.0.0:3000. | To stop the server, press CTRL+C
```

## status codes
- [`404`] status when request is to a missing **endpoint**
- [`405`] status when request is to a missing **method**

###### `200`
```
» curl -s 'http://0.0.0.0:3000' | yq .content
Hello World!
```

###### `404`
```
» curl -sI 'http://0.0.0.0:3000/nope'
HTTP/1.1 404 Not Found
Content-Type: text/plain
...
```

###### `405`
```
» curl -sI 'http://0.0.0.0:3000'
HTTP/1.1 405 Method Not Allowed
Content-Type: text/plain
...
```

---
[`404`]: #404
[`405`]: #405
[RFC6570]: https://datatracker.ietf.org/doc/html/rfc6570
