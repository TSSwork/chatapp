import { NextResponse } from "next/server";

import prisma from "@/lib/prismaconnect";
import getCurrentUser from "@/actions/getCurrentUser";
import { pusherServer } from "@/lib/pusher";

interface IParams {
  conversationId?: string;
}

export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    const {
      conversationId
    } = params;

    
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    // Find last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    // if (!lastMessage) {
    //   return NextResponse.json(conversation);
    // }

    // Update seen of last message
    // const updatedMessage = await prisma.message.update({
    //   where: {
    //     id: lastMessage.id
    //   },
    //   include: {
    //     sender: true,
    //     seen: true,
    //   },
    //   data: {
    //     seen: {
    //       connect: {
    //         id: currentUser.id
    //       }
    //     }
    //   }
    // });

    // Update all connections with new seen
    // await pusherServer.trigger(currentUser.email, 'conversation:update', {
    //   id: conversationId,
    //   messages: [updatedMessage]
    // });

    // // If user has already seen the message, no need to go further
    // if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
    //   return NextResponse.json(conversation);
    // }

    // return new NextResponse('Success');


    const unreadMessages = conversation.messages.filter(message => !message.seenIds.includes(currentUser.id));

    // Use Promise.all to await all promises returned by map
    const updatedMessages = await Promise.all(unreadMessages.map(async (message) => {
    const updatedMessage = await prisma.message.update({
      where: {
        id: message.id
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      }
    });

    //realtime============
    if (lastMessage && lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }
    await pusherServer.trigger(conversationId!, 'message:update', updatedMessage);
    //======================

    return updatedMessage;
  }));

  return NextResponse.json(updatedMessages);
  
  } catch (error) {
    console.log(error, 'ERROR_MESSAGES_SEEN')
    return new NextResponse('Error', { status: 500 });
  }
}