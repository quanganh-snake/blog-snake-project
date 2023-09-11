import React, { Component } from "react";

//Layout
import Headers from "../Headers/Headers";
import Footers from "../Footers/Footers";

//Services
import RouteCore from "../../Services/Routes/RouteCore";
//Url

//Others

export class Main extends Component {
	render() {
		return (
			<>
				<Headers />

				<main id="main">
					<RouteCore />
				</main>

				<Footers />
			</>
		);
	}
}

export default Main;
