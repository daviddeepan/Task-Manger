const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");

const app = express();
const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = config.get("mongoURI");

mongoose
	.connect(db)
	.then(() => console.log("Mongo Online ....."))
	.catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.use("/api/auth", require("./routes/api/UserApi")); //loggin users
app.use("/api/auth/users", require("./routes/api/UserAuth")); //authenticating users
app.use("/api/todos", require("./routes/api/TodoApi")); //todo

app.listen(port, () => console.log(`Port Started and listening on ${port}`));
