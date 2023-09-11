import React, { Component } from "react";
import { Link } from "react-router-dom";
//CSS
import "./Headers.scss";
//Layout
import { Logo } from "./Logo";
import Navigation from "./Navigation";
import Social from "./Social";

//Url - HttpClient
import Url from "../../Services/Helpers/Url";
import HttpClient from "../../Services/Api/HttpClient";
const url = new Url();
const client = new HttpClient();

export class Headers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			headers: {},
		};
	}

	getOptions = async () => {
		const res = await client.get(client.options);
		if (res.response.ok) {
			const data = res.data;
			this.setState({ headers: data.headers });
		}
	};

	componentDidMount = () => {
		this.getOptions();
	};

	render() {
		const { logo, menus, socials } = this.state.headers;
		return (
			<>
				<header id="header" className="header d-flex align-items-center fixed-top">
					<div className="container-fluid container-xl d-flex align-items-center justify-content-between">
						<Logo logo={logo} />
						<Navigation menus={menus} />
						<Social socials={socials} />
					</div>
				</header>
			</>
		);
	}
}

export default Headers;
