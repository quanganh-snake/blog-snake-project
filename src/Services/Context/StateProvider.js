import React, { Component } from "react";

import HttpClient from "./../Api/HttpClient";

const client = new HttpClient();

export const StateContext = React.createContext();

export class StateProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			keyword: "",
		};

		this.dispatch = {
			getPosts: this.getPosts,
			updateKeyword: this.updateKeyword,
		};
	}

	getPosts = async (filters = {}) => {
		let urlStr = "?_expand=category&_expand=user";

		if (Object.keys(filters).length) {
			urlStr = urlStr + "&" + new URLSearchParams(filters).toString();
		}

		const res = await client.get(client.posts + urlStr);
		if (res.response.ok) {
			this.setState({
				posts: res.data,
			});
		}
	};

	updateKeyword = (keyword) => {
		this.setState({
			keyword: keyword,
		});
	};

	render() {
		const { children } = this.props;
		return (
			<StateContext.Provider
				value={{
					data: this.state,
					dispatch: this.dispatch,
				}}
			>
				{children}
			</StateContext.Provider>
		);
	}
}

export default StateProvider;
