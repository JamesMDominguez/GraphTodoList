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
    deleted: Boolean!
  }

  type Query {
    getProjects: [Project!]!,
    getProject(id: ID!): Project,
    
    getTasks(id: ID!): [Task!]!,
    getTask(id: ID!): Task!
  }

  type Mutation {
    createTask(projectID: String! , summary: String! , description: String! , priority: String! , status: String!, deleted: Boolean!): Task!
    editTask(projectID: String! , summary: String! , description: String! , priority: String! , status: String! , id: ID!, deleted: Boolean!): Task!
    deleteTask(id: ID!): Task

    createProject(name: String!, user: String!): Project!
    editProject(name: String!, user: String!, id: ID!): Project!
    deleteProject(id: ID!): Project
  }
`;

module.exports = typeDefs;


