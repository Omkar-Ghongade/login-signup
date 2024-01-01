import styles from "./styles.module.css";
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Main = () => {

	const [isInputBoxVisible, setIsInputBoxVisible] = useState(false);
	const [data, setData] = useState({
		fileName: "",
	});

	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const toggleInputBox = () => {
		setIsInputBoxVisible(!isInputBoxVisible);
	};

	

	const handleFilename = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/docs";
			const { data: res } = await axios.post(url, data);
			navigate("/");
			console.log(res.message);
		} catch (error) {
			console.log(error);
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Demo-Docs</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<button onClick={toggleInputBox}>Create a New Document</button>

			{isInputBoxVisible && (
				<div>
				<label htmlFor="inputBox">Input Box:</label>
				<input
							type="text"
							placeholder="Document Name"
							name="fileName"
							onChange={handleChange}
							value={data.fileName}
							required
							className={styles.input}
						/>
				<button onClick={handleFilename}>
					Submit
				</button>
				</div>
			)}

		</div>
	);
};

export default Main;