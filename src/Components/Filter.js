import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function FilterByRating({ option, setOption, setFilteredChats, chats }) {
  const handleChange = (event) => {
    setOption(event.target.value);
  };

  React.useEffect(() => {
    setFilteredChats(filter(chats, option));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option, chats]);

  function filter(list, keyword) {
    if (keyword === 0) return list;
    if (keyword === null) {
      // Filter chats with no rating (rating === null or undefined or 0)
      return list.filter((item) => !item?.AI?.rating);
    }
    // Filter chats with rating equal to keyword
    return list.filter((item) => item?.AI?.rating === keyword);
  }

  return (
    <Box sx={{ minWidth: 120, m: 3 }}>
      <InputLabel id="filter-by-rating-label">Filter by rating</InputLabel>
      <Select
        labelId="filter-by-rating-label"
        value={option}
        onChange={handleChange}
        sx={{ width: { xs: "100%", md: "30%" } }}
      >
        <MenuItem value={0}>All Ratings</MenuItem>
        <MenuItem value={null}>No rating</MenuItem>
        <MenuItem value={1}>1 Star</MenuItem>
        <MenuItem value={2}>2 Stars</MenuItem>
        <MenuItem value={3}>3 Stars</MenuItem>
        <MenuItem value={4}>4 Stars</MenuItem>
        <MenuItem value={5}>5 Stars</MenuItem>
      </Select>
    </Box>
  );
}
