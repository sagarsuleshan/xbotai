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
  const { chats = [], setChats, handleSidebar } = useOutletContext();
  const themeContext = useContext(ThemeContext);
  const screenSize = useMediaQuery("(max-width:768px)");
  const chatId = useRef(Number(localStorage.getItem("id") || 1));
  const scrollRef = useRef();
  //const navigate = useNavigate();

  useEffect(() => {
    scrollRef.current?.lastElementChild?.scrollIntoView();
  }, [chats]); // Only run when chats change

  const getAnswer = (que) => {
    const ans = AIData.find(
      (data) => que.toLowerCase() === data.question.toLowerCase()
    );
    const answer = ans?.response || "Sorry, I didn't understand your query!";
    // Only update chatId on mount, increment locally on each new chat
    setChats((prev) => [
      ...prev,
      {
        id: chatId.current,
        human: {
          type: "Human",
          chat: que,
          time: new Date(),
          id: chatId.current,
        },
        AI: {
          type: "AI",
          chat: answer,
          time: new Date(),
          id: chatId.current + 1,
          rating: null,
          feedBack: "",
        },
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
      <Box
        ref={scrollRef}
        sx={{ mb: 1, height: "100%", scrollbarWidth: "none" }}
        gap={10}
        overflow="scroll"
        display={chats.length === 0 ? "flex" : "block"}
        justifyContent="end"
      >
        {chats.length === 0 && (
          <DefaultChats getAnswer={getAnswer} />
        )}
        {chats.length > 0 &&
          chats.map((ele, idx) => (
            <React.Fragment key={ele.id || idx}>
              <ChatCard details={ele?.human} setChats={setChats} />
              <ChatCard details={ele?.AI} setChats={setChats} />
            </React.Fragment>
          ))}
      </Box>
      <Input
        handleSave={() => {
          localStorage.setItem(
            "chats",
            JSON.stringify([
              ...(JSON.parse(localStorage.getItem("chats")) || []),
              ...chats,
            ])
          );
          setChats([]);
          // navigate('/history');
        }}
        getAnswer={getAnswer}
      />
    </Stack>
  );
}