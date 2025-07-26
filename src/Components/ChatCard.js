// import { Box, IconButton, Rating, Stack, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import Profile from "../Assets/Group 1000011096.png";
// import AIProfile from "../Assets/Group 1000011097.png";
// import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
// import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
// import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
// import SuggesionModal from "./Modal";

// export default function ChatCard({ details, isReadOnly = false, setChats }) {
//   const [stars, setStars] = useState(0);
//   const [isLike, setIsLike] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [fb, setFb] = useState("");

//   useEffect(() => {
//     if (isLike) {
//       setChats((prev) =>
//         prev.map((item) => {
//           if (item?.AI?.id === details.id) {
//             return { ...item, AI: { ...item?.AI, rating: stars || 0 } };
//           }
//           return item;
//         })
//       );
//     } else {
//       console.log("not updated");
//     }
//   }, [stars, isLike, details.id, setChats]);

//   useEffect(() => {
//     if (fb) {
//       setChats((prev) =>
//         prev.map((item) => {
//           if (item?.AI?.id === details.id) {
//             return { ...item, AI: { ...item?.AI, fb: fb || "" } };
//           }
//           return item;
//         })
//       );
//     } else {
//       console.log("not updated");
//     }
//   }, [fb, details.id, setChats]);

//   const time = new Date(details?.time || new Date());

//   return (
//     <Stack
//       sx={{
//         boxShadow: !isReadOnly && "0 0 4px rgba(0,0,0,0.1)",
//         bgcolor: isReadOnly ? "primary.main" : "primary.light",
//         "&:hover #likeBtn": {
//           visibility: "visible",
//         },
//       }}
//       m={3}
//       borderRadius={3}
//       direction="row"
//       spacing={1}
//       p={3}
//     >
//       <Box width={70} height={66} minWidth={69}>
//         {details?.type === "Human" ? (
//           <img src={Profile} alt="Profile" width={70} height={66} />
//         ) : (
//           <img src={AIProfile} alt="AI Profile" width={70} height={66} />
//         )}
//       </Box>

//       <Box height="fit-content">
//         <Stack>
//           <Typography variant="heading">
//             {details?.type === "AI" ? "Soul AI" : "You"}
//           </Typography>

//           {/* <Typography variant="body1">{details?.chat || "chat"}</Typography> */}

//           <Typography variant="body1">
//             {details?.chat || details?.message || "chat"}
//           </Typography>

//           <Stack direction="row" spacing={3} mt={1} alignItems="center">
//             <Typography
//               variant="subheading"
//               sx={{ opacity: 0.6, fontSize: 14 }}
//             >
//               {time.toLocaleTimeString() || "09:03 PM"}
//             </Typography>
//             {details?.type === "AI" && !isReadOnly && (
//               <Stack
//                 display="flex"
//                 direction="row"
//                 spacing={0}
//                 id="likeBtn"
//                 sx={{ visibility: { xs: "visible", md: "hidden" } }}
//               >
//                 <IconButton onClick={() => setIsLike((prev) => !prev)}>
//                   {isLike ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />}
//                 </IconButton>
//                 <IconButton onClick={() => setIsOpen(true)}>
//                   <ThumbDownAltOutlinedIcon />
//                 </IconButton>
//               </Stack>
//             )}
//           </Stack>

//           {(isLike || (isReadOnly && details?.rating > 0)) && (
//             <Typography component="legend">
//               {!isReadOnly ? "Rate" : "Ratings"}
//             </Typography>
//           )}

//           {(isLike || (isReadOnly && details?.rating > 0)) && (
//             <Rating
//               disabled={isReadOnly}
//               name="simple-controlled"
//               value={stars || details?.rating}
//               sx={{ width: "fit-content" }}
//               onChange={(_, val) => {
//                 if (isLike) {
//                   setStars(val);
//                 } else {
//                   console.log(val);
//                 }
//               }}
//             />
//           )}

//           {details?.fb && (
//             <Typography component="legend" variant="body1">
//               Feedback:{" "}
//               <Typography
//                 component="span"
//                 variant="body1"
//                 sx={{ opacity: 0.7 }}
//                 color="text.primary"
//               >
//                 {details.fb}
//               </Typography>
//             </Typography>
//           )}
//         </Stack>

//         {!isReadOnly && (
//           <SuggesionModal
//             open={isOpen}
//             handleClose={setIsOpen}
//             setFeedback={setFb}
//           />
//         )}
//       </Box>
//     </Stack>
//   );
// }

