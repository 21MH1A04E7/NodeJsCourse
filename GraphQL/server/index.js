const express = require("express");
const cors = require("cors");
const bodyParser=require('body-parser')
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs:`  
        type Todo{
            id:ID!
            title:String!
            completed:Boolean
        }
        type Query{
            getTodos:[Todo]
        }
    `,
    resolvers: {},
  });

  //middleware
  app.use(cors());
  app.use(bodyParser.json());

  await server.start()//start the graphql server

  app.use('/graphql',expressMiddleware(server));//it will handle the graph ql server

  const port=8888
  app.listen(port,()=>{
    console.log(`Server running on port no ${port}`)
  })
}

startServer()