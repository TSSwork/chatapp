import getConversationById from '@/actions/getConversationById'
import getMessages from '@/actions/getMessages';
import EmptyState from '@/components/emptystate';
import ChatBody from '@/components/site/chat/chatbody';
import ChatHeader from '@/components/site/chat/chatheader';
import ChatInput from '@/components/site/chat/chatinput';
import React from 'react'
export const dynamic = 'force-dynamic'

type IParams = {
    conversationId: string
}

export default async function SingleConversation({
    params
}: {params : IParams}) {

    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);

    if (!conversation){
        return (
            <main className="flex min-h-screen bg-white w-full">
                <div className="lg:pl-80 min-h-screen w-full">
                    <EmptyState />
                </div>
            </main>
        )
        
    }
  return (
    <main className="flex min-h-screen bg-white w-full">
        <div className="flex flex-col max-h-screen lg:pl-80  w-full">
            <ChatHeader conversation={conversation}/>
            <ChatBody initialMessages={messages} />
            <ChatInput />
        </div>
    </main>
  )
}
