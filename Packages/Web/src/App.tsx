import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./navigation";

const App: React.FC = (): JSX.Element => {
	return (
		<div
			className="bg-primary-50
        h-screen w-screen
        flex flex-col items-center justify-center
    "
		>
			<div className="fade-in">
				<Router>
					<Navigation />
				</Router>
			</div>
		</div>
	);
};

export default App;
