import { Route } from "react-router-dom";

//import Middleware
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";

//import Page
import Profiles from "../Pages/Profiles/Profiles";
export const routeProtected = (
	<>
		<Route element={<AuthMiddleware />}>
			<Route path="/ca-nhan" element={<Profiles />} />
		</Route>
	</>
);
