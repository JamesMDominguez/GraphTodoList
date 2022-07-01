const data = require('apollo-datasource-mongodb')

class Tasks extends data.MongoDataSource {

  async getTasks(id) {
    return await this.model.find({projectID: id, deleted: false});
  }

  async getTask(id) {
    return await this.findOneById(id);
  }

  async createTask({ summary, description, priority , status , projectID, deleted }) {
    return await this.model.create({ summary, description, priority , status , projectID, deleted});
  }

  async editTask(args) {
    await this.model.updateOne({_id: args.id}, {$set: args})
    return await this.findOneById(args.id)
  }

  async deleteTask(id){
    await this.model.updateOne({_id: id}, {$set: {deleted: true}})
    return await this.findOneById(id)
  }
}
module.exports = Tasks;
