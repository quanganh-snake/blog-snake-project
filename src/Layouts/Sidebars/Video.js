import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Video extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { video } = this.props;
		return (
			<div className="aside-block">
				<h3 className="aside-title">Video</h3>
				<div className="video-post">
					<Link to={video?.link} className="glightbox link-video">
						<span className="bi-play-fill" />
						<img src={video?.image} alt="" className="img-fluid" />
					</Link>
				</div>
			</div>
		);
	}
}

export default Video;
