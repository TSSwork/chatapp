import bcrypt from "bcrypt";

import prisma from "@/lib/prismaconnect"
import { NextResponse } from "next/server"
import PrismaError from "@/lib/errors/prismaerror";


export async function POST(
    request: Request
){
    try{
        const body = await request.json();
        const {
            email,
            password,
            name
        } = body;

        if (!email || !name || !password) {
            return new NextResponse("Missing Info",{ status: 400})
        }

        const hashedPassword = await bcrypt.hash(password, 12);

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    hashedPassword
                }
            });

            return NextResponse.json(user);
        
    }catch(err: any){
        console.error("REGISTRATION ERROR : ",err);
        //error handler
        let error = PrismaError(err);
        
        if (error){
            return new NextResponse(error.ErrorMessage,{ status: error.ErrorStatus})
        }
    }

}