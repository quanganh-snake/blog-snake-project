//Reference
import { BrowserRouter } from "react-router-dom";

//Main - Layout
import Main from "./Layouts/Main/Main";

//Context - StateProvider
import StateProvider from "./Services/Context/StateProvider";
function App() {
	return (
		<BrowserRouter>
			<StateProvider>
				<Main />
			</StateProvider>
		</BrowserRouter>
	);
}

export default App;
