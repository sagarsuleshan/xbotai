// import { useContext, useLayoutEffect, useState } from "react";
// import Navbar from "../Components/Navbar";
// import { useOutletContext } from "react-router-dom";
// import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
// import { ThemeContext } from "../Themes/Contexts";
// import Input from "../Components/Input";
// import ChatCard from "../Components/ChatCard";
// import FilterByRating from "../Components/Filter";

// export default function History() {
//   const screenSize = useMediaQuery("(max-width:768px)");
//   const context = useOutletContext();
//   const themeContext = useContext(ThemeContext);
//   const [chats, setChats] = useState([]);
//   const [option, setOption] = useState(0);
//   const [filteredChats, setFilteredChats] = useState([]);

//   function getMonthFromNo(no) {
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     return months[no] || "";
//   }

//   function getDatedetails(date = new Date()) {
//     date = new Date(date);
//     const current = new Date();
//     const MS_PER_DAY = 86400000;
//     const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
//     const currDay = new Date(current.getFullYear(), current.getMonth(), current.getDate()).getTime();

//     if (date.getFullYear() === current.getFullYear() && date.getMonth() === current.getMonth()) {
//       if (dateDay === currDay) return "Today's Chat";
//       if (dateDay === currDay - MS_PER_DAY) return "Yesterday's Chat";
//     }
//     return `${date.getDate()} ${getMonthFromNo(date.getMonth())} ${date.getFullYear()}`;
//   }

//   // Hydrate chats from localStorage on mount
//   useLayoutEffect(() => {
//     const savedChats = JSON.parse(localStorage.getItem("chats")) || [];
//     setChats(savedChats);
//     setFilteredChats(savedChats);
//   }, []);

//   // Persist chats to localStorage when they change
//   useLayoutEffect(() => {
//     localStorage.setItem("chats", JSON.stringify(chats));
//   }, [chats]);

//   return (
//     <Stack
//       sx={{
//         height: "100vh",
//         background: screenSize && themeContext.mode === "light"
//           ? "linear-gradient(180deg, #F9FAFA 59%, #EDE4FF 100%)"
//           : "",
//       }}
//       direction="column"
//       justifyContent="space-between"
//     >
//       <Navbar handleSidebar={context.handleSidebar} />

//       <Box
//         sx={{
//           mb: 1,
//           height: "100%",
//           overflow: "auto",
//           px: 2,
//           scrollbarWidth: "none",
//         }}
//       >
//         <Typography component="h1" variant="h4" textAlign="center" gutterBottom>
//           Past Conversations
//         </Typography>

//         {chats.length > 0 && (
//           <FilterByRating
//             option={option}
//             setOption={setOption}
//             chats={chats}
//             setFilteredChats={setFilteredChats}
//           />
//         )}

//         {filteredChats.length > 0 ? (
//           filteredChats.map((ele, idx) => (
//             <Stack
//               key={`chat-group-${ele?.human?.id ?? idx}`}
//               bgcolor="primary.main"
//               borderRadius={3}
//               spacing={1}
//               m={3}
//               mt={9}
//               p={3}
//               position="relative"
//               data-cy="chat-group"
//             >
//               <Typography
//                 component="h3"
//                 sx={{
//                   textAlign: "center",
//                   position: "absolute",
//                   top: -44,
//                   width: "100%",
//                 }}
//               >
//                 {getDatedetails(ele?.human?.time)}
//               </Typography>

//               <ChatCard key={`human-${idx}`} details={ele?.human} isReadOnly />
//               <Box data-cy="human-message">
//                 <Typography>{ele?.human?.message ?? "No human message"}</Typography>
//               </Box>

//               <ChatCard key={`ai-${idx}`} details={ele?.AI} isReadOnly />
//               <Box data-cy="ai-message">
//                 <Typography>{ele?.AI?.message ?? "No AI message"}</Typography>
//               </Box>
//             </Stack>
//           ))
//         ) : (
//           <Box sx={{ textAlign: "center", mt: chats.length ? "auto" : "10%" }}>
//             No History
//           </Box>
//         )}
//       </Box>

//       <Input
//         handleSave={() => {
//           localStorage.setItem("chats", JSON.stringify(chats));
//           setChats([]);
//         }}
//         page="history"
//       />
//     </Stack>
//   );
// }

