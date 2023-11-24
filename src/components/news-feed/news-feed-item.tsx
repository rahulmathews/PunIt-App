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
  Modal,
} from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

const NewsFeedItem = ({ content, upvotes, downvotes, reports, rate }: any) => {
  const [votes, setVotes] = useState(0);
  const [rating, setRating] = useState(0);
  const [isReported, setReported] = useState(false);

  const handleUpvote = () => {
    setVotes(votes + 1);
    setRating(rating + 1);
  };

  const handleDownvote = () => {
    setVotes(votes - 1);
    setRating(rating - 1);
  };

  const handleReport = () => {
    setReported(true);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Grid item xs={4} sx={{ marginBottom: "10px" }} onClick={handleOpen}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Grid container direction="row" justifyContent="space-evenly">
              <Grid item xs={4}>
                <ArrowCircleUpIcon color="success" />
              </Grid>
              <Grid item xs={4}>
                <ArrowCircleDownIcon color="error" />
              </Grid>
              <Grid item xs={4}>
                <ReportGmailerrorredIcon color="warning" />
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default NewsFeedItem;
