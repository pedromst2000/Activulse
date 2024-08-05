import React from "react";
import Logo from "../../assets/images/Logo.svg";

const NotFound: React.FC = (): JSX.Element => {
	return (
		<div className="flex flex-col items-center  justify-center
		">
			<div>
				<img src={Logo} alt="Logo" className="w-[250px] h-[150px] mx-auto" />
			</div>
			<div>
				<h1 className="text-2xl font-semibold text-secondary-700">404 Not found
				</h1>
			</div>
		</div>
	);
};

export default NotFound;
