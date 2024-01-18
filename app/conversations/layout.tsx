import getConversations from "@/actions/getConversations";
import getUsers from "@/actions/getUsers";
import ConversationList from "@/components/site/conversationlist";
import ChatImageDialog from "@/components/site/dialogs/chatimagedialog";
import ConfirmDialog from "@/components/site/dialogs/confirmdialog";
import SideBar from "@/components/site/sidebar";

export default async function ConversationsLayout({
    children
  }: {
    children: React.ReactNode,
  }) {
    const conversations = await getConversations();
    const users = await getUsers();
  
    return (
      
      <SideBar>
        <div className="h-full">
          <ConversationList 
            users={users} 
            title="Messages" 
            initialItems={conversations}
          />
          {children}
          <ChatImageDialog />
          <ConfirmDialog />
        </div>
      </SideBar>
    );
  }