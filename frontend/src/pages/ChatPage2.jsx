import { useEffect } from "react";
import { MessageSquarePlus } from "lucide-react";

import { UseChatStore } from "../store/useChatStore";
import ProfileHeader from "../components/ProfileHeader";
import GetAllContacts from "../components/GetAllContacts";
import ChattingUser from "../components/ChattingUser";

import SearchChatsBar from "../components/SearchChatsBar";
import NoUserConversation from "../components/NoUserConversation";
import FooterChatSection from "../components/FooterChatSection";
import HeaderChatSection from "../components/HeaderChatSection";
import BodyChatSection from "../components/BodyChatSection";

export default function WholeChatSection() {
  // const scrollRef = useRef(null);

  const {
    getContacts,
    setActiveTab,
    activeTab,
    getChattingContacts,
    selectedUser,
  } = UseChatStore();

  const handleGetAllContacts = async (e) => {
    e.preventDefault();
    await getContacts();
    await setActiveTab("contacts");
  };

  const handleGetChatContacts = async () => {
    await getChattingContacts();
  };

  useEffect(() => {
    if (activeTab == "chats") {
      handleGetChatContacts();
    }
  }, [selectedUser]);

  return (
    <div className="relative max-w-6xl  h-[640px] w-full overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-950 to-black text-stone-100 font-sans rounded-xl">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Inter:wght@400;500;600&display=swap');`}</style>

      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-700/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl">
        {/* Sidebar */}
        <aside
          className={`flex w-full md:w-80 flex-shrink-0 flex-col border-r border-white/10 bg-white/5 backdrop-blur-md`}
        >
          <ProfileHeader />

          {activeTab == "contacts" ? <GetAllContacts /> : <ChattingUser />}

          {/* chat add icon / get all contacts */}
          <button
            className={` absolute bottom-6 right-4 rounded-2xl bg-linear-to-r from-purple-400 to-purple-700 p-2 cursor-pointer 
          ${activeTab === "contacts" ? "hidden" : "flex"}
          `}
            onClick={handleGetAllContacts}
            disabled={activeTab === "contacts"}
          >
            <MessageSquarePlus size={28} />
          </button>
        </aside>

        {/* Main */}

        <section className={`flex min-w-0 flex-1 flex-col`}>
          {!selectedUser ? (
            <NoUserConversation />
          ) : (
            <>
              <HeaderChatSection />

              <BodyChatSection />

              <FooterChatSection />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
