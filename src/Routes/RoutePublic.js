import { Route } from "react-router-dom";

//Page
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Posts from "../Pages/Posts/Posts";
import PostDetail from "../Pages/Posts/PostDetail";
import Search from "../Pages/Posts/Search";
//Url
import Url from "../Services/Helpers/Url";

const url = new Url();
export const routePublic = (
	<>
		<Route path={url.home} end element={<Home />} />
		<Route path={url.about} end element={<About />} />
		<Route path={url.category} end element={<Posts />} />
		<Route path={url.post} end element={<PostDetail />} />
		<Route path={url.search} end element={<Search />} />
	</>
);
