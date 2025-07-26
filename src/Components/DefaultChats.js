import { useOutletContext } from "react-router-dom";
import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import logoImg from "../Assets/Group 1000011097.png";
import Card from "./Card";

export default function DefaultChats({ getAnswer }) {
  const screenSize = useMediaQuery("(max-width:768px)");
  const context = useOutletContext();

  const prompts = context?.defaultChats || [];

  return (
    <Stack
      alignItems="center"
      justifyContent="flex-end"
      direction="column"
      spacing={screenSize ? 3 : 6}
      mb={1}
      sx={{ width: "100%" }}
    >
      {/* Heading and Logo */}
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
        mb={4}
      >
        <Typography
          component="h1"
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          How Can I Help You Today?
        </Typography>
        <Box
          component="img"
          src={logoImg}
          height={65}
          width={69}
          borderRadius={2}
          flexShrink={0}
          alt="Logo"
          mt={1}
        />
      </Box>

      {/* Prompt Cards Grid */}
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={3} sx={{ width: "100%" }}>
          {prompts.map((item) => (
            <Grid item xs={12} sm={6} key={item.heading}>
              <Card heading={item.heading} subheading={item.sub} handleQue={getAnswer} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}
