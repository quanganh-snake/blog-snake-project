import React, { Component } from "react";
import { Link } from "react-router-dom";
//Url
import Url from "../../Services/Helpers/Url";
const url = new Url();
export class Logo extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { logo } = this.props;
		return (
			<Link to={url.home} className="logo d-flex align-items-center">
				<h1>{logo}</h1>
			</Link>
		);
	}
}

export default Logo;
