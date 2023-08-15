import { useEffect } from 'react';
import posthog from 'posthog-js';
import PosthogScript from './PostHogs';
import CrispChatScript from './CrispChatScript';
import GoogleAnalytics from './GoogleAnalyticsScript';

const AllScripts = () => {


    return <>
        <GoogleAnalytics />
        <PosthogScript />
        <CrispChatScript />
    </>;
};

export default AllScripts;
