import React, { useEffect, useState } from "react";
import { Search, X} from "lucide-react";
import { UseChatStore } from "../store/useChatStore";
import useKeyBoardSound from "../hooks/keyboardSound";

const mouseClickSound = new Audio("/sound/mouseClick.mp3");

const SearchBar2 = () => {
    const [query, setQuery] = useState("")
    const {isSoundEnabled,setSearchChatContacts, chatContacts} = UseChatStore()
      const { playRandomKeyStroke } = useKeyBoardSound()

  
    useEffect(()=>{
      // if(query == "")
          const searchContacts = chatContacts.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
      // console.log(searchContacts);
      setSearchChatContacts(searchContacts)
    }, [query])
  
  
    return (
      <div className="relative mx-2 mb-3.5">
        <Search
          size={14}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (isSoundEnabled) {
              playRandomKeyStroke()
            }
          }
          }
          onClick={()=>{
            if (isSoundEnabled) {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((e) => console.log(e));
            }
          }}
          placeholder="Search people"
          className=" w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-stone-100 placeholder-slate-500 outline-none transition focus:border-amber-400/50"
        />
        <X
        size={17}
          className= {`absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-slate-500
            ${
              query ? "flex" : "hidden"
            }
            `}
          onClick={()=>{
            setQuery("")
            if (isSoundEnabled) {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((e) => console.log(e));
            }
          }
          }
        />
      </div>
    );
}

export default SearchBar2
