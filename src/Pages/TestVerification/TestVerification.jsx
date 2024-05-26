import { useEffect } from "react";
import useAuth from "../../Hooks/UseAuth";


const TestVerification = () => {
    const { user, verification } = useAuth();

    useEffect(() => {
        if (user) {
            verification().then(() => {
                console.log("Verification email sent successfully");
            }).catch((error) => {
                console.error("Error sending verification email:", error);
            });
        }
    }, [user, verification]);

    return null; // This component doesn't render anything
};

export default TestVerification;
