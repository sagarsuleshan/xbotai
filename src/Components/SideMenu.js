import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeContext } from "../Themes/Contexts";
import image from "../Assets/Group 1000011095.png";
import EditIcon from "../Assets/image 31.png";
import { useNavigate } from "react-router-dom";

export default function SideMenu({ handleClose, setChats }) {
  const screenSize = useMediaQuery("(max-width:768px)");
  const { mode } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Box>
      {screenSize && (
        <Button
          sx={{
            flexGrow: 1,
            width: "100%",
            textAlign: "right",
            justifyContent: "flex-end",
            color: mode === "light" ? "primary.dark" : "text.primary",
          }}
          onClick={() => {
            handleClose(false);
          }}
          endIcon={<CloseIcon />}
        >
          Close
        </Button>
      )}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={2}
        spacing={1}
        px={{ xs: 2, md: 3 }}
        sx={{ bgcolor: "primary.main", cursor: "pointer" }}
        onClick={() => {
          navigate("");
          handleClose(false);
          setChats([]);
        }}
      >
        <Box
          component="img"
          src={image}
          alt="New Chat"
          height={33}
          width={32}
          borderRadius={2}
          flexShrink={0}
        />
        <Typography component="h2" sx={{ mr: 3 }}>
          New Chat
        </Typography>
        <Box
          component="img"
          src={EditIcon}
          alt="Edit Icon"
          height={33}
          width={32}
          borderRadius={2}
          flexShrink={0}
        />
      </Stack>

      <Stack sx={{ margin: "auto", width: "90%" }}>
        <Button
          onClick={() => {
            navigate("/history");
            handleClose(false);
          }}
          sx={{
            bgcolor: "primary.main",
            color: "text.primary",
            mt: 1,
            "&:hover": { bgcolor: "primary.dark" },
          }}
          fullWidth
        >
          Past Conversation
        </Button>
      </Stack>
    </Box>
  );
}