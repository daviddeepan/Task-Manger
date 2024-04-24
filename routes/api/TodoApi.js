const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");

const Todo = require("../../models/todos");

// GET todos
router.get("/", auth, async (req, res) => {
	const todos = await Todo.find({ user: req.user.id });

	res.status(200).json(todos);
});

// POST todos
router.post("/", auth, async (req, res) => {
	const newTodo = new Todo({
		user: req.user.id,
		todos: req.body.todos,
	});
	newTodo.save().then((item) => res.json(item));
});

//UPDATE todos
router.put("/:id", auth, async (req, res) => {
	const todo = await Todo.findById(req.params.id);
	if (!todo) {
		res.status(400);
		throw new Error("Todo not found");
	}
	if (!req.user) {
		res.status(401);
		throw new Error("User not found");
	}
	if (todo.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}
	const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json(updatedTodo);
});
//	UPDATE COMPLETION
router.put("/complete/:id", auth, async (req, res) => {
	const todo = await Todo.findById(req.params.id);
	if (!todo) {
		res.status(400);
		throw new Error("Todo not found");
	}
	if (!req.user) {
		res.status(401);
		throw new Error("User not found");
	}
	if (todo.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}
	const updateCompletion = await Todo.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);
	res.status(200).json(updateCompletion);
});
//DELETE todos
router.delete("/:id", auth, async (req, res) => {
	const todo = await Todo.findById(req.params.id);
	try {
		if (!todo) {
			res.status(400);
			throw new Error("Todo not found");
		}
		if (!req.user) {
			res.status(401);
			throw new Error("User not found");
		}
		if (todo.user.toString() !== req.user.id) {
			res.status(401);
			throw new Error("User not authorized");
		}
		await Todo.findById(req.params.id)
			.then((item) =>
				item
					.deleteOne({ _id: req.params.id })
					.then(() => res.json({ success: true }))
			)
			.catch((err) => res.status(404).json({ success: false }));
		// res.status(200).json({ id: req.params.id });
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
