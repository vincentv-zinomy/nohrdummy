import { useEffect } from 'react';

const CrispChatScript = () => {
    useEffect(() => {
        // Create the Crisp chat script element
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = `window.$crisp=[];window.CRISP_WEBSITE_ID="${process.env.NEXT_PUBLIC_CRISP_CHAT_ID}";(function(){var d=document,s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`;

        // Append the script to the head of the document
        document.head.appendChild(script);

        // Clean up the script when the component unmounts
        return () => {
            // Remove the script element from the head of the document
            document.head.removeChild(script);
        };
    }, []);

    return null;
};

export default CrispChatScript;
