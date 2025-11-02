import express from 'express';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const PORT = 8080
const app = express();


async function init(){
    app.use(express.json());

    // create Graphql Server 
    //typedefs me schema hote hai and resolvers me logic hote hai


    const gqpServer = new ApolloServer({
    typeDefs:`
    type Query {
      hello:String 
      say(name:String):String
    
    }
    `,
    resolvers:{
        Query:{
            hello:()=> "Hey there, i am a graphql server" , 
            say: (_,{name}:{name:String})=> `Hello ${name}, How are you `
        }
    }
})

// start the gql server is here

const { url } = await startStandaloneServer(gqpServer, {
  listen: { port: 8080 },
});
console.log(`🚀  Server ready at: ${url}`);

app.get("/",( req , res)=>{
    res.json({message:"Thread Backend Service is running"})
});

app.listen(PORT,()=>{
    console.log(`Thread Backend Service is running on port ${PORT}`);
});     

}

init();