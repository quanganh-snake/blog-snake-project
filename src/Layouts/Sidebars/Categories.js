import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Categories extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { cateList } = this.props;
		return (
			<div className="aside-block">
				<h3 className="aside-title">Categories</h3>
				<ul className="aside-links list-unstyled">
					{cateList?.length > 0 &&
						cateList.map(({ id, name, created_at }, index) => {
							return (
								<li key={id}>
									<Link to="#l">
										<i className="bi bi-chevron-right" /> {name}
									</Link>
								</li>
							);
						})}
				</ul>
			</div>
		);
	}
}

export default Categories;
