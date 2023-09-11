import String from "./String";

const string = new String();

export default class Url {
	constructor() {
		this.home = "/";
		this.about = "/gioi-thieu";
		this.post = "/bai-viet/:id/:slug.html";
		this.category = "/chuyen-muc/:id/:slug.html";

		this.search = "/tim-kiem";
	}

	getPost = (id, title) => {
		let url = this.post;

		const slug = string.ChangeToSlug(title);
		url = url.replace(":id", id).replace(":slug", slug);

		return url;
	};

	getCategory = (id, name) => {
		let url = this.category;
		const slug = string.ChangeToSlug(name);
		url = url.replace(":id", id).replace(":slug", slug);
		return url;
	};
}
