import express from 'express'

export const server = express()
server.use(express.json())

server.listen(3333, () => {
  console.log('Server is running')
})
