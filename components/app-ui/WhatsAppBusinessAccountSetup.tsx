import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import Script from "next/script";
import React, { useEffect } from "react";
import { useToast } from "../hooks/useToast";
import Spinner from "@/components/common/Spinner";

function WhatsAppBusinessAccountSetup({
  setIsLauncherVisible,
  isLauncherVisible
}: {
  setIsLauncherVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isLauncherVisible: boolean;
}) {
  const toast = useToast();

  React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const fetchWhatsAppInfo = async () => {
    setIsSubmitting(true);
    try {
      const data = await axiosAPIWithAuth.post(
        "/communication-channels/setup-whatsapp-embedded",
        {
          access_token: window.FB_DATA_ACCESS_TOKEN,
        }
      );
      toast.addToast("success", "WhatsApp Business Account Setup Successfully");
      window.location.reload();
    } catch (err: any) {
      console.log(err);
      let errorMsg = "Something went wrong while starting conversation";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);
    }
    setIsSubmitting(true);
  };
  useEffect(() => {
    let checkingInterval = setInterval(() => {
      if (window.FB_SIGNUP_FLOW_COMPLETED && !window.FB_SIGNUP_FLOW_ERROR) {
        if (!isSubmitting) {
          fetchWhatsAppInfo();
        }

        clearInterval(checkingInterval);
      }
    }, 1000);
    return () => {
      if (checkingInterval) {
        clearInterval(checkingInterval);
      }
    };
  }, [isLauncherVisible]);
  return (
    <>
      <Script id="whatsapp-setup-script-meta">
        {`
     window.fbAsyncInit = function () {
      // JavaScript SDK configuration and setup
      FB.init({
        appId:    '${process.env.NEXT_PUBLIC_META_APP_ID}', // Meta App ID
        cookie:   true, // enable cookies
        xfbml:    true, // parse social plugins on this page
        version:  '${process.env.NEXT_PUBLIC_META_API_VERSION}' //Graph API version
      });
    };
    // Load the JavaScript SDK asynchronously
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
// Facebook Login with JavaScript SDK
function launchWhatsAppSignup() {
  window.FB_SIGNUP_FLOW_COMPLETED = false;
  window.FB_SIGNUP_FLOW_ERROR = false;
  console.log('launchWhatsAppSignup');
  // Conversion tracking code
  fbq && fbq('trackCustom', 'WhatsAppOnboardingStart', {appId: '${process.env.NEXT_PUBLIC_META_APP_ID}', feature: 'whatsapp_embedded_signup'});

  // Launch Facebook login
  FB.login(function (response) {
    if (response.authResponse) {
      const accessToken = response.authResponse.accessToken;
      // Call the Graph API to get the WABA ID and related information
      window.FB_DATA_ACCESS_TOKEN = accessToken;
      window.FB_SIGNUP_FLOW_COMPLETED = true;
      window.FB_SIGNUP_FLOW_ERROR = false;
      console.log('WhatsApp Signup Flow Completed');
      console.log(window);
    } else {
      window.FB_SIGNUP_FLOW_COMPLETED = true;
      window.FB_SIGNUP_FLOW_ERROR = true;
      console.log('User cancelled login or did not fully authorize.');
    }
  }, {
    
    scope: 'whatsapp_business_management, whatsapp_business_messaging',
    extras: {
      feature: 'whatsapp_embedded_signup',
      version: 2
    }
  });
}

      `}
      </Script>

      {
        isSubmitting &&
        (
          <Spinner color="text-indigo-600" />
        )
      }
      {/* <button
        className="mt-2 inline-flex items-center 
              py-2 px-4 border border-transparent 
              shadow-sm text-sm font-medium 
              rounded-md text-white 
              bg-green-600 hover:bg-green-700 
              focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-green-500
              disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {
          setIsLauncherVisible(true);
          window.launchWhatsAppSignup();
        }}
        disabled={false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 ml-1 mr-1"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
        Add WhatsApp Number
      </button> */}

    </>
  );
}

export default WhatsAppBusinessAccountSetup;
