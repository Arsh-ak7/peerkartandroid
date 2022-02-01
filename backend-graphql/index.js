const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect('mongodb://127.0.0.1/peerkartandroid', {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('mongo connected');
    return server.listen(process.env.PORT || 5000);
  })
  .then(() => console.log('Server Running'));
