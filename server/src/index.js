require("dotenv").config({ debug: true });
const mongoose = require("mongoose");
const myServer = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const Task = require("./models/task");
const Project = require("./models/project");
const Tasks = require("./dataSources/tasks");
const Projects = require("./dataSources/projects");
const main = async () =>
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
main()
  .then(console.log("🎉 connected to database successfully"))
  .catch((error) => console.error(error));
const dataSources = () => ({
  tasks: new Tasks(Task),
  projects: new Projects(Project),
});
const server = new myServer.ApolloServer({ typeDefs, resolvers, dataSources });
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
