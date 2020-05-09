import startServer from "./startServer"

startServer()
  .then(({ port }) => console.log(`Listening on port ${port}`))
  .catch(console.error)
