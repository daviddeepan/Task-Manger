import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { register } from "../../actions/authAction";

const Register = ({ register, auth: { isAuthenticated } }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const { name, email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (!password) {
			console.log("Please a type password");
		} else {
			register({ name, email, password });
		}
	};

	if (isAuthenticated) {
		return <Navigate to="/" />;
	}

	function Copyright(props) {
		return (
			<Typography
				variant="body2"
				color="text.secondary"
				align="center"
				{...props}
			>
				{"Copyright © "}
				<Link color="inherit" href="#">
					evedefest
				</Link>{" "}
				{new Date().getFullYear()}
				{"."}
			</Typography>
		);
	}

	const defaultTheme = createTheme();

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign Up
					</Typography>
					<Box
						component="form"
						onSubmit={(e) => onSubmit(e)}
						noValidate
						sx={{ mt: 1 }}
					>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="name"
								label="Name"
								name="name"
								value={name}
								onChange={(e) => onChange(e)}
								autoComplete="name"
							/>
						</Grid>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							value={email}
							onChange={(e) => onChange(e)}
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							value={password}
							onChange={(e) => onChange(e)}
							label="Password"
							type="password"
							id="password"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container>
							<Grid item>
								<Link to="/login" variant="body2">
									{"Already have an account? Sign in"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
};

Register.propTypes = {
	register: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { register })(Register);
