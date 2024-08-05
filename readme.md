 [![LICENSE](http://img.shields.io/npm/l/wroute.svg?style=flat&colorA=000000&colorB=000000)](license) [![npm](https://img.shields.io/npm/v/wroute.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.org/package/wroute) [![downloads](http://img.shields.io/npm/dm/wroute.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.org/package/wroute) [![bundle size](https://img.shields.io/bundlephobia/minzip/zustand?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=zustand)

<p align="center">
  <img src="https://raw.githubusercontent.com/wilmoore/wroute/main/logo.png" />
</p>

## wroute
> A minimal [RFC6570] conforming HTTP multiplexer for defining endpoints with **typed URI Template** Syntax

```shell
pnpm add wroute
```

## features

- [RFC6570] conforming
- Dependency-free
- Minimal
- Typed URL & Query Parameters

## example
```ts
import { router } from 'wroute'
import { IncomingMessage as Request, ServerResponse as Response } from 'node:http'

const port = Number(process.env.PORT || 3000)
const host = String(process.env.HOST || `0.0.0.0`)

const server = createServer(
  router({
    '/': {
      GET: async (req: Request, res: Response) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ content: 'Hello World!' }))
      },
    },
  })
)

server.listen(port, host, () => console.log(
  `🚀 Server is running! | Listening on http://${host}:${port}. | To stop the server, press CTRL+C`
))
```

###### :rocket: launch the server
```
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
