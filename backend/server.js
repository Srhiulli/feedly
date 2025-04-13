import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './src/graphql/schema/index.js';
import prisma from './src/lib/prismaClient.js';
import { authResolvers } from './src/graphql/resolvers/authResolvers.js';



const server = new ApolloServer({
  typeDefs,
  resolvers: [authResolvers], 

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