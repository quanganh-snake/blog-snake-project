import React, { Component, createRef } from "react";
import moment from "moment";
import md5 from "md5";

//component
import CommentReplyForm from "./CommentReplyForm";

export class Comments extends Component {
	constructor(props) {
		super(props);

		this.commentsRef = createRef();

		this.state = {
			commentId: null,
		};
	}

	getGravatarURL = (email) => {
		const address = String(email).trim().toLowerCase();

		const hash = md5(address);

		return `https://www.gravatar.com/avatar/${hash}`;
	};

	getTreeComments = (comments, parentId = 0) => {
		let tree = []; //lưu trữ kết quả
		if (comments.length) {
			comments.forEach((comment, index) => {
				if (comment.parentId === parentId) {
					tree[index] = comment;
					if (tree[index] !== undefined) {
						tree[index].reply = this.getTreeComments(comments, comment.id).reverse();
					}

					tree = tree.filter(() => true); //reset index array
				}
			});
		}

		return tree;
	};

	showReplyForm = (commentId) => {
		this.setState({
			commentId: commentId,
		});
	};

	componentDidUpdate = (prevProps) => {
		if (prevProps.comments.length !== this.props.comments.length && this.props.type == "comment") {
			const offsetTop = this.commentsRef.current.offsetTop;
			window.scroll(0, offsetTop);
		}
	};

	render() {
		let { comments } = this.props;
		const { commentId } = this.state;
		comments = this.getTreeComments(comments);

		return (
			<div className="comments" ref={this.commentsRef}>
				<h5 className="comment-title py-4">{comments?.length} Bình luận</h5>
				{comments?.length > 0 &&
					comments.map(({ id, name, email, message, created_at, reply }, index) => {
						return (
							<div className="comment d-flex mb-4" key={id}>
								<div className="flex-shrink-0">
									<div className="avatar avatar-sm rounded-circle">
										<img className="avatar-img" src={this.getGravatarURL(email)} alt={name} />
									</div>
								</div>
								<div className="flex-shrink-1 ms-2 ms-sm-3">
									<div className="comment-meta d-flex">
										<h6 className="me-2">{name}</h6>
										<span className="text-muted">{moment(created_at).format("DD/MM/YYYY hh:mm:ss")}</span>
									</div>
									<div className="comment-body">{message}</div>
									<p className="my-2">
										<a
											href="#"
											style={{ color: "red", fontStyle: "italic" }}
											onClick={(e) => {
												e.preventDefault();
												this.showReplyForm(id);
											}}
										>
											Trả lời
										</a>
									</p>
									{id === commentId && <CommentReplyForm commentId={id} {...this.props} />}
									{reply.length > 0 && (
										<div className="comment-replies bg-light p-3 mt-3 rounded">
											<h6 className="comment-replies-title mb-4 text-muted text-uppercase">{reply.length} Trả lời</h6>
											{reply.map(({ id, name, email, message, created_at }, index) => {
												return (
													<div className="reply d-flex mb-4" key={id}>
														<div className="flex-shrink-0">
															<div className="avatar avatar-sm rounded-circle">
																<img className="avatar-img" src={this.getGravatarURL(email)} alt={name} />
															</div>
														</div>
														<div className="flex-grow-1 ms-2 ms-sm-3">
															<div className="reply-meta d-flex align-items-baseline">
																<h6 className="mb-0 me-2">{name}</h6>
																<span className="text-muted">{moment(created_at).format("DD/MM/YYYY hh:mm:ss")}</span>
															</div>
															<div className="reply-body">{message}</div>
														</div>
													</div>
												);
											})}
										</div>
									)}
								</div>
							</div>
						);
					})}
			</div>
		);
	}
}

export default Comments;
