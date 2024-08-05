import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requests from "../../api/requests";
import { LoadingIcon } from "../../components/LoadingIcon";
import Logo from "../../assets/images/Logo.svg";
import VerifiedImage from "../../assets/images/verified_image.png";
import successI from "../../assets/images/CompletedIcon.svg";
import errorI from "../../assets/images/ErrorIcon.svg";

const VerifyUser: React.FC = () => {
	// Get the token from the url
	const { token } = useParams();

	const [loading, setLoading] = useState<boolean>(true);
	const [status, setStatus] = useState<string>("");

	useEffect(() => {
		const verifyUser = async (): Promise<void> => {
			setLoading(true);
			setStatus("");

			if (!token) {
				setLoading(false);
				setStatus("No token provided");
				return;
			}

			const res = await requests.users.verifyAccount(token);

			setStatus(res.data.message || "Error verifying user");
			setLoading(false);
		};

		verifyUser();
	}, [token]);

	return (
		<>
			{loading ? (
				<LoadingIcon fill="#0C2C7E" />
			) : (
				<div
					className="flex flex-col items-center justify-center
					gap-[50px]
				"
				>
					<div>
						<img src={Logo} alt="Logo" className="w-30 h-20 mx-auto" />
					</div>
					{status === "Verified with success" ? (
						<>
							<img
								src={VerifiedImage}
								alt="Verified Image"
								className="w-140 h-140 mx-auto
							
								border-4 border-secondary-700 rounded-[40px]
							"
							/>
							<img src={successI} alt="Success Icon" className="w-20 h-20 mx-auto" />
							<h1
								className=" 
								text-[22px] font-bold text-secondary-700
							text-center"
							>
								Account verified with success!
							</h1>
							<p
								className="text-center
							
								w-11/12
							text-base

								text-secondary-700"
							>
								Enjoy our App and start boost your heart health!
							</p>
						</>
					) : (
						<>
							<img src={errorI} alt="Error Icon" className="w-20 h-20 mx-auto" />
							<h1 className="text-2xl font-bold text-center text-secondary-700">
								Error verifying account!
							</h1>
							<p
								className="text-center 
							
								w-11/12
							text-secondary-700"
							>
								{status}! Try to resend the verification email from the app or confirm the
								verification on the App to {" "}
								<b>check if you are already verified.</b>
								{" "} If you login successfully, ignore this message. 
							</p>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default VerifyUser;
