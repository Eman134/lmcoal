import fastify from 'fastify'

export default class LMCoal {
  constructor() {
    console.log('Colecting coal...')
  }

  ignite() {
    const app = fastify()

    const { ADDRESS = 'localhost', PORT = 3000 } = process.env

    app.get('/', async (_request, _reply) => {
      return { hello: 'world' }
    })

    app.listen({ host: ADDRESS, port: Number(PORT) }, (err, address) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Ignited at ${address}`)
    })
  }
}
