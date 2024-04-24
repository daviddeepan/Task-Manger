const mongoose = require("mongoose");
const schema = mongoose.Schema;

const todos = new schema({
	user: {
		type: schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	todos: {
		type: String,
		required: true,
	},
	isComplete: {
		type: Boolean,
		default: false,
	},
});

module.exports = Todo = mongoose.model("todo", todos);
