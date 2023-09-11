import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
export class Navigation extends Component {
	constructor(props) {
		super(props);
	}

	getMenus = (menus) => {
		return (
			<ul>
				{menus?.length > 0 &&
					menus.map(({ link, title, children }, index) => {
						let menuItem = (
							<li key={index}>
								<NavLink to={link}>{title}</NavLink>
							</li>
						);

						if (children) {
							menuItem = (
								<li className="dropdown" key={index}>
									<a href={link}>
										<span>{title}</span>
										<i className="bi bi-chevron-down dropdown-indicator" />
									</a>
									{this.getMenus(children)}
								</li>
							);
						}
						return menuItem;
					})}
			</ul>
		);
	};

	render() {
		const { menus } = this.props;
		return (
			<>
				<nav id="navbar" className="navbar">
					{this.getMenus(menus)}
				</nav>
			</>
		);
	}
}

export default Navigation;
