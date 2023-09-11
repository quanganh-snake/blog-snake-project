/**
 * Xử lý tham số động của các Routes
 * - VD: id, search, ...
 */
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

const withRouter = (ParentComponent) => (props) => {
	const params = useParams(); //Hook có sẵn => Chỉ dùng được trong function Compoent
	const searchParams = useSearchParams(); //return về 1 array
	const navigate = useNavigate(); //chuyển trang - ko load

	return <ParentComponent {...props} params={params} search={searchParams} navigate={navigate} />;
};

export default withRouter;
