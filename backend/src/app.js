const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config({ path: require("path").resolve(__dirname, "../.env") });
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);


const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolver");
const { connectDB } = require("./config/db");
   
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key";
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

const startServer = async () => {
  const app = express();

  // Connect MySQL
  await connectDB();

  // Middleware
  app.use(
    cors({
      origin: allowedOrigins,
    })
  );

  app.use(express.json());

  // Apollo Server with context
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        let user = null;

        const token = req.headers.authorization?.replace("Bearer ", "");
        if (token) {
          try {
            user = jwt.verify(token, JWT_SECRET);
          } catch (error) {
            // Invalid token - continue without user
          }
        }

        return { user };
      }, 
    })
  );

  // Test route
  app.get("/", (req, res) => {
    res.json({
      message: "Backend server is running",
    });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(
      `GraphQL: http://localhost:${PORT}/graphql`
    );
  });
};

startServer();