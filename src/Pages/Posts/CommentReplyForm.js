import React, { Component } from "react";
import moment from "moment";
export class CommentReplyForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			email: "",
			message: "",
		};
	}

    handleChangValue = (e) => {
        const data = {...this.state}
        data[e.target.name] = e.target.value;
        this.setState(data);
    }

	handleSubmitReply = (e) => {
		e.preventDefault();
		const { commentId, onRelpyComment } = this.props;

		const { name, email, message } = this.state;

		const comment = {
			name: name,
			email: email,
			message: message,
			parentId: parseInt(commentId),
			status: 1,
			created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
			updated_at: moment().format("YYYY-MM-DD hh:mm:ss"),
		};

		onRelpyComment(comment, "reply");

		this.setState({ message: "" });
	};
	render() {
        const {name, email, message} = this.state;
		return (
			<form onSubmit={this.handleSubmitReply}>
				<div className="row">
					<div className="col-6">
						<input type="text" name="name" onChange={this.handleChangValue} value={name} className="form-control mb-2" placeholder="Name" required />
					</div>
					<div className="col-6">
						<input type="email" name="email" onChange={this.handleChangValue} value={email}  className="form-control mb-2" placeholder="Email" required />
					</div>
					<div className="col-12">
						<input type="text" name="message" onChange={this.handleChangValue} value={message}  className="form-control" placeholder="Reply..." required />
					</div>
				</div>
				<button type="submit" className="d-none"></button>
			</form>
		);
	}
}

export default CommentReplyForm;
