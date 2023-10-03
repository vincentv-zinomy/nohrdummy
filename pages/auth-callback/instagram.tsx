import axiosAPIWithAuth from '@/lib/axiosAPIWithAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function AuthCallbackForInstagram() {
    const router = useRouter();

    async function handleInstagramAuth() {
        // Capture the access_token from the URL fragment
        const fragment = window.location.hash.substring(1);
        const params = new URLSearchParams(fragment);
        const accessToken = params.get("access_token");

        if (!accessToken) {
            console.error("Access token was not returned by Instagram.");
            return;
        }

        // Send access_token to your backend to validate, save, and/or act upon it
        try {
            const response = await axiosAPIWithAuth.post('/communication-channels/setup-instagram', { access_token: accessToken });
            if (response.data) {
                // Handle success logic, e.g. redirect to another page
                // router.push('/dashboard');
            } else {
                // Handle error logic
                console.error("Error validating the Instagram token on the backend.");
            }
        } catch (error) {
            console.error("Error occurred while validating the Instagram token:", error);
        }
    }
    useEffect(() => {


        handleInstagramAuth();
    }, []);

    return (
        <div>
            Authenticating with Instagram...
        </div>
    );
}

export default AuthCallbackForInstagram;
