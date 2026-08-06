import React, { useRef, useState } from "react";
import { Paperclip, Send, X } from "lucide-react";
import { UseChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import useKeyBoardSound from "../hooks/keyboardSound";

const mouseClickSound = new Audio("/sound/mouseClick.mp3");

const FooterChatSection = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const chatImgInputRef = useRef(null);
  const { playRandomKeyStroke } = useKeyBoardSound();

  const { selectedUser, sendMessage, isSoundEnabled } = UseChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (isSoundEnabled) playRandomKeyStroke();
    const data = {
      text: text.trim(),
      image: imagePreview,
    };

    setText("");
    setImagePreview(null);
    if (chatImgInputRef.current) chatImgInputRef.current.value = "";

    await sendMessage(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Select a image file");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const base64Url = reader.result;
      setImagePreview(base64Url);
    };
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (chatImgInputRef.current) chatImgInputRef.current.value = "";
  };

  return (
    <div className=" grid items-center gap-2 border-t border-white/10 px-5 pb-3 pt-2">
      <input
        type="file"
        accept="image/*"
        ref={chatImgInputRef}
        className=" hidden"
        onChange={handleImageChange}
      />

      <div
        className={` flex max-w-fit relative ml-14  ${imagePreview ? "flex" : "hidden"}`}
      >
        <img src={imagePreview} alt="Preview" className=" h-17 rounded-md" />
        <button
          className="absolute opacity-90 -right-1.5 -top-1.5 cursor-pointer bg-linear-to-tl from-indigo-900 via-slate-900 to-black rounded-full p-0.5"
          onClick={()=>{
             if (isSoundEnabled) {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((e) => console.log(e));
            }
            handleRemoveImage()
          }}
        >
          <X color="#fff" size={15} />
        </button>
      </div>

      <div className="flex flex-shrink-0 gap-3.5 ">
        <button
          className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white"
          onClick={() => {
            chatImgInputRef.current.click();
            if (isSoundEnabled) {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((e) => console.log(e));
            }
          }}
        >
          <Paperclip size={17} />
        </button>

        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            {
              if (isSoundEnabled) playRandomKeyStroke();
            }
          }}
          onClick={()=>{
             if (isSoundEnabled) {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((e) => console.log(e));
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && text.trim()) {
              handleSendMessage(e);
            }
          }}
          placeholder={`Message ${selectedUser.name.split(" ")[0]}`}
          className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-stone-100 placeholder-slate-500 outline-none transition focus:border-amber-400/50"
        />

        <button
          onClick={handleSendMessage}
          disabled={!text.trim() && !imagePreview}
          className="grid h-10 cursor-pointer w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-200 to-amber-500 text-amber-950 shadow-lg shadow-amber-500/30 transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-40 disabled:shadow-none"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default FooterChatSection;
