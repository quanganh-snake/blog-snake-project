import React, { Component } from "react";

//context
import { withContext } from "./../../Services/Context/withContext";
import withRouter from "./../../Services/Routes/withRouter";

//component: Sidebar
import Sidebars from "../../Layouts/Sidebars/Sidebars";
//postItem
import { PostItem } from "./../../Components/PostItem/PostItem";
import { Error404 } from "./../../Errors/Error404";

export class Search extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		let { keyword } = this.props.store.data;
		const { getPosts } = this.props.store.dispatch;
		const [searchParams] = this.props.search;
		if (searchParams.get("keyword")) {
			keyword = searchParams.get("keyword");
		}
		getPosts({
			q: keyword,
		});
	};

	componentDidUpdate = (prevProps, preState) => {
		const { keyword } = this.props.store.data;
		const { getPosts } = this.props.store.dispatch;
		if (prevProps.store.data.keyword !== keyword) {
			getPosts({
				q: keyword,
			});
		}
	};

	render() {
		const { posts, keyword } = this.props.store.data;
		const [searchParams] = this.props.search;
		return (
			<section>
				<div className="container">
					<div className="row">
						<div className="col-md-9" data-aos="fade-up">
							{!searchParams.has("keyword") ? (
								<Error404 />
							) : (
								<>
									<h3 className="category-title">Search: {keyword}</h3>{" "}
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

export default withRouter(withContext(Search));
