import prisma from '@/lib/prismaconnect';
import getSession from './getSession';

const getCurrentUser = async() => {
    try{
        const session = await getSession();

        if (!session?.user?.email){
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            },
            include: {
                accounts: true,
            }
        });

        if (!currentUser){
            return null;
        }
        
        return currentUser;
        
    }catch(err: any){
        return null;
    }
}

export default getCurrentUser;