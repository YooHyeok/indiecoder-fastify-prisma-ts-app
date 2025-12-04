import Fasitfy from "fastify";

const fastify = Fasitfy()

fastify.get('/ping', async (request, reply) => {
  return 'pong\n'
})

const start = async () => {
  try {
    await fastify.listen({ port: 8083 })
    console.log(`Server Start!!`)
  } catch (error) {
    fastify.log.error(error)
    process.exit(1) // 프로세스 종료
  }
}

start();