import React, { useState } from "react";

// material-ui
import {
  Alert,
  Box,
  Button,
  Grid,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";

import NewsFeed from "@punit-app/components/news-feed/news-feed";

import MainLayout from "@punit-app/layout/main-layout";
import { useSelector } from "react-redux";

// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// import { Spin } from 'antd';
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// const QuillNoSSRWrapper = dynamic(import("react-quill"), {
//   ssr: false,
//   loading: () => null,
// });

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",
  transform: "none",
};

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

// sales report status
const status = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "year",
    label: "This Year",
  },
];

const jokes = [
  {
    text: "haha, this is by far the best joke",
    type: "text",
    upvotes: 1203,
    downvotes: 20,
    reports: 5,
    rating: 3.5,
  },
  {
    text: "haha, Second Joke",
    type: "text",
    upvotes: 1003,
    downvotes: 30,
    reports: 7,
    rating: 3.9,
  },
  {
    text: "haha, Third Joke",
    type: "text",
    upvotes: 1445,
    downvotes: 22,
    reports: 14,
    rating: 3.2,
  },
  {
    text: "just, kidding",
    type: "text",
    upvotes: 1948,
    downvotes: 29,
    reports: 21,
    rating: 4.3,
  },
  {
    text: "fake laugh",
    type: "text",
    upvotes: 22019,
    downvotes: 120,
    reports: 34,
    rating: 4.1,
  },
  {
    text: "Leo meme",
    type: "text",
    upvotes: 23409,
    downvotes: 12,
    reports: 19,
    rating: 4.5,
  },
  {
    text: "Another Meme",
    type: "text",
    upvotes: 1902,
    downvotes: 28,
    reports: 3,
    rating: 3.1,
  },
  {
    text: "Another Fake meme",
    type: "text",
    upvotes: 12023,
    downvotes: 222,
    reports: 19,
    rating: 3.6,
  },
  {
    text: "Not so good meme",
    type: "text",
    upvotes: 12030,
    downvotes: 593,
    reports: 55,
    rating: 2.5,
  },
];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 550,
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "success") {
      setSuccess(false);
    } else {
      setError(false);
    }
  };
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const router = useRouter();

  const { drawerOpen } = useSelector((state: any) => state.menu);

  const [value, setValue] = useState("");

  const queryUrl = `https://e82p72f2bh.execute-api.us-east-1.amazonaws.com/Dev/api/jokes`;

  const handleSubmit = async () => {
    const reqBody = {};
    const data: any = await fetch(queryUrl, {
      method: "POST",
      body: JSON.stringify({
        content: value,
      }),
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*",
        authorization: localStorage.getItem("access_token") as any,
      },
    })
      .then((response) => response.json())
      .catch((err) => setError(true));

    if (data) {
      router.push("/home");
      setSuccess(true);
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={success}
        autoHideDuration={8000}
        onClose={(e) => handleClose(e, "success")}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Successfully Submitted the joke
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={error}
        autoHideDuration={8000}
        onClose={(e) => handleClose(e, "error")}
      >
        <Alert
          onClose={(e) => handleClose(e, "error")}
          severity="error"
          sx={{ width: "100%" }}
        >
          Internal Server Error
        </Alert>
      </Snackbar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <QuillNoSSRWrapper
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
          /> */}

          <Button
            disableElevation
            sx={{ mt: 3 }}
            size="small"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>
      <MainLayout />
      <Grid
        container
        rowSpacing={4.5}
        columnSpacing={2.75}
        sx={
          drawerOpen ? { ml: "260px", width: "80%" } : { ml: 0, width: "100%" }
        }
      >
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Home</Typography>
          <Button
            disableElevation
            size="small"
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{ float: "right" }}
          >
            Add new Joke
          </Button>
        </Grid>
        <Grid xs={12} sx={{ mb: -2.25 }}>
          <NewsFeed content={"Haha nice joke"} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
