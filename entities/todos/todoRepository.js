const Repository = require('../../common/Repository');
const TodoModel = require('./todoSchema');

class TodoRepository extends Repository{

	constructor(){
		super();
		this.model = TodoModel;
	}

}

module.exports = new TodoRepository();