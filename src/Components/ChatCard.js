import { Box, IconButton, Rating, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Profile from "../Assets/Group 1000011096.png";
import AIProfile from "../Assets/Group 1000011097.png";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import SuggesionModal from "./Modal";

export default function ChatCard({ details, isReadOnly = false, setChats }) {
  const [stars, setStars] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [fb, setFb] = useState("");

  useEffect(() => {
    if (isLike) {
      setChats((prev) =>
        prev.map((item) => {
          if (item?.AI?.id === details.id) {
            return { ...item, AI: { ...item?.AI, rating: stars || 0 } };
          }
          return item;
        })
      );
    } else {
      console.log("not updated");
    }
  }, [stars, isLike, details.id, setChats]);

  useEffect(() => {
    if (fb) {
      setChats((prev) =>
        prev.map((item) => {
          if (item?.AI?.id === details.id) {
            return { ...item, AI: { ...item?.AI, fb: fb || "" } };
          }
          return item;
        })
      );
    } else {
      console.log("not updated");
    }
  }, [fb, details.id, setChats]);

  const time = new Date(details?.time || new Date());

  return (
    <Stack
      sx={{
        boxShadow: !isReadOnly && "0 0 4px rgba(0,0,0,0.1)",
        bgcolor: isReadOnly ? "primary.main" : "primary.light",
        "&:hover #likeBtn": {
          visibility: "visible",
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

          {/* <Typography variant="body1">{details?.chat || "chat"}</Typography> */}

          <Typography variant="body1">
            {details?.chat || details?.message || "chat"}
          </Typography>

          <Stack direction="row" spacing={3} mt={1} alignItems="center">
            <Typography
              variant="subheading"
              sx={{ opacity: 0.6, fontSize: 14 }}
            >
              {time.toLocaleTimeString() || "09:03 PM"}
            </Typography>
            {details?.type === "AI" && !isReadOnly && (
              <Stack
                display="flex"
                direction="row"
                spacing={0}
                id="likeBtn"
                sx={{ visibility: { xs: "visible", md: "hidden" } }}
              >
                <IconButton onClick={() => setIsLike((prev) => !prev)}>
                  {isLike ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />}
                </IconButton>
                <IconButton onClick={() => setIsOpen(true)}>
                  <ThumbDownAltOutlinedIcon />
                </IconButton>
              </Stack>
            )}
          </Stack>

          {(isLike || (isReadOnly && details?.rating > 0)) && (
            <Typography component="legend">
              {!isReadOnly ? "Rate" : "Ratings"}
            </Typography>
          )}

          {(isLike || (isReadOnly && details?.rating > 0)) && (
            <Rating
              disabled={isReadOnly}
              name="simple-controlled"
              value={stars || details?.rating}
              sx={{ width: "fit-content" }}
              onChange={(_, val) => {
                if (isLike) {
                  setStars(val);
                } else {
                  console.log(val);
                }
              }}
            />
          )}

          {details?.fb && (
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
            setFeedback={setFb}
          />
        )}
      </Box>
    </Stack>
  );
}
