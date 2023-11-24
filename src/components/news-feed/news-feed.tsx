import React, { useState } from "react";
import {
  Button,
  IconButton,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
} from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import NewsFeedItem from "./news-feed-item";

const NewsFeed = ({ content, upvotes, downvotes, reports, rate }: any) => {
  const [votes, setVotes] = useState(0);
  const [rating, setRating] = useState(0);
  const [isReported, setReported] = useState(false);

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      sx={{ marginLeft: "20px", marginTop: "30px", marginRight: "20px" }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => {
        return <NewsFeedItem key={id} />;
      })}
    </Grid>
  );
};

export default NewsFeed;
