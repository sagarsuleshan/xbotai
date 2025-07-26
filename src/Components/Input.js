import { Box, Button, Stack, TextField } from "@mui/material";
import { useState, useContext } from "react";
import { ThemeContext } from "../Themes/Contexts";
import { useNavigate } from "react-router-dom";

export default function Input({ handleSave, getAnswer, page }) {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  return (
    <Box width="-webkit-fill-available" mb={3}>
      <Stack
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(input, e);
          getAnswer(input);
          setInput("");
        }}
        display="flex"
        direction="row"
        spacing={3}
        px={3}
      >
        <TextField
          placeholder=""
          value={input}
          onFocus={() => {
            page === "history" && navigate("/");
          }}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            bgcolor: themeContext.mode === "dark" ? "primary.light" : "white",
            flexGrow: 1,
            borderRadius: 1,
            color: "black",
            border: "1px solid",
            borderColor: "primary.main",
            "& input": {
              color: themeContext.mode === "light" ? "primary.dark" : "text.primary",
              fontSize: "larger",
            },
          }}
          required
        />
        <Button
          type="submit"
          onClick={() => {
            console.log("submit clicked");
          }}
          sx={{
            bgcolor: "primary.main",
            color: "text.primary",
            width: "fit-content",
          }}
        >
          ASK
        </Button>
        <Button
          onClick={() => {
            page !== "history" ? handleSave() : navigate("/");
          }}
          sx={{
            bgcolor: "primary.main",
            color: "text.primary",
            width: "fit-content",
          }}
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
}
