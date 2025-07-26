import { Box, IconButton, Rating, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Profile from "../Assets/Group 1000011096.png";
import AIProfile from "../Assets/Group 1000011097.png";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import SuggesionModal from "./Modal";

export default function ChatCard({ details, isReadOnly = false, setChats }) {
  // Initialize rating and like state from existing details
  const [stars, setStars] = useState(details?.rating || 0);
  const [isLike, setIsLike] = useState((details?.rating || 0) > 0);
  const [isOpen, setIsOpen] = useState(false);
  const [fb, setFb] = useState(details?.feedBack || "");

  // Update rating in chats state whenever stars or isLike changes and differs from current rating
  useEffect(() => {
    if (isLike && stars !== details?.rating) {
      setChats((prev) =>
        prev.map((item) =>
          item?.AI?.id === details.id
            ? { ...item, AI: { ...item?.AI, rating: stars || 0 } }
            : item
        )
      );
    }
  }, [stars, isLike, details.id, details?.rating, setChats]);

  // Update feedback in chats state whenever fb changes and differs from current feedback
  useEffect(() => {
    if (fb !== details?.feedBack && fb !== "") {
      setChats((prev) =>
        prev.map((item) =>
          item?.AI?.id === details.id
            ? { ...item, AI: { ...item?.AI, feedBack: fb } }
            : item
        )
      );
    }
  }, [fb, details.id, details?.feedBack, setChats]);

  // Format time nicely
  const time = new Date(details?.time || new Date());

  return (
    <Stack
      sx={{
        boxShadow: !isReadOnly ? "0 0 4px rgba(0,0,0,0.1)" : "none",
        bgcolor: isReadOnly ? "primary.main" : "primary.light",
        "&:hover #likeBtn": {
          visibility: isReadOnly ? "hidden" : "visible",
        },
      }}
      m={3}
      borderRadius={3}
      direction="row"
      spacing={1}
      p={3}
      id={`chat-card-${details?.id}`}
    >
      <Box width={70} height={66} minWidth={69}>
        {details?.type === "Human" ? (
          <img src={Profile} alt="Profile" width={70} height={66} />
        ) : (
          <img src={AIProfile} alt="AI Profile" width={70} height={66} />
        )}
      </Box>

      <Box height="fit-content" flex={1}>
        <Stack>
          <Typography variant="heading" component="div">
            <span>{details?.type === "AI" ? "Soul AI" : "You"}</span>
          </Typography>

          <Box component="p" sx={{ margin: 0 }}>
            {details?.chat || "chat"}
          </Box>

          <Stack direction="row" spacing={3} mt={1} alignItems="center">
            <Typography variant="subheading" sx={{ opacity: 0.6, fontSize: 14 }}>
              {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || "09:03 PM"}
            </Typography>

            {details?.type === "AI" && !isReadOnly && (
              <Stack
                display="flex"
                direction="row"
                spacing={0}
                id="likeBtn"
                sx={{ visibility: { xs: "visible", md: "hidden" } }}
              >
                <IconButton
                  onClick={() => setIsLike((prev) => !prev)}
                  aria-label={isLike ? "Remove like" : "Like"}
                >
                  {isLike ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />}
                </IconButton>

                <IconButton onClick={() => setIsOpen(true)} aria-label="Give feedback">
                  <ThumbDownAltOutlinedIcon />
                </IconButton>
              </Stack>
            )}
          </Stack>

          {(isLike || (isReadOnly && stars > 0)) && (
            <>
              <Typography component="legend" sx={{ mt: 1 }}>
                {!isReadOnly ? "Rate" : "Ratings"}
              </Typography>

              <Rating
                disabled={isReadOnly}
                name={`rating-${details.id}`}
                value={stars}
                sx={{ width: "fit-content" }}
                onChange={(_, val) => {
                  if (isLike) {
                    setStars(val);
                  }
                }}
              />
            </>
          )}

          {details?.feedBack && (
            <Typography component="legend" variant="body1" sx={{ mt: 1 }}>
              Feedback:{" "}
              <Typography
                component="span"
                variant="body1"
                sx={{ opacity: 0.7 }}
                color="text.primary"
              >
                {details.feedBack}
              </Typography>
            </Typography>
          )}
        </Stack>

        {!isReadOnly && (
          <SuggesionModal open={isOpen} handleClose={setIsOpen} setFeedback={setFb} />
        )}
      </Box>
    </Stack>
  );
}
