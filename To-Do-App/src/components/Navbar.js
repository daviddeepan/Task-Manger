import React, { Fragment } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/authAction";

const Navbar = ({ auth: { isAuthenticated, isLoading }, logout, profile }) => {
	const navRef = useRef();
	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	const authLinks = (
		<nav className="navbar" ref={navRef}>
			<ul>
				<li>
					<Link to="/">
						<i className="fas fa-user" />{" "}
						<span className="hide-sm">Home</span>
					</Link>
				</li>
				<li>
					<a onClick={logout} href="#!">
						<i className="fas fa-sign-out-alt" />{" "}
						<span className="hide-sm">Logout</span>
					</a>
				</li>
			</ul>
		</nav>
	);

	const guestLinks = (
		<nav className="navbar" ref={navRef}>
			<ul>
				<li>
					<Link to="/register">Register</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
			</ul>
		</nav>
	);

	return (
		<header>
			<h1>
				<Link to="/">Todo</Link>
			</h1>

			{!isLoading && (
				<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
			)}
		</header>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
