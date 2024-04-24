const express = require("express");
const config = require("config");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

router.post("/", (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(404).json({ msg: "Please fill out all details" });
	}
	const newUser = new User({
		name,
		email,
		password,
	});

	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;
			newUser.save().then((user) => {
				jwt.sign(
					{ id: user.id },
					config.get("jwtSecret"),
					{ expiresIn: 3600 },
					(err, token) => {
						if (err) throw err;
						res.json({
							token,
							user: {
								id: user.id,
								name: user.name,
								email: user.email,
							},
						});
					}
				);
			});
		});
	});
});

module.exports = router;