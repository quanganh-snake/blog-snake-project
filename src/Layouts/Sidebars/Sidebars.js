import React, { Component } from "react";

import Posts from "./Posts/Posts";
import Video from "./Video";
import Categories from "./Categories";
import HttpClient from "../../Services/Api/HttpClient";
import Url from "../../Services/Helpers/Url";

const client = new HttpClient();
const url = new Url();

export class Sidebars extends Component {
	constructor(props) {
		super(props);
		this.state = {
			limit: 5,
			video: {},
			categories: [],
		};
	}

	getCategories = async (categoryIds) => {
		if (categoryIds !== undefined) {
			const category = "id=" + categoryIds.join("&id=");
			const res = await client.get(client.categories + "?" + category);
			if (res.response.ok) {
				this.setState({
					categories: res.data,
				});
			}
		}
	};

	getOptions = async () => {
		const res = await client.get(client.options);
		if (res.response.ok) {
			const data = res.data;
			this.getCategories(data.sidebar.categories);
			this.setState({
				limit: data.sidebar.posts.limit,
				video: data.sidebar.videos,
			});
		}
	};

	componentDidMount = () => {
		this.getOptions();
	};

	render() {
		const { limit, video, categories } = this.state;
		return (
			<div className="col-md-3">
				<Posts limit={limit} />
				<Video video={video} />
				<Categories cateList={categories} />
			</div>
		);
	}
}

export default Sidebars;
