const data = require('apollo-datasource-mongodb')

class Projects extends data.MongoDataSource {

  async getProjects() {
    return await this.model.find();
  }

  async getProject(id) {
    return await this.findOneById(id);
  }

  async createProject( name, user ) {
    return await this.model.create({ name, user });
  }

  async editProject(args){
    await this.model.updateOne({_id: args.id}, {$set: args})
    return this.findOneById(args.id)
  }

  async deleteProject(id){
    const project = await this.findOneById(id)
    await this.model.deleteOne({_id: id})
    return project
  }
}
module.exports = Projects;
