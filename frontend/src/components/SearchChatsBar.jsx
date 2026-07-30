import React from 'react'
import { Search} from "lucide-react"

const SearchChatsBar = () => {
  return (
    <div className="relative ml-16 mr-1 mb-3.5">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              // value={query}
              // onChange={(e) => setQuery(e.target.value)}
              placeholder="Search people"
              className=" w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-stone-100 placeholder-slate-500 outline-none transition focus:border-amber-400/50"
            />
          </div>
  )
}

export default SearchChatsBar
