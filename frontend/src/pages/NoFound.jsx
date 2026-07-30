import { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  MoreVertical,
  CheckCheck,
  ArrowLeft,
  MessageSquarePlus,
} from "lucide-react";

import { UseChatStore } from "../store/useChatStore";
import ProfileHeader from "../components/ProfileHeader";
import GetAllContacts from "../components/GetAllContacts";
import ChattingUser from "../components/ChattingUser";

import SearchChatsBar from "../components/SearchChatsBar";
import NoUserConversation from "../components/NoUserConversation";

const CONTACTS = [
  {
    id: "amara",
    name: "Amara Voss",
    initials: "AV",
    accent: "amber",
    status: "online",
    lastSeen: "Active now",
    preview: "sent the mockups over, take a look",
    time: "09:41",
    unread: 2,
    messages: [
      {
        id: 1,
        from: "them",
        text: "Morning — pushed the new layout to the shared folder.",
        time: "09:12",
      },
      { id: 2, from: "me", text: "On it, give me ten minutes.", time: "09:15" },
      {
        id: 3,
        from: "them",
        text: "No rush. Also sent the mockups over, take a look whenever.",
        time: "09:41",
      },
    ],
  },
  {
    id: "theo",
    name: "Theo Marchetti",
    initials: "TM",
    accent: "fuchsia",
    status: "offline",
    lastSeen: "Last seen 3h ago",
    preview: "You: sounds good, talk tomorrow",
    time: "Yesterday",
    unread: 0,
    messages: [
      {
        id: 1,
        from: "them",
        text: "Can we push the sync to tomorrow morning?",
        time: "18:02",
      },
      { id: 2, from: "me", text: "Sounds good, talk tomorrow.", time: "18:04" },
    ],
  },
  {
    id: "nina",
    name: "Nina Ostrowski",
    initials: "NO",
    accent: "sky",
    status: "online",
    lastSeen: "Active now",
    preview: "haha yeah that tracks",
    time: "Tue",
    unread: 0,
    messages: [
      {
        id: 1,
        from: "them",
        text: "Did you see the numbers from the weekend run?",
        time: "14:20",
      },
      {
        id: 2,
        from: "me",
        text: "Yeah — better than the model predicted, oddly.",
        time: "14:22",
      },
      { id: 3, from: "them", text: "Haha yeah that tracks.", time: "14:23" },
    ],
  },
  {
    id: "kofi",
    name: "Kofi Adjei",
    initials: "KA",
    accent: "rose",
    status: "offline",
    lastSeen: "Last seen Monday",
    preview: "Thanks for the notes 🙏",
    time: "Mon",
    unread: 0,
    messages: [
      { id: 1, from: "them", text: "Thanks for the notes 🙏", time: "11:05" },
    ],
  },
];

const AVATAR_GRADIENT = {
  amber: "from-amber-200 to-amber-600",
  fuchsia: "from-fuchsia-200 to-fuchsia-600",
  sky: "from-sky-200 to-sky-600",
  rose: "from-rose-200 to-rose-600",
};
function Avatar({ initials}) {
  const accent = "fuchsia"
  const size = "lg"
  const status = "ofline"
  const dim =
    size === "sm"
      ? "w-9 h-9 text-xs"
      : size === "lg"
        ? "w-11 h-11 text-sm"
        : "w-10 h-10 text-sm";
  return (
    <div className="relative shrink-0">
      <div
        className={`${dim} uppercase rounded-full flex items-center justify-center font-semibold text-slate-900 bg-gradient-to-br ${AVATAR_GRADIENT[accent]} shadow-lg shadow-black/30 ring-1 ring-white/10`}
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {initials}
      </div>
      {status === "online" && (
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
      )}
    </div>
  );
}



export default function AuroraChat() {
  const [activeId, setActiveId] = useState(null);
  // const [query, setQuery] = useState("");

  const [draft, setDraft] = useState("");

  const [threads, setThreads] = useState(() =>
    Object.fromEntries(CONTACTS.map((c) => [c.id, c.messages])),
  );
  const scrollRef = useRef(null);

  const active = CONTACTS.find((c) => c.id === activeId);
  // const filtered = CONTACTS.filter((c) =>
  //   c.name.toLowerCase().includes(query.toLowerCase()),
  // );



  function sendMessage() {
    if (!draft.trim() || !active) return;
    const msg = {
      id: Date.now(),
      from: "me",
      text: draft.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setThreads((t) => ({ ...t, [active.id]: [...t[active.id], msg] }));
    setDraft("");
  }

  const { getContacts, setActiveTab, activeTab, getChattingContacts, selectedUser} =
    UseChatStore();

  const handleGetAllContacts = async (e) => {
    e.preventDefault();
    await getContacts();
    await setActiveTab("contacts");
  };

  const handleGetChatContacts = async () => {
    await getChattingContacts();
  };

    useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

    if (activeTab == "chats") {
      handleGetChatContacts()
    }
  }, [activeId, threads]);



  return (
    <div className="relative max-w-6xl  h-[640px] w-full overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-950 to-black text-stone-100 font-sans rounded-xl">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Inter:wght@400;500;600&display=swap');`}</style>

      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-700/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl">
        {/* Sidebar */}
        <aside
          className={`${
            active ? "hidden md:flex" : "flex"
          } w-full md:w-80 flex-shrink-0 flex-col border-r border-white/10 bg-white/5 backdrop-blur-md`}
        >
          <ProfileHeader />

          {activeTab == "contacts" ? <GetAllContacts/> : <ChattingUser/>
           }

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

        <section
          className={`flex min-w-0 flex-1 flex-col`}
        >
          {!selectedUser ? (
            <NoUserConversation/>
          ) : (
            <>
              <div className="flex flex-shrink-0 items-center gap-3 border-b border-white/10 px-6 py-4">
                <button
                  onClick={() => setActiveId(null)}
                  className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white md:hidden"
                >
                  <ArrowLeft size={17} />
                </button>
                <Avatar
                  initials={selectedUser.name.substr(0,2)}
                />
                <div className="min-w-0 flex-1">
                  <div
                    className="text-[15px] font-semibold"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {selectedUser.name}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">
                    {"12:34"}
                  </div>
                </div>
                <button className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white">
                  <MoreVertical size={17} />
                </button>
              </div>

              <div
                // ref={scrollRef}
                className="flex-1 space-y-3 overflow-y-auto px-6 py-6"
              >
                {/* {threads[active.id].map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[62%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        m.from === "me"
                          ? "rounded-br-md bg-gradient-to-br from-amber-200 to-amber-500 font-medium text-amber-950"
                          : "rounded-bl-md border border-white/10 bg-white/5 text-stone-100"
                      }`}
                    >
                      <div>{m.text}</div>
                      <div
                        className={`mt-1 flex items-center gap-1 text-[10.5px] ${
                          m.from === "me"
                            ? "justify-end text-amber-900/70"
                            : "text-slate-500"
                        }`}
                      >
                        {m.time}
                        {m.from === "me" && <CheckCheck size={12} />}
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>

              <div className="flex flex-shrink-0 items-center gap-2.5 border-t border-white/10 px-5 py-3.5">
                <button className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white">
                  <Paperclip size={17} />
                </button>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  // onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={`Message ${selectedUser.name.split(" ")[0]}`}
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-stone-100 placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                />
                <button
                  // onClick={sendMessage}
                  disabled={!draft.trim()}
                  className="grid h-10 cursor-pointer w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-200 to-amber-500 text-amber-950 shadow-lg shadow-amber-500/30 transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-40 disabled:shadow-none"
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          )}
        </section>

      </div>
    </div>
  );
}
