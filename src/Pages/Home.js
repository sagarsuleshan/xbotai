import React, { useContext, useEffect, useRef } from "react";
import Navbar from "../Components/Navbar";
import { useOutletContext } from "react-router-dom";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { ThemeContext } from "../Themes/Contexts";
import Input from "../Components/Input";
import DefaultChats from "../Components/DefaultChats";
import AIData from "../AIData/AIData.json";
import ChatCard from "../Components/ChatCard";

export default function Home() {
  // chats and setChats provided by parent via outlet context
  const { chats = [], setChats, handleSidebar } = useOutletContext();
  const themeContext = useContext(ThemeContext);
  const screenSize = useMediaQuery("(max-width:768px)");
  const chatId = useRef(Number(localStorage.getItem("id") || 1));
  const scrollRef = useRef();

  // Load saved chats from localStorage on mount (if not handled upstream)
  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("chats")) || [];
    if (savedChats.length > 0) {
      setChats(savedChats);
    }
  }, [setChats]);

  // Scroll chat container to bottom when chats change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats]);

  // Handler to process user query and generate AI reply
  const getAnswer = (que) => {
    const ans = AIData.find(
      (data) => que.toLowerCase() === data.question.toLowerCase()
    );
    const answer = ans?.response || "Sorry, Did not understand your query!";

    // Push human and AI messages as separate entries
    setChats((prev) => [
      ...prev,
      {
        id: chatId.current,
        type: "Human",
        chat: que,
        time: new Date(),
      },
      {
        id: chatId.current + 1,
        type: "AI",
        chat: answer,
        time: new Date(),
        rating: null,
        feedBack: "",
      },
    ]);

    chatId.current += 2;
    localStorage.setItem("id", chatId.current);
  };

  return (
    <Stack
      sx={{
        height: "100vh",
        background:
          screenSize && themeContext.mode === "light"
            ? "linear-gradient(180deg, #F9FAFA 59%, #EDE4FF 100%)"
            : undefined,
      }}
      direction="column"
      justifyContent="space-between"
    >
      <Navbar handleSidebar={handleSidebar} />

      {/* Chat container with flexGrow and scroll */}
      <Box
        ref={scrollRef}
        sx={{
          flexGrow: 1,
          mb: 0,
          overflowY: "auto",
          scrollbarWidth: "none", // Firefox hide scrollbar
          "&::-webkit-scrollbar": { display: "none" }, // Webkit browsers hide scrollbar
          display: "flex",
          flexDirection: "column",
          px: 2,
          justifyContent: chats.length === 0 ? "center" : "flex-start",
        }}
      >
        {chats.length === 0 ? (
          <DefaultChats getAnswer={getAnswer} />
        ) : (
          chats.map((msg) => (
            <ChatCard key={msg.id} details={msg} setChats={setChats} />
          ))
        )}
      </Box>

      {/* Input area for user queries */}
      <Input
        handleSave={() => {
          // Save current chats to localStorage (replace)
          localStorage.setItem("chats", JSON.stringify(chats));
          setChats([]);
          // navigate('/history'); // uncomment if you want navigation after save
        }}
        getAnswer={getAnswer}
      />
    </Stack>
  );
}
