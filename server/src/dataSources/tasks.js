const data = require('apollo-datasource-mongodb')

class Tasks extends data.MongoDataSource {

  async getTasks(id) {
    return await this.model.find({projectID: id});
  }

  async getTask(id) {
    return await this.findOneById(id);
  }

  async createTask({ summary, description, priority , status , projectID }) {
    return await this.model.create({ summary, description, priority , status , projectID});
  }

  async editTask(args) {
    await this.model.updateOne({_id: args.id}, {$set: args})
    return await this.findOneById(args.id)
  }

  async deleteTask(id){
    const task = await this.findOneById(id);
    await this.model.deleteOne({_id: id});
    return task
  }
}
module.exports = Tasks;
