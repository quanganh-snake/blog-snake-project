import React, { Component } from "react";

export class Copyright extends Component {
	render() {
		return (
			<div className="footer-legal">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
							<div className="copyright">
								© Copyright{" "}
								<strong>
									<span>ZenBlog</span>
								</strong>
								. All Rights Reserved
							</div>
							<div className="credits">
								Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
							</div>
						</div>
						<div className="col-md-6">
							<div className="social-links mb-3 mb-lg-0 text-center text-md-end">
								<a href="#" className="twitter">
									<i className="bi bi-twitter" />
								</a>
								<a href="#" className="facebook">
									<i className="bi bi-facebook" />
								</a>
								<a href="#" className="instagram">
									<i className="bi bi-instagram" />
								</a>
								<a href="#" className="google-plus">
									<i className="bi bi-skype" />
								</a>
								<a href="#" className="linkedin">
									<i className="bi bi-linkedin" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Copyright;
