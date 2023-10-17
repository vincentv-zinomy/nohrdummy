import axiosAPIWithAuth from '@/lib/axiosAPIWithAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function AuthCallbackForFBMessenger() {
    const router = useRouter();

    async function handleFBMessengerAuth() {
        // Capture the access_token from the URL fragment
        const fragment = window.location.hash.substring(1);
        const params = new URLSearchParams(fragment);
        const accessToken = params.get("access_token");

        if (!accessToken) {
            console.error("Access token was not returned by FB Messenger.");
            window.close(); // Close the popup if no access token is found
            return;
        }

        // Send access_token to your backend to validate, save, and/or act upon it
        try {
            const response = await axiosAPIWithAuth.post('/communication-channels/setup-fb-messenger', { access_token: accessToken });
            if (response.data) {
                // Handle success logic, e.g. redirect to another page
                // router.push('/dashboard');
                window.close(); // Close the popup when finished
            } else {
                // Handle error logic
                console.error("Error validating the FB Messenger token on the backend.");
                // alert("Something went wrong...");
                window.close(); // Close the popup when finished
            }
        } catch (error) {
            console.error("Error occurred while validating the FB Messenger token:", error);
            alert("Something went wrong...");
            window.close(); // Close the popup when finished
        }
    }
    useEffect(() => {


        handleFBMessengerAuth();
    }, []);

    return (
        <div>
            Authenticating with FB Messenger...
        </div>
    );
}

export default AuthCallbackForFBMessenger;
