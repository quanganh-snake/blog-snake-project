import React, { Component } from "react";
import { Link } from "react-router-dom";
import Url from "../../Services/Helpers/Url";

import moment from "moment/moment";

const url = new Url();

export class FooterTop extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categories: [],
			posts: [],
		};
	}

	render() {
		const { about, menus, categories, posts, cateList, postList } = this.props;
		return (
			<div className="footer-content">
				<div className="container">
					<div className="row g-5">
						<div className="col-lg-4">
							<h3 className="footer-heading">{about?.title}</h3>
							<p>{about?.content}</p>
							<p>
								<Link to={about?.link} className="footer-link-more">
									{about?.text_link}
								</Link>
							</p>
						</div>
						<div className="col-6 col-lg-2">
							<h3 className="footer-heading">{menus?.title}</h3>
							<ul className="footer-links list-unstyled">
								{menus?.lists?.length &&
									menus?.lists.map(({ link, title }, index) => {
										return (
											<li key={index}>
												<Link to={link}>
													<i className="bi bi-chevron-right" /> {title}
												</Link>
											</li>
										);
									})}
							</ul>
						</div>
						<div className="col-6 col-lg-2">
							<h3 className="footer-heading">{categories?.title}</h3>
							<ul className="footer-links list-unstyled">
								{cateList?.length &&
									cateList?.map(({ id, name }, index) => {
										return (
											<li key={id}>
												<Link to={url.getCategory(id, name)}>
													<i className="bi bi-chevron-right" /> {name}
												</Link>
											</li>
										);
									})}
							</ul>
						</div>
						<div className="col-lg-4">
							<h3 className="footer-heading">{posts?.title}</h3>
							<ul className="footer-links footer-blog-entry list-unstyled">
								{postList?.length &&
									postList.map(({ id, title, thumbnail, created_at, category }) => {
										return (
											<li key={id}>
												<Link to={url.getPost(id, title)} className="d-flex align-items-center">
													<img src={thumbnail} alt={title} className="img-fluid me-3" />
													<div>
														<div className="post-meta d-block">
															<span className="date">{category.name}</span> <span className="mx-1">•</span>{" "}
															<span>{moment(created_at).format("DD/MM/YYYY hh:mm:ss")}</span>
														</div>
														<span>{title}</span>
													</div>
												</Link>
											</li>
										);
									})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FooterTop;
