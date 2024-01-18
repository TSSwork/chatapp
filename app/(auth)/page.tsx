import AuthForm from "@/components/site/authform";
import { IoLogoSlack } from "react-icons/io";

export default function Auth() {
  return (
    <main className="flex min-h-screen bg-gray-100 flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 justify-center items-center sm:mx-auto sm:w-full sm:max-w-md">
        <IoLogoSlack size={50} className="text-black"/>
      </div>
      <AuthForm />
    </main>
  )
}
