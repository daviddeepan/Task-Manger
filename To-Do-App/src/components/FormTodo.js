import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSquare, faCheckSquare } from "@fortawesome/free-solid-svg-icons";


import axios from "axios";

export default function FormTodo() {
	const [todo, setFormData] = useState("");
	const [newTodo, setNewTodo] = useState("");
	const [isEditing, setEditing] = useState(false);
	const [todos, setTodos] = useState([]);
	const token = useSelector((state) => state.auth.token);

	useEffect(() => {
		console.log(isEditing);
		fetchTodos();
	}, [token]);

    // Fetch Todos..
	const fetchTodos = async () => {
		try {
			const res = await axios.get("http://localhost:5000/api/todos", {
				headers: {
					"x-auth-token": token,
				},
			});
			console.log(res.data);
			await setTodos(res.data);
		} catch (error) {
			console.error("Error fetching todos:", error);
		}
	};

    //Add Todos....
	const addTodo = async (todo) => {
		setEditing(false);
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		if (token) {
			config.headers["x-auth-token"] = token;
		}

		try {
			const res = await axios.post(
				"http://localhost:5000/api/todos",
				{ todos: todo },
				config
			);
			console.log(res);
			fetchTodos();
		} catch (err) {
			console.log(err);
		}
	};

    // Delete Todos...
	const deleteTodo = async (id) => {
		console.log(id);
		try {
			await axios.delete(`http://localhost:5000/api/todos/${id}`, {
				headers: {
					"x-auth-token": token,
				},
			});
			fetchTodos();
		} catch (err) {
			console.log(err);
		}
	};

    //Update Todos...
	const putTodo = async (id, todo) => {
		console.log(id, todo);
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		if (token) {
			config.headers["x-auth-token"] = token;
		}

		try {
			const res = await axios.put(
				`http://localhost:5000/api/todos/${id}`,
				{ todos: todo },
				config
			);
			console.log(res);
			fetchTodos();
		} catch (err) {
			console.log(err);
		}
	};

    //Mark as complete...
	const putCompletetodo = async (id, todo) => {
		console.log(id, todo);
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		if (token) {
			config.headers["x-auth-token"] = token;
		}

		try {
			const res = await axios.put(
				`http://localhost:5000/api/todos/complete/${id}`,
				{ isComplete: true },
				config
			);
			console.log(res);
			fetchTodos();
		} catch (err) {
			console.log(err);
		}
	};


	const editTodo = (id) => {
		setEditing(true);
		const selectedTodo = todos.find((todo) => todo._id === id);
		console.log(selectedTodo);
		setNewTodo(selectedTodo);
		console.log(newTodo);
	};
	const handleEditSubmit = async (e) => {
		e.preventDefault();
		console.log(newTodo._id, newTodo);
		await putTodo(newTodo._id, newTodo.todos);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await addTodo(todo);
	};

	const toggleComplete = async (id) => {
		const selectedTodo = todos.find((todo) => todo._id === id);
		putCompletetodo(selectedTodo._id, selectedTodo.todos);
	};

	const generateGistContent = () => {
		const completeCount = todos.filter((todo) => todo.isComplete).length;
		const totalCount = todos.length;
		const summary = `**Summary:** ${completeCount} / ${totalCount} completed.\n\n`;
		const pendingTodos = todos.filter((todo) => !todo.isComplete);
		const completedTodos = todos.filter((todo) => todo.isComplete);
		const pendingSection =
			pendingTodos.length > 0
				? `**Section 1: Pending todos.**\n${pendingTodos
						.map(
							(todo) =>
								`- [] ${todo.todos}`
						)
						.join("\n")}\n\n`
				: "";
		const completedSection =
			completedTodos.length > 0
				? `**Section 2: Completed todos.**\n${completedTodos
						.map(
							(todo) =>
								`- [x] ${todo.todos}`
						)
						.join("\n")}\n\n`
				: "";

		const gistContent = `${summary}${pendingSection}${completedSection}`;
		return gistContent;
	};
	const downloadGist = () => {
		const gistContent = generateGistContent();
		const blob = new Blob([gistContent], {
			type: "text/markdown;charset=utf-8",
		}); 
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "todo_gist.md"; 
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className="TodoForm">
				<input
					type="text"
					value={todo}
					onChange={(e) => setFormData(e.target.value)}
					className="todo-input"
					placeholder="What is the task today?"
				/>
				<button type="submit" className="todo-btn">
					Add Task
				</button>
			</form>
			<h2>Your Todos</h2>
			{todos.length > 0 ? (
				<ul>
					{todos.map((todo) => (
						<div className="Todo">
							<li
								className={`${
									todo.isComplete
										? "completed"
										: "incompleted"
								}`}
								key={todo._id}
								onClick={() => toggleComplete(todo._id)}
							>
								{todo.todos}
							</li>
							<FontAwesomeIcon
								className="edit-icon"
								icon={faPenToSquare}
								onClick={() => editTodo(todo._id)}
							/>
							<FontAwesomeIcon
								className="delete-icon"
								icon={faTrash}
								onClick={() => deleteTodo(todo._id)}
							/>
						</div>
					))}
				</ul>
			) : (
				<p>No todos found.</p>
			)}
			{isEditing && (
				<form onSubmit={handleEditSubmit} className="TodoForm">
					<input
						type="text"
						value={newTodo.todos}
						onChange={(e) =>
							setNewTodo({ ...newTodo, todos: e.target.value })
						}
						className="todo-input"
						placeholder="Update task"
					/>
					<button type="submit" className="todo-btn">
						Update Task
					</button>
				</form>
			)}
			<button className="todo-btn" onClick={downloadGist}>
				Download Gist
			</button>
		</div>
	);
}
