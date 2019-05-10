const todo = require('../entities/todo/todoViewRoutes');

const initializeRoutes = (app) => {
	app.use('/', todo);
	app.use('/user', todo);
}

module.exports = initializeRoutes;