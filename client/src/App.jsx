import { useState } from "react";

function App() {
	const [contact, setContact] = useState({});

	const inputChange = (e) => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};

	const formSubmit = async (e) => {
		e.preventDefault();
		if (contact.save_type === "db") {
			const response = await fetch("http://localhost:5000/contacts", {
				method: "POST",
				body: JSON.stringify(contact),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			console.log(data);
		} else {
			let storedContacts = JSON.parse(localStorage.getItem("contacts"));
			if (!storedContacts) {
				storedContacts = [];
			}
			storedContacts.push(contact);
			localStorage.setItem("contacts", JSON.stringify(storedContacts));
			console.log(storedContacts);
		}
		e.target.reset();
	};

	return (
		<div className="container">
			<div className="row min-vh-100 justify-content-center align-items-center">
				<div className="col-lg-6">
					<div className="card shadow">
						<div className="card-header">
							<h1 className="fw-bold text-secondary">Contact Us</h1>
						</div>
						<div className="card-body p-5">
							<form onSubmit={formSubmit}>
								<div className="mb-3">
									<label>Name</label>
									<input
										type="text"
										name="name"
										className="form-control"
										required
										onChange={(e) => inputChange(e)}
									/>
								</div>
								<div className="mb-3">
									<label>Email</label>
									<input
										type="email"
										name="email"
										className="form-control"
										required
										onChange={(e) => inputChange(e)}
									/>
								</div>
								<div className="mb-3">
									<label>Phone</label>
									<input
										type="tel"
										name="phone"
										className="form-control"
										required
										onChange={(e) => inputChange(e)}
									/>
								</div>
								<div className="mb-3">
									<label className="form-label">Message</label>
									<textarea
										className="form-control"
										name="message"
										rows="4"
										required
										onChange={(e) => inputChange(e)}
									/>
								</div>
								<div className="mb-3">
									<label>Save in</label>
									<select
										name="save_type"
										id="save_type"
										className="form-select"
										required
										onChange={(e) => inputChange(e)}
									>
										<option value="">-Select-</option>
										<option value="db">Database</option>
										<option value="local">Local Storage</option>
									</select>
								</div>
								<div className="d-grid">
									<button type="submit" className="btn btn-primary">
										Save
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