import { Box, IconButton, Rating, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Profile from "../Assets/Group 1000011096.png";
import AIProfile from "../Assets/Group 1000011097.png";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import SuggesionModal from "./Modal";

export default function ChatCard({ details, isReadOnly = false, setChats }) {
  // Initialize states from 'details' prop if available, otherwise default
  // This ensures that when a ChatCard loads a previously saved message,
  // its internal states (stars, isLike, fb) reflect the saved data.
  const [stars, setStars] = useState(details?.rating || 0); // Assuming 'rating' is directly on 'details' for AI
  const [isLike, setIsLike] = useState(
    (details?.rating && details.rating > 0) || (details?.fb && details.fb.length > 0)
  ); // Assume 'liked' if rated or has feedback
  const [isOpen, setIsOpen] = useState(false);
  const [fb, setFb] = useState(details?.fb || ""); // Assuming 'fb' is directly on 'details' for AI

  // We are removing the useEffects that watch 'stars' and 'fb' to update 'chats'.
  // Instead, we will update 'chats' directly within the onChange/onClick handlers.
  // This simplifies the logic and ensures immediate state updates.

  // When the like button is toggled
  const handleLikeToggle = () => {
    const newIsLike = !isLike;
    setIsLike(newIsLike);

    // If unliking, you might want to clear rating/feedback too.
    // If liking, and no rating exists, set a default rating or just show the rating component.
    if (!newIsLike) {
      // If user unlikes, clear stars and feedback for this item
      setStars(0);
      setFb("");
      // Update parent state to remove rating/feedback
      if (setChats && details.type === "AI") {
        setChats((prev) =>
          prev.map((item) => {
            if (item?.AI?.id === details.id) {
              const newAI = { ...item.AI };
              delete newAI.rating; // Remove rating
              delete newAI.fb;     // Remove feedback
              return { ...item, AI: newAI };
            }
            return item;
          })
        );
      }
    } else {
      // If liking, and there's no previous rating, set a default (e.g., 5 stars) or just show the widget
      if (!details.rating && setChats && details.type === "AI") {
         // You might want to pre-fill a rating, or just let the user set it.
         // For now, if no rating exists, the Rating component will show 0.
      }
    }
  };


  // When rating changes (direct update to parent state)
  const handleRatingChange = (_, val) => {
    setStars(val); // Update local state
    // Update the parent's chats state with the new rating
    if (setChats && details.type === "AI") { // Only for AI messages and if setChats is provided
      setChats((prev) =>
        prev.map((item) => {
          if (item?.AI?.id === details.id) {
            return { ...item, AI: { ...item.AI, rating: val || 0 } };
          }
          return item;
        })
      );
    }
  };

  // Function to handle feedback from the modal (direct update to parent state)
  const handleFeedbackSubmit = (feedbackText) => {
    setFb(feedbackText); // Update local state
    // Update the parent's chats state with the new feedback
    if (setChats && details.type === "AI") { // Only for AI messages and if setChats is provided
      setChats((prev) =>
        prev.map((item) => {
          if (item?.AI?.id === details.id) {
            return { ...item, AI: { ...item.AI, fb: feedbackText || "" } };
          }
          return item;
          // Optionally, if providing feedback is considered a "dislike" state
          // and you want to prevent 'isLike' from being true simultaneously:
          // setIsLike(false);
        })
      );
    }
    setIsOpen(false); // Close the modal
  };

  const time = new Date(details?.time || new Date());

  return (
    <Stack
      sx={{
        boxShadow: !isReadOnly && "0 0 4px rgba(0,0,0,0.1)",
        bgcolor: isReadOnly ? "primary.main" : "primary.light",
        // Only show likeBtn on hover for non-readOnly AI messages
        "&:hover #likeBtn": {
          visibility: details?.type === "AI" && !isReadOnly ? "visible" : "hidden",
        },
      }}
      m={3}
      borderRadius={3}
      direction="row"
      spacing={1}
      p={3}
    >
      <Box width={70} height={66} minWidth={69}>
        {details?.type === "Human" ? (
          <img src={Profile} alt="Profile" width={70} height={66} />
        ) : (
          <img src={AIProfile} alt="AI Profile" width={70} height={66} />
        )}
      </Box>

      <Box height="fit-content">
        <Stack>
          <Typography variant="heading">
            {details?.type === "AI" ? "Soul AI" : "You"}
          </Typography>

          <Typography variant="body1">
            {details?.chat || details?.message || "chat"}
          </Typography>

          <Stack direction="row" spacing={3} mt={1} alignItems="center">
            <Typography
              variant="subheading"
              sx={{ opacity: 0.6, fontSize: 14 }}
            >
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) || "09:03 PM"} {/* Format time */}
            </Typography>
            {details?.type === "AI" && !isReadOnly && (
              <Stack
                display="flex"
                direction="row"
                spacing={0}
                // Use a dynamic ID for uniqueness, though 'sx' may handle this with the parent selector
                id={`likeBtn-${details.id || Math.random()}`} // Added dynamic ID
                sx={{ visibility: { xs: "visible", md: "hidden" } }}
              >
                <IconButton onClick={handleLikeToggle}>
                  {isLike ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />}
                </IconButton>
                <IconButton onClick={() => setIsOpen(true)}>
                  <ThumbDownAltOutlinedIcon />
                </IconButton>
              </Stack>
            )}
          </Stack>

          {/* Show rating section if liked, or if readOnly and has a rating */}
          {(isLike || (isReadOnly && details?.rating > 0)) && (
            <Typography component="legend">
              {!isReadOnly ? "Rate" : "Ratings"}
            </Typography>
          )}

          {(isLike || (isReadOnly && details?.rating > 0)) && (
            <Rating
              disabled={isReadOnly}
              name={`chat-rating-${details.id || Math.random()}`} // Dynamic name for unique ratings
              value={stars} // Use local 'stars' state, which is initialized from 'details.rating'
              sx={{ width: "fit-content" }}
              onChange={handleRatingChange} // Use the new handler
            />
          )}

          {details?.fb && ( // Display feedback if available
            <Typography component="legend" variant="body1">
              Feedback:{" "}
              <Typography
                component="span"
                variant="body1"
                sx={{ opacity: 0.7 }}
                color="text.primary"
              >
                {details.fb}
              </Typography>
            </Typography>
          )}
        </Stack>

        {!isReadOnly && (
          <SuggesionModal
            open={isOpen}
            handleClose={setIsOpen}
            setFeedback={handleFeedbackSubmit} // Use the new handler
          />
        )}
      </Box>
    </Stack>
  );
}