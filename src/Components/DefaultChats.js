import { useOutletContext } from "react-router-dom";
import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import logoImg from "../Assets/Group 1000011097.png";
import Paper from "@mui/material/Paper";
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
          {prompts.map((item, idx) => (
            <Grid
              item
              xs={12}
              sm={6}
              key={item.heading}
              onClick={() => getAnswer(item.heading)}
              sx={{ cursor: "pointer" }}
            >
              <Card
                heading={item.heading}
                subheading={item.sub}
                handleQue={getAnswer}
              />

              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  minHeight: 120,
                  bgcolor: "primary.light",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  boxShadow: "0 1px 8px 0 rgba(151,133,186,0.10)",
                  transition: "box-shadow 0.3s",
                  "&:hover": { boxShadow: 6, opacity: 0.92 },
                  width: "100%",
                }}
              >
                <Typography variant="body1" fontWeight={600}>
                  {item.heading}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.sub}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}
