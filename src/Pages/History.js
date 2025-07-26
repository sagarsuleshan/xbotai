import { useContext, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useOutletContext } from "react-router-dom";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { ThemeContext } from "../Themes/Contexts";
import Input from "../Components/Input";
import ChatCard from "../Components/ChatCard";
import FilterByRating from "../Components/Filter";

export default function History() {
  const screenSize = useMediaQuery("(max-width:768px)");
  const context = useOutletContext();
  const themeContext = useContext(ThemeContext);
  const [chats, setChats] = useState([]);
  const [option, setOption] = useState(0);
  const [filteredChats, setFilteredChats] = useState([]);

  function getMonthFromNo(no) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[no] || "";
  }

  function getDatedetails(date = new Date()) {
    date = new Date(date);
    const current = new Date();
    const MS_PER_DAY = 86400000;
    const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const currDay = new Date(current.getFullYear(), current.getMonth(), current.getDate()).getTime();

    if (date.getFullYear() === current.getFullYear() && date.getMonth() === current.getMonth()) {
      if (dateDay === currDay) return "Today's Chat";
      if (dateDay === currDay - MS_PER_DAY) return "Yesterday's Chat";
    }
    return `${date.getDate()} ${getMonthFromNo(date.getMonth())} ${date.getFullYear()}`;
  }

  // Hydrate chats from localStorage on mount
  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("chats")) || [];
    setChats(savedChats);
    setFilteredChats(savedChats);
  }, []);

  // Persist chats to localStorage when they change
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  return (
    <Stack
      sx={{
        height: "100vh",
        background:
          screenSize && themeContext.mode === "light"
            ? "linear-gradient(180deg, #F9FAFA 59%, #EDE4FF 100%)"
            : "",
      }}
      direction="column"
      justifyContent="space-between"
    >
      <Navbar handleSidebar={context.handleSidebar} />

      <Box
        sx={{
          mb: 1,
          height: "100%",
          overflow: "auto",
          px: 2,
          scrollbarWidth: "none",
          /* For WebKit browsers */
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Typography component="h1" variant="h4" textAlign="center" gutterBottom>
          Past Conversations
        </Typography>

        {chats.length > 0 && (
          <FilterByRating
            option={option}
            setOption={setOption}
            chats={chats}
            setFilteredChats={setFilteredChats}
          />
        )}

        {filteredChats.length > 0 ? (
          filteredChats.map((ele, idx) => (
            <Stack
              key={`chat-group-${ele?.human?.id ?? idx}`}
              bgcolor="primary.main"
              borderRadius={3}
              spacing={1}
              m={3}
              mt={9}
              p={3}
              position="relative"
              data-cy="chat-group"
            >
              <Typography
                component="h3"
                sx={{
                  textAlign: "center",
                  position: "absolute",
                  top: -44,
                  width: "100%",
                }}
              >
                {getDatedetails(ele?.human?.time) || "Previous Chat"}
              </Typography>

              {/* Human message */}
              <ChatCard key={`human-${ele?.human?.id ?? idx}`} details={ele?.human} isReadOnly />
              <Box data-cy="human-message" sx={{ pl: 2 }}>
                <Typography>
                  {ele?.human?.chat ?? "No human message"}
                </Typography>
              </Box>

              {/* AI message */}
              <ChatCard key={`ai-${ele?.AI?.id ?? idx}`} details={ele?.AI} isReadOnly />
              <Box data-cy="ai-message" sx={{ pl: 2 }}>
                <Typography>
                  {ele?.AI?.chat ?? "No AI message"}
                </Typography>
              </Box>
            </Stack>
          ))
        ) : (
          <Box sx={{ textAlign: "center", mt: chats.length ? "auto" : "10%" }}>
            No History
          </Box>
        )}
      </Box>

      <Input
        handleSave={() => {
          localStorage.setItem("chats", JSON.stringify(chats));
          setChats([]);
        }}
        page="history"
      />
    </Stack>
  );
}
