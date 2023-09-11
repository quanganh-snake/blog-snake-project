import React, { Component } from "react";
import moment from "moment/moment";
//context - router
import { withContext } from "./../../Services/Context/withContext";
import withRouter from "./../../Services/Routes/withRouter";
import HttpClient from "../../Services/Api/HttpClient";
//component: Sidebar
import Sidebars from "../../Layouts/Sidebars/Sidebars";
//postItem
import { PostItem } from "./../../Components/PostItem/PostItem";
import { Error404 } from "./../../Errors/Error404";
const client = new HttpClient();

export class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: "",
			status: "pending",
		};
	}

	getCategory = async (categoryId) => {
		const res = await client.get(client.categories + "/" + categoryId);
		if (res.response.ok) {
			this.setState({
				category: res.data,
			});
		} else {
			this.setState({
				status: "error",
			});
		}
	};

	componentDidMount = () => {
		const { id } = this.props.params;
		const { getPosts } = this.props.store.dispatch;
		this.getCategory(id);
		getPosts({
			categoryId: id,
		});
	};

	render() {
		const { posts } = this.props.store.data;

		const { category, status } = this.state;

		return (
			<section>
				<div className="container">
					<div className="row">
						<div className="col-md-9" data-aos="fade-up">
							{status === "error" && category == "" ? (
								<Error404 />
							) : (
								<>
									<h3 className="category-title">{category?.name}</h3>{" "}
									{posts?.length ? (
										posts.map((post, index) => {
											return <PostItem key={post.id} {...post} />;
										})
									) : (
										<b>Không có dữ liệu</b>
									)}
									<div className="text-start py-4">
										<div className="custom-pagination">
											<a href="#" className="prev">
												Prevous
											</a>
											<a href="#" className="active">
												1
											</a>
											<a href="#">2</a>
											<a href="#">3</a>
											<a href="#">4</a>
											<a href="#">5</a>
											<a href="#" className="next">
												Next
											</a>
										</div>
									</div>
								</>
							)}
						</div>

						<Sidebars />
					</div>
				</div>
			</section>
		);
	}
}

export default withRouter(withContext(Posts));
