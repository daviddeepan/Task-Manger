const express = require("express");
const config = require("config");
const { auth } = require("../../middleware/auth");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

router.post("/", (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(404).json({ msg: "Please fill out all details" });
	}

	User.findOne({ email }).then((user) => {
		if (!user) return res.status(404).json({ msg: "user not found" });
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch)
				return res
					.status(404)
					.json({ msg: "Invalid password try again !" });
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

// get current user logged in
router.get("/user", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		if (!user) throw Error("User does not exist");
		res.json(user);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

module.exports = router;
