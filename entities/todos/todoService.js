const todoRepository = require('./todoRepository');

class TodoService {

	getAllTodos(){
		return todoRepository.findAll();
	}

	getTodoById(id){
		return todoRepository.findById(id);
	}

	editTodo(id, todo){
		return todoRepository.update({_id: id}, todo);
	}

	deleteTodo(id){
		return todoRepository.delete({_id: id});
	}

	addTodo(todo){
		return todoRepository.add(todo);
	}
}

module.exports = new TodoService();