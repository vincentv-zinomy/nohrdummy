import { useAuth } from "@/components/contexts/AuthContext";
import Spinner from "@/components/common/Spinner";
import { useToast } from "@/components/hooks/useToast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import validator from "validator";

export default function SignInPage() {
  const { authState } = useAuth();
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [showMesssage, setShowMessage] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      router.push("/app");
    }
  }, [authState]);

  const signInWithMagicLink = async () => {
    setIsSubmitting(true);

    try {
      const sendLink = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/auth/magic-link`, {
        email,
      });
      setShowMessage({
        show: true,
        message: "Email sent!",
        type: "success",
      })
      toast.addToast("success", "Email sent!");
    }
    catch (err: any) {
      console.log(err);
      setShowMessage({
        show: true,
        message: "Something went wrong!",
        type: "error",
      })
      let errorMsg = "Something went wrong.";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);


    }
    setIsSubmitting(false);
  }
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 ">
        <div className="mx-auto w-full max-w-sm ">
          <div>
            <img
              className="h-24 w-auto"
              src="/Zigment_logo.svg"
              alt="zigment logo"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <Link
                href="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                start your 14-day free trial
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Sign in with
                </p>

                <div className="mt-1 grid grid-cols-3 gap-3">
                  <div
                    onClick={() => {
                      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/users/auth/google`;
                    }}
                  >
                    <span
                      className="w-full inline-flex 
                    justify-center py-2 px-4 border 
                    h-12
                    border-gray-300 rounded-md shadow-sm 
                    bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Google</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 128 128"
                        xmlSpace="preserve"
                      >
                        <g>
                          <g fillRule="evenodd" clipRule="evenodd">
                            <path fill="none" d="M0 0H128V128H0z"></path>
                            <path
                              fill="#FBBC05"
                              d="M27.585 64c0-4.157.69-8.143 1.923-11.881L7.938 35.648C3.734 44.183 1.366 53.801 1.366 64c0 10.191 2.366 19.802 6.563 28.332l21.558-16.503A37.86 37.86 0 0127.585 64"
                            ></path>
                            <path
                              fill="#EA4335"
                              d="M65.457 26.182c9.031 0 17.188 3.2 23.597 8.436L107.698 16C96.337 6.109 81.771 0 65.457 0 40.129 0 18.361 14.484 7.938 35.648l21.569 16.471a37.77 37.77 0 0135.95-25.937"
                            ></path>
                            <path
                              fill="#34A853"
                              d="M65.457 101.818a37.77 37.77 0 01-35.949-25.937L7.938 92.349C18.361 113.516 40.129 128 65.457 128c15.632 0 30.557-5.551 41.758-15.951L86.741 96.221c-5.777 3.639-13.052 5.597-21.284 5.597"
                            ></path>
                            <path
                              fill="#4285F4"
                              d="M126.634 64c0-3.782-.583-7.855-1.457-11.636h-59.72v24.727h34.376c-1.719 8.431-6.397 14.912-13.092 19.13l20.474 15.828c11.766-10.92 19.419-27.188 19.419-48.049"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/users/auth/linkedin`;
                    }}
                  >
                    <span
                      className="w-full inline-flex 
                    justify-center py-2 px-4 border 
                    h-12
                    border-gray-300 rounded-md shadow-sm 
                    bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Linkedin</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        version="1"
                        viewBox="0 0 32 32"
                        xmlSpace="preserve"
                      >
                        <circle
                          cx="16"
                          cy="16"
                          r="16"
                          fill="#007BB5"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></circle>
                        <g fill="#FFF">
                          <path d="M7 11H11V25H7z"></path>
                          <path d="M20.499 11c-2.791 0-3.271 1.018-3.499 2v-2h-4v14h4v-8c0-1.297.703-2 2-2 1.266 0 2 .688 2 2v8h4v-7c0-4-.521-7-4.501-7z"></path>
                          <circle cx="9" cy="8" r="2"></circle>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  {
                    isSubmitting &&
                    <div className="text-center">
                      <Spinner color="text-indigo-500" />
                    </div>
                  }
                  <button
                    disabled={isSubmitting}
                    onClick={() => {
                      if (validator.isEmail(email)) {
                        setShowMessage({
                          ...showMesssage,
                          show: false
                        })
                        signInWithMagicLink();

                      }
                      else {
                        setShowMessage({
                          show: true,
                          message: 'Please enter valid email',
                          type: 'error'
                        });
                      }
                    }}
                    className="w-full flex justify-center py-2 px-4 border 
                    border-transparent rounded-md shadow-sm 
                    text-sm font-medium text-white
                     bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                     focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  disabled:opacity-50
                    disabled:cursor-not-allowed" >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>





    </div>
  );
}