import { useEffect, useState, useContext } from "react"; // Changed useLayoutEffect to useEffect
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

  // State for all chats (loaded from localStorage)
  const [chats, setChats] = useState([]);
  // State for filtering options (e.g., by rating)
  const [option, setOption] = useState(0);
  // State for displaying filtered chats
  const [filteredChats, setFilteredChats] = useState([]);

  function getMonthFromNo(no) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[no] || "";
  }

  function getDatedetails(date = new Date()) {
    date = new Date(date);
    const current = new Date();
    const MS_PER_DAY = 86400000; // Milliseconds per day
    const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const currDay = new Date(current.getFullYear(), current.getMonth(), current.getDate()).getTime();

    if (date.getFullYear() === current.getFullYear() && date.getMonth() === current.getMonth()) {
      if (dateDay === currDay) return "Today's Chat";
      if (dateDay === currDay - MS_PER_DAY) return "Yesterday's Chat";
    }
    return `${date.getDate()} ${getMonthFromNo(date.getMonth())} ${date.getFullYear()}`;
  }

  // Effect to load chats from localStorage on component mount
  // This runs only once, similar to componentDidMount
  useEffect(() => {
    try {
      const savedChats = JSON.parse(localStorage.getItem("chats")) || [];
      setChats(savedChats);
      setFilteredChats(savedChats); // Initialize filtered chats with all chats
    } catch (error) {
      console.error("Error parsing chats from localStorage:", error);
      // Fallback to empty array if parsing fails
      setChats([]);
      setFilteredChats([]);
    }
  }, []); // Empty dependency array means it runs once on mount

  // Effect to persist chats to localStorage whenever the 'chats' state changes
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]); // Runs whenever 'chats' state changes

  return (
    <Stack
      sx={{
        height: "100vh",
        background: screenSize && themeContext.mode === "light"
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
          scrollbarWidth: "none", // For Firefox
          "&::-webkit-scrollbar": { // For Webkit browsers (Chrome, Safari, Edge)
            display: "none",
          },
          msOverflowStyle: "none", // For IE/Edge
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
              key={`chat-group-${ele?.human?.id ?? idx}`} // Fallback key if id is missing
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
                {getDatedetails(ele?.human?.time)}
              </Typography>

              {/* ChatCard for Human message */}
              {ele?.human && ( // Ensure human data exists before rendering
                <>
                  <ChatCard
                    details={ele.human}
                    isReadOnly
                    // setChats is NOT passed here as human messages are not rated
                  />
                  {/* Additional Box for human message content, if ChatCard doesn't fully render it */}
                  {/* This might be redundant if ChatCard already displays the message */}
                  <Box data-cy="human-message">
                    <Typography>{ele.human.message ?? "No human message"}</Typography>
                  </Box>
                </>
              )}

              {/* ChatCard for AI message */}
              {ele?.AI && ( // Ensure AI data exists before rendering
                <>
                  <ChatCard
                    details={ele.AI}
                    isReadOnly
                    // Pass setChats so ChatCard can update ratings/feedback for AI messages
                    // Even in read-only mode, if you want rating/feedback to be savable from history
                    // If ratings can ONLY be given on the 'live' chat page, then don't pass setChats here when isReadOnly is true
                    // I'm keeping it for now, assuming you might want to edit ratings on history page.
                    // If not, remove setChats prop when isReadOnly is true.
                    setChats={setChats}
                  />
                  {/* Additional Box for AI message content, if ChatCard doesn't fully render it */}
                  {/* This might be redundant if ChatCard already displays the message */}
                  <Box data-cy="ai-message">
                    <Typography>{ele.AI.message ?? "No AI message"}</Typography>
                  </Box>
                </>
              )}
            </Stack>
          ))
        ) : (
          <Box sx={{ textAlign: "center", mt: "10%" }}> {/* Consistent margin top */}
            No History
          </Box>
        )}
      </Box>

      {/* The Input component might be for the main chat page, not history. */}
      {/* If it's intended to clear/start new chat from history, consider moving this to a dedicated button. */}
      {/* Removing handleSave prop as it caused the clearing issue. */}
      {/* If you need an input on the history page for some reason, its purpose needs to be clarified. */}
      {/* For now, assuming it's not strictly needed for the 'History' page, or its 'handleSave' function is removed. */}
      {/* If the 'Input' component is just a generic text input not tied to saving/clearing, it can remain. */}
      {/* For the scope of this fix, the problematic handleSave is removed. */}
      {/* If you need a "Clear History" button: */}
      {/* <Button onClick={() => { setChats([]); localStorage.setItem("chats", JSON.stringify([])); }}>Clear History</Button> */}

      {/* Keeping Input for structural completeness, but without the problematic handleSave logic */}
      {/* If 'Input' is specifically for *sending new messages*, it shouldn't be on the history page. */}
      <Input page="history" />

    </Stack>
  );
}