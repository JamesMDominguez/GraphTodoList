const {gql} = require('apollo-server');

const typeDefs = gql`
  type Project {
    id: ID!
    name: String!
    user: String!
    tasks: [Task]
  }

  type Task {
    id: ID!
    summary: String!
    description: String!
    priority: String!
    status: String!
    project: Project!
    projectID: String!
  }

  type Query {
    getProjects: [Project!]!,
    getProject(id: ID!): Project,
    getTasks(id: ID!): [Task!]!,
    getTask(id: ID!): Task!
  }

  type Mutation {
    createProject(name: String!, user: String!): Project!
    createTask(projectID: String! , summary: String! , description: String! , priority: String! , status: String!): Task!
    editTask(projectID: String! , summary: String! , description: String! , priority: String! , status: String! , id: ID!): Task!
    editProject(name: String!, user: String!, id: ID!): Project!
    deleteTask(id: ID!): Task
    deleteProject( id: ID!): Project
  }
`;

module.exports = typeDefs;


