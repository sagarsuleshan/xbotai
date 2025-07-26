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
  // const navigate = useNavigate();

  function getMonthFromNo(no) {
    switch (no) {
      case 0:
        return "Jan";
      case 1:
        return "Feb";
      case 2:
        return "Mar";
      case 3:
        return "Apr";
      case 4:
        return "May";
      case 5:
        return "Jun";
      case 6:
        return "Jul";
      case 7:
        return "Aug";
      case 8:
        return "Sep";
      case 9:
        return "Oct";
      case 10:
        return "Nov";
      case 11:
        return "Dec";
      default:
        return "";
    }
  }

  function getDatedetails(date = new Date()) {
    date = new Date(date);
    let current = new Date();
    // Remove time part for pure day comparison
    let dateDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();
    let currDay = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate()
    ).getTime();
    const MS_PER_DAY = 86400000;
    if (
      date.getFullYear() === current.getFullYear() &&
      date.getMonth() === current.getMonth()
    ) {
      if (dateDay === currDay) {
        return "Today's Chat";
      }
      if (dateDay === currDay - MS_PER_DAY) {
        return "Yesterday's Chat";
      }
    }
    return `${date.getDate()} ${getMonthFromNo(
      date.getMonth()
    )} ${date.getFullYear()}`;
  }

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  // Load chats on mount
  // useEffect(() => {
  //   const savedChats = JSON.parse(localStorage.getItem("chats")) || [];
  //   if (savedChats.length > 0) {
  //     setChats(savedChats);
  //     setFilteredChats(savedChats);
  //   }
  // }, []);

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("chats")) || [];
    if (savedChats.length > 0) {
      setChats(savedChats);
    }
  }, []);

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
        sx={{ mb: 1, height: "100%", scrollbarWidth: "none" }}
        gap={10}
        overflow="scroll"
        justifyContent="end"
      >
        <Typography
          component="h1"
          sx={{ textAlign: "center", mt: chats.length ? "auto" : "10%" }}
        >
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
            >
              <Typography
                component="h3"
                sx={{
                  textAlign: "center",
                  mt: chats.length ? "auto" : "10%",
                  position: "absolute",
                  top: -44,
                  width: "100%",
                }}
              >
                {getDatedetails(ele?.human?.time) || "Previous Chat"}
              </Typography>
              <ChatCard
                key={`human-${ele?.human?.id ?? idx}`}
                details={ele?.human}
                isReadOnly
              />
              <ChatCard
                key={`ai-${ele?.AI?.id ?? idx}`}
                details={ele?.AI}
                isReadOnly
              />
            </Stack>
          ))
        ) : (
          <Box
            component="div"
            sx={{ textAlign: "center", mt: chats.length ? "auto" : "10%" }}
          >
            No History
          </Box>
        )}
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
        }}
        page="history"
      />
    </Stack>
  );
}
