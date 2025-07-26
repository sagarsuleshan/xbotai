import { Box, Stack, Typography } from "@mui/material";

export default function Card({ heading, subheading, handleQue }) {
  return (
    <Stack
      sx={{
        borderRadius: 1,
        flexGrow: 1,
        boxShadow: "0 0 12px rgba(0,0,0,0.1)",
        alignItems: "center",
        bgcolor: "primary.light",
        padding: { xs: 2, md: 3 },
        "&:hover": {
          opacity: 0.6,
        },
      }}
      spacing={1}
      direction="row"
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="heading"
          color="text.primary"
          component="p"
          textAlign="left"
        >
          {heading}
        </Typography>
        <Typography variant="subheading" color="text.secondary">
          {subheading}
        </Typography>
      </Box>
    </Stack>
  );
}
