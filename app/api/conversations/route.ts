import getCurrentUser from "@/actions/getCurrentUser"
import prisma from "@/lib/prismaconnect"
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server"

export async function POST(
    request: Request,
){
    try{
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            userId,
            isGroup,
            members,
            name
        } = body

        if (!currentUser?.id || !currentUser?.email){
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (isGroup && (!members || members.length < 2 || !name)){
            return new NextResponse('Missing Info', { status: 400 })
        }

        if (isGroup){
            const newGroupConversation = await prisma.conversation.create({
                data:{
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: {value:string}) => ({
                                id: member.value
                            })),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include:{
                    users: true,
                }
            })

            newGroupConversation.users.forEach((user) => {
                if(user.email){
                    pusherServer.trigger(user.email, 'conversation:new', newGroupConversation)
                }
            })

            return NextResponse.json(newGroupConversation);
        }

        const exisistingConversations = await prisma.conversation.findMany({
            where:{
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        },
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id]
                        },  
                    }
                ]
            }
        })

        const singleConversation = exisistingConversations[0];

        if (singleConversation){
            return NextResponse.json(singleConversation);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users:{
                    connect: [
                        {
                            id: currentUser.id,
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        })

        newConversation.users.forEach((user) => {
            if(user.email){
                pusherServer.trigger(user.email, 'conversation:new', newConversation)
            }
        })

        return NextResponse.json(newConversation);


    }catch(err: any){
        console.log("CONVERSATION CREATION ERROR", err)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}