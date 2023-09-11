/**
 * - Là 1 HOC
 * - Dùng đọc dữ liệu
 * - Dùng Context.Consumer -> nhận dữ liệu từ -> Context.Provider
 */

import React from "react";

//import StateContext - dùng Context Consumer
import { StateContext } from "./StateProvider";
export const withContext = (ParentComponent) => {
	return class extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			return <StateContext.Consumer>{(context) => <ParentComponent {...this.props} store={context} />}</StateContext.Consumer>;
		}
	};
};
