import React, { Component } from "react";

//import HOC
import withRouter from "../../Services/Routes/withRouter";
import { withContext } from "../../Services/Context/withContext";
import HttpClient from "../../Services/Api/HttpClient";
import moment from "moment/moment";
//components
import Sidebars from "../../Layouts/Sidebars/Sidebars";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { Error404 } from "./../../Errors/Error404";

const client = new HttpClient();
export class PostDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			post: {},
			status: "pending",
			commentType: "comment",
			comments: [],
		};
	}

	getPost = async (id) => {
		const res = await client.get(client.posts + "/" + id, {
			_expand: "category",
		});
		if (res.response.ok) {
			this.setState({ post: res.data, status: "success" });
		} else {
			this.setState({
				status: "success",
			});
		}
	};

	getComments = async (postId) => {
		const res = await client.get(client.comments, {
			_order: "desc",
			_sort: "created_at",
			postId: postId,
		});
		if (res.response.ok) {
			this.setState({
				comments: res.data,
			});
		}
	};

	postComment = async (comment, type = "comment") => {
		const { id: postId } = this.props.params;
		comment.postId = postId;
		const res = await client.post(client.comments, comment);
		if (res.response.ok) {
			if (type !== "comment") {
				this.setState({
					commentType: type,
				});
			}
			this.getComments(postId);
		}
	};

	componentDidMount = () => {
		const { id } = this.props.params;
		this.getPost(id);
		this.getComments(id);
	};
	render() {
		const { post, status, comments } = this.state;
		return (
			<section className="single-post-content">
				<div className="container">
					<div className="row">
						<div className="col-md-9 post-contentx" data-aos="fade-up">
							{/* ======= Single Post Content ======= */}

							{status === "success" && Object.keys(post).length > 0 ? (
								<>
									<div className="single-post">
										<div className="post-meta">
											<span className="date">{post?.category?.name}</span> <span className="mx-1">•</span> <span>{moment(post?.created_at).format("DD/MM/YYYY hh:mm:ss")}</span>
										</div>
										<h1 className="mb-5">{post?.title}</h1>
										<div dangerouslySetInnerHTML={{ __html: post?.content }} />
									</div>
									{/* End Single Post Content */}
									{/* ======= Comments ======= */}
									<Comments comments={comments} onRelpyComment={this.postComment} type={this.state.commentType} />
									{/* End Comments */}
									<CommentForm onPostComment={this.postComment} />
								</>
							) : (
								<Error404 />
							)}
						</div>
						<Sidebars />
					</div>
				</div>
			</section>
		);
	}
}

export default withContext(withRouter(PostDetail));
