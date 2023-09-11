import { Routes, Route } from "react-router-dom";

import React, { Component } from "react";

//import Route Public - protected
import { routePublic } from "../../Routes/RoutePublic";
import { routeProtected } from "../../Routes/RouteProtected";
import Error404 from "../../Errors/Error404";
export class RouteCore extends Component {
	render() {
		return (
			<Routes>
				{routePublic}
				{routeProtected}
				<Route path="*" end element={<Error404 />} />
			</Routes>
		);
	}
}

export default RouteCore;
