import { authOptions } from "@/lib/authoption";
import { getServerSession } from "next-auth";

export default async function getSession() {
    return await getServerSession(authOptions);
}