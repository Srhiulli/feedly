import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './src/graphql/schema/index.js';
import prisma from './src/lib/prismaClient.js';
import { resolvers } from '../backend/src/graphql/resolvers/resolvers.js';



const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: () => ({ prisma }),
  cors: {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], 
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Apollo-Require-Preflight'],
  },
});

console.log(`🚀 Server ready at ${url}`);