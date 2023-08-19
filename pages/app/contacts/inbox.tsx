import { useEffect, useRef, useState } from 'react';

import MessagesBody from '@/components/app-ui/messages/MessagesBody';
import MessagesFooter from '@/components/app-ui/messages/MessagesFooter';
import MessagesHeader from '@/components/app-ui/messages/MessagesHeader';
import MessagesSidebar from '@/components/app-ui/messages/MessagesSidebar';
import moment from 'moment';
import { FormattedMessages } from '@/components/app-ui/EditLeadModal';

export interface InboxMessageTypes {
    name: string;
    contact_phone_number: string;
    contact_email: string;
    messages: FormattedMessages[]
}
const InboxMessages: InboxMessageTypes[] = [
    {

        name: "test 1",
        contact_phone_number: "",
        contact_email: "",
        messages: [{
            _id: '',
            mime_type: 'audio/gg',
            url: '',
            role: 'user',
            content: ` 'Hello, I'm a user'`,
            timestamp: moment().unix(),

        },
        {
            _id: '',
            mime_type: 'audio/gg',
            url: '',
            role: 'assistant',
            content: ` 'Hello, I'm a user'`,
            timestamp: moment().unix(),

        }
        ]
    },
    {
        name: "asdfasdf aasdfasdfasdfas",
        contact_phone_number: "",
        contact_email: "",
        messages: [{
            _id: '',
            mime_type: 'audio/gg',
            url: '',
            role: 'assistant',
            content: ` 'Hello, I'm a user'`,
            timestamp: moment().unix(),

        }]
    },
    {
        name: "test 1",
        contact_phone_number: "",
        contact_email: "",
        messages: [{
            _id: '',
            mime_type: 'audio/gg',
            url: '',
            role: 'user',
            content: ` 'Hello, I'm a user'`,
            timestamp: moment().unix(),

        }]
    },
    {
        name: "asdfasdf aasdfasdfasdfas",
        contact_phone_number: "",
        contact_email: "",
        messages: [{
            _id: '',
            mime_type: 'audio/gg',
            url: '',
            role: 'assistant',
            content: ` 'Hello, I'm a user'`,
            timestamp: moment().unix(),

        }]
    },
    {
        name: "test 1",
        contact_phone_number: "",
        contact_email: "",
        messages: [{
            _id: '',
            mime_type: 'audio/gg',
            url: '',
            role: 'user',
            content: ` 'Hello, I'm a user'`,
            timestamp: moment().unix(),

        }]
    },
    {
        name: "asdfasdf aasdfasdfasdfas",
        contact_phone_number: "",
        contact_email: "",
        messages: [{
            _id: '',
            mime_type: 'audio/gg',
            url: '',
            role: 'assistant',
            content: ` 'Hello, I'm a user'`,
            timestamp: moment().unix(),

        }]
    },
    {
        name: "test 1",
        contact_phone_number: "",
        contact_email: "",
        messages: [{
            _id: '',
            mime_type: 'audio/gg',
            url: '',
            role: 'user',
            content: ` 'Hello, I'm a user'`,
            timestamp: moment().unix(),

        }]
    },
    {
        name: "asdfasdf aasdfasdfasdfas",
        contact_phone_number: "",
        contact_email: "",
        messages: [{
            _id: '',
            mime_type: 'audio/gg',
            url: '',
            role: 'assistant',
            content: ` 'Hello, I'm a user'`,
            timestamp: moment().unix(),

        }]
    },

]
function Messages() {

    const contentArea = useRef<any>(null)

    const [msgSidebarOpen, setMsgSidebarOpen] = useState(true);

    useEffect(() => {
        if (contentArea.current && msgSidebarOpen) {
            contentArea.current.scrollTop = contentArea.current.scrollHeight
        }
    }, [msgSidebarOpen]); // automatically scroll the chat and make the most recent message visible

    return (
        <div className="flex h-screen overflow-hidden">


            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden" ref={contentArea}>



                <main>
                    <div className="relative flex">

                        {/* Messages sidebar */}
                        <MessagesSidebar
                            messages={InboxMessages}
                            msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} />

                        {/* Messages body */}
                        <div className={` flex flex-col md:translate-x-0 transform transition-transform duration-300 ease-in-out translate-x-0`}>
                            <MessagesHeader msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} />
                            <MessagesBody messages={InboxMessages[0].messages} />
                            <MessagesFooter />
                        </div>

                    </div>
                </main>

            </div>

        </div>
    );
}

export default Messages;