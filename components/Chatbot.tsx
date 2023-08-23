const ChatBot = ({}: any) => {
  return (
    <>
      <button className="absolute bottom-2 left-2 w-14 h-14 border bg-brand-blue-100 rounded-full">
        <svg
          fill="white"
          stroke="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
          ></path>
        </svg>
      </button>
    </>
  );
};

export default ChatBot;
