import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './src/queries.js';
import { resolvers } from './src/lib/resolvers.js';
import prisma from './src/lib/prismaClient.js';



const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: () => ({ prisma }),
  cors: {
    origin: ['http://localhost:5173'], 
    credentials: true,
  },
});

console.log(`🚀 Server ready at ${url}`);