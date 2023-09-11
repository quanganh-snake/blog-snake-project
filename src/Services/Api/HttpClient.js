import config from "../../Configs/Config.json";
import endpoints from "../../Configs/EndPoint.json";

const { SERVER_API } = config;

export default class HttpClient {
	constructor() {
		if (Object.keys(endpoints).length) {
			Object.keys(endpoints).forEach((endpoint) => {
				this[endpoint] = endpoints[endpoint];
			});
		}
	}

	//Method callApi
	callApi = async (url, method = "GET", body = null) => {
		url = SERVER_API + url;

		const options = {
			method: method,
			headers: {
				"Content-Type": "application/json",
			},
		};

		if (body !== null) {
			options.body = JSON.stringify(body);
		}
		const response = await fetch(url, options);
		const data = await response.json();

		return {
			response: response,
			data: data,
		};
	};

	//Method HTTP
	//GET
	get = (url, params = {}) => {
		if (Object.keys(params).length) {
			let queryString = new URLSearchParams(params);
			return this.callApi(url + "?" + queryString);
		}

		return this.callApi(url);
	};

	//POST
	post = (url, body) => {
		return this.callApi(url, "POST", body);
	};

	//PUT
	put = (url, id, body) => {
		return this.callApi(url + "/" + id, "PUT", body);
	};

	//PATCH
	patch = (url, id, body) => {
		return this.callApi(url + "/" + id, "PATCH", body);
	};

	//DELETE
	delete = (url, id) => {
		return this.callApi(url + "/" + id, "DELETE");
	};
}
