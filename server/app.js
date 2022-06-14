const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to mysql database
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "P@ssw0rd123",
	database: "pratimadb",
});

connection.connect((err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Connected to MySQL");
	}
});

app.post("/contacts", async (req, res) => {
	let sql = `INSERT INTO contacts (name, email, phone, message) VALUES ("${req.body.name}", "${req.body.email}", "${req.body.phone}", "${req.body.message}")`;

	connection.query(sql, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.status(201).json("success");
		}
	});
});
app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`);
});
