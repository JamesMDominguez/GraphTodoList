const resolvers = {

  Query: {
    getProjects: async (_, __, { dataSources }) => {
      return dataSources.projects.getProjects();
    },
    getProject: async (_, { id }, { dataSources }) => {
      return dataSources.projects.getProject(id);
    },
    getTask: async (_, { id }, { dataSources }) => {
      return dataSources.tasks.getTask(id);
    },
    getTasks: async (_, { id }, { dataSources }) => {
      return dataSources.tasks.getTasks(id);
    },
  },

  Mutation: {
    createTask: async (_, args, { dataSources }) => {
      return dataSources.tasks.createTask(args)
    },
    createProject: async (_, { name, user }, { dataSources}) => {
      return dataSources.projects.createProject(name, user)
    },
    editTask: async (_, args, { dataSources }) => {
      return dataSources.tasks.editTask(args)
    },
    editProject: async (_,args,{dataSources}) => {
      return dataSources.projects.editProject(args)
    },
    deleteProject: async (_,args,{dataSources}) => {
      return dataSources.projects.deleteProject(args.id)
    },
    deleteTask: async (_,{id},{dataSources}) => {
      return dataSources.tasks.deleteTask(id)
    }
  },
  Project: {
    tasks: (project, _, { dataSources: {tasks} }) =>  tasks.getTasks(project._id)
  },
  Task:{
    project: (task, _, { dataSources: {projects} }) =>  projects.getProject(task.projectID)
  }
}

module.exports = resolvers;