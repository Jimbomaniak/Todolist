const todos = require('../entities/todos/todoAPIRoutes');

const initializeRoutes = (app) => {
	app.use('/api/todo', todos);
}

module.exports = initializeRoutes;