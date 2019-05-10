const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const Todo = new mongoose.Schema({
	text: String,
});

Todo.methods.getViewModel = function(){
	return {
		_id: this._id,
		text: this.text,
	};
};

module.exports = mongoose.model('Todo', Todo);