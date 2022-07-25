const express = require("express");
//adds ApolloServer to file
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
//adds typeDefs and resolvers to file
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
//removes routes
// const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

//creates server with typeDefs and resolvers, replacing the API routes
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

//replaced with the follow startApolloServer function
// app.use(routes);

// db.once("open", () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });

//replacing the routes with an Apollo server with Graphql schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
