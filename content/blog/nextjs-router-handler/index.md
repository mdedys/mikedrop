---
title: Simple Next.js API Route Handler
date: "2020-08-18T12:00:00.000Z"
description: "An example of simple api routing using Next.js built-in API implementation."
---

After working on a few projects that were using Next.js I decided to experiment with my own. The project I chose to build was basically a clone of [adminer](https://github.com/vrana/adminer/) using react, material-ui, and next.js.

Next.js offers two different methods of implementing API routes. You can use the built-in API routing offered or implement a custom server (express, koa, fastify, etc). To use the built-in system, simply define a folder called `API` within the `pages` structure and define the routes in there.

**Example**

```javascript
pages
  ---> api
        ---> health
               ---> index.js

```

This would create `/api/health` API route. The projects that I have worked with all used a custom server. I never really questioned the decision to use this but for this project, I decided to use the built-in API routing.

### Next.js Routing

The built-in solution is simple to set up and use. **Caveat** I didn't really set up any middleware or add any complex API logic. Just create the folder within the API subfolder in pages. Next add an index.js file that contains:

```javascript
export default (req, res) => {
  res.status(200).json({ message: "Hello World" })
}
```

You now have a working API. The next question you may have is what method does this API route handle? The answer is **every**. Where in express you define the method here you have to manually check for the `method` on the request object.

Example from documentation:

```javascript
export default (req, res) => {
  if (req.method === "POST") {
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}
```

Doing this for every API route you may implement seems a bit odd so I created the following helper function to deal with the if statements.

```javascript
export function handler(req, res, routes) {
  return new Promise(async resolve => {
    const { method } = req

    try {
      const route = routes[method]

      if (!route) {
        res.status(501).json({ message: "Not Implemented" })
        return
      }

      await route(req, res)
      resolve()
    } catch (ex) {
      const message =
        process.env.NODE_ENV !== "production" ? ex : "Internal Server Error"
      res.status(500).json({ message })
      resolve()
    }
  })
}
```

[Typescript implementation](https://github.com/mdedys/db-manageh/blob/master/server/utils/api.ts)

Using this helper function is quite simple:

`api/health/index.js`

```javascript

import handler from "./api-handler"

const routes = {
    GET: (req, res) => res.status(200)
}

export default function health(req, res) => handler(req, res, routes)
```

[Typescript implementation](https://github.com/mdedys/db-manageh/blob/master/pages/api/health.ts)

I feel this is a much cleaner implementation that can be reused. It also makes it much simpler to define new routes.

As this adminer clone grows I am hoping to dive deeper into adding middleware and more complex elements to gain a better understanding of the tradeoffs between using the built-in API implementation or rolling with a custom server.

My adminer clone is moving along very slowly so if you want to contribute please do: [github repo](https://github.com/mdedys/db-manageh/)

Next.js documentation can be found [here](https://nextjs.org/docs/api-routes/introduction).
