import { MediaFileTypes } from "./EditLeadModal";



function MediaViewer({ url, mime_type }: MediaFileTypes) {

    if (mime_type) {
        if (mime_type.startsWith('image/')) {
            return <img src={url} alt="Media content" onDoubleClick={() => {
                window.open(url, '_blank');
            }} />;
        }

        if (mime_type.startsWith('audio/')) {
            return <audio controls src={url}>Your browser does not support the audio element.</audio>;
        }

        if (mime_type.startsWith('video/')) {
            return <video controls src={url}>Your browser does not support the video element.</video>;
        }
    }

    // You can continue to add more conditions based on other MIME types as needed

    return <div>Unsupported media type: {mime_type}</div>;
}

export default MediaViewer;