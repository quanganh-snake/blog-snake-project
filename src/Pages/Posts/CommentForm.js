import React, { Component } from "react";
import emailjs from "@emailjs/browser";
import moment from "moment";
import HttpClient from "./../../Services/Api/HttpClient";
import config from "../../Configs/Config.json";
const { SITENAME } = config;
const client = new HttpClient();

export class CommentForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			email: "",
			message: "",
		};
	}

	handleSubmitComment = (e) => {
		e.preventDefault();

		const { name, email, message } = this.state;

		const { onPostComment } = this.props;

		const comment = {
			name: name,
			email: email,
			message: message,
			parentId: 0,
			status: 1,
			created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
			updated_at: moment().format("YYYY-MM-DD hh:mm:ss"),
		};

		onPostComment(comment);

		this.setState({
			message: "",
		});

		const dataSendEmail = {
			serviceId: "service_y6b50h6",
			templateId: "template_se21rud",
			publicKey: "NKyk98d-TdMsBRW7N",
			templateParams: {
				name: name,
				email: email,
				sitename: SITENAME,
				message: message,
				link: window.location.href,
			},
		};

		emailjs.send("service_y6b50h6", "template_qbmeg69", dataSendEmail.templateParams, "NKyk98d-TdMsBRW7N").then(
			(result) => {
				console.log(result.text);
			},
			(error) => {
				console.log(error.text);
			}
		);
	};

	handleChangevalue = (e) => {
		const data = { ...this.state };
		data[e.target.name] = e.target.value;
		this.setState(data);
	};

	render() {
		const { name, email, message } = this.state;
		return (
			<div className="row justify-content-center mt-5">
				<div className="col-lg-12">
					<h5 className="comment-title">Leave a Comment</h5>
					<form onSubmit={this.handleSubmitComment}>
						<div className="row">
							<div className="col-lg-6 mb-3">
								<label htmlFor="comment-name">Name</label>
								<input type="text" className="form-control" name="name" required onChange={this.handleChangevalue} id="comment-name" placeholder="Enter your name" />
							</div>
							<div className="col-lg-6 mb-3">
								<label htmlFor="comment-email">Email</label>
								<input type="email" className="form-control" name="email" required onChange={this.handleChangevalue} id="comment-email" placeholder="Enter your email" />
							</div>
							<div className="col-12 mb-3">
								<label htmlFor="comment-message">Message</label>
								<textarea
									className="form-control"
									name="message"
									value={message}
									required
									onChange={this.handleChangevalue}
									id="comment-message"
									placeholder="Enter message"
									cols={30}
									rows={10}
								/>
							</div>
							<div className="col-12">
								<input type="submit" className="btn btn-primary" />
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default CommentForm;
