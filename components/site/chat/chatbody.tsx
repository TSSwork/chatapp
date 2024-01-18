"use client"
import useConversation from '@/hooks/useConversation'
import { FullMessageType } from '@/types'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import MessageBox from './messagebox'
import { pusherClient } from '@/lib/pusher'
import { find } from 'lodash'

type ChatBodyProps = {
    initialMessages: FullMessageType[]
}

export default function ChatBody({
    initialMessages
}: ChatBodyProps) {
    const bottomRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState(initialMessages);
    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`);
    }, [conversationId]);

    //realtime===================
    useEffect(() => {
      let ConversationId = ''
      if (Array.isArray(conversationId) && typeof(conversationId[0] === 'string')) {
        ConversationId = conversationId[0]
      }else{
        // @ts-ignore
        ConversationId = conversationId
      }

      pusherClient.subscribe(ConversationId)
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message]
      });
      
      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }
  
        return currentMessage;
      }))
    };
  

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(ConversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
    },[conversationId])

  return (
    <div className='overflow-y-auto flex-1'
    >
     {messages.map((message, i) => (
        <MessageBox 
          isLast={i === messages.length - 1} 
          key={message.id} 
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  )
}
