import React, { useEffect, useState } from "react";

// material-ui
import {
  Alert,
  Box,
  Button,
  ClickAwayListener,
  Grid,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";

import NewsFeed from "@punit-app/components/news-feed/news-feed";

import MainLayout from "@punit-app/layout/main-layout";
import { useSelector } from "react-redux";

import "react-quill/dist/quill.snow.css";

// import { Spin } from 'antd';
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import Image from "next/image";
import axios from "axios";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => null,
});

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
    ["link"],
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
  const handleClose = (event: React.SyntheticEvent | Event) => {
    setSuccess({ open: false });
  };

  const [success, setSuccess] = React.useState<any>(null);

  const [image, setImage] = React.useState("");
  const [jokes, setJokes] = React.useState(null);

  const handleClick = () => {
    setOpen((prev) => !prev);
    setValue("");
    setImage("");
  };

  const router = useRouter();

  const { drawerOpen } = useSelector((state: any) => state.menu);

  const [value, setValue] = useState("");

  const token =
    typeof window !== "undefined"
      ? window?.localStorage?.getItem("access_token")
      : "";

  const userStatus =
    typeof window !== "undefined"
      ? window?.localStorage?.getItem("status")
      : "";

  const handleSubmit = async () => {
    const queryUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/api/jokes`;

    var formData = new FormData();
    image && formData.append("file", image);
    formData.append("content", value);

    handleClick();

    const data = await axios
      .post(queryUrl, formData, {
        headers: {
          "Content-Type": "multipart/formdata",
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((err) => {
        if (err.response.status === 401) {
          setSuccess({
            open: true,
            success: false,
            message: "Session timed out",
          });
          window.localStorage.removeItem("access_token");
          router.push("/auth");
          return;
        }
        setSuccess({
          open: true,
          success: false,
          message: "Internal Server error",
        });
      });

    if (data) {
      router.push("/home");
      fetchJokes();
      setSuccess({
        open: true,
        success: true,
        message: "Successfully submitted the joke",
      });
    }
  };

  const fetchJokes = async () => {
    const queryUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/api/jokes`;

    const data = await axios
      .get(queryUrl, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setJokes(response.data);
        return response.data;
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setSuccess({
            open: true,
            success: false,
            message: "Session timed out",
          });
          window.localStorage.removeItem("access_token");
          router.push("/auth");
          return;
        }

        setSuccess({
          open: true,
          success: false,
          message: "Internal Server error",
        });
      });

    if (data) {
      setSuccess({
        open: true,
        success: true,
        message: "Fetched the latest Jokes",
      });
    }
  };

  const UploadAndDisplayImage = () => {
    return (
      <div>
        {image && (
          <div>
            <Image
              alt="not found"
              width={250}
              height={150}
              src={URL.createObjectURL(image as any)}
            />
            <br />
            <button onClick={() => setImage(null as any)}>Remove</button>
          </div>
        )}

        <br />
        <br />

        <input
          type="file"
          name="myImage"
          onChange={(event: any) => {
            console.log(event?.target?.files[0]);
            setImage(event.target.files[0]);
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={success?.open}
        autoHideDuration={8000}
        onClose={(e) => handleClose(e)}
      >
        <Alert
          onClose={handleClose}
          severity={success?.success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {success?.message}
        </Alert>
      </Snackbar>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ClickAwayListener onClickAway={handleClick}>
          <Box sx={style}>
            <UploadAndDisplayImage />
            <QuillNoSSRWrapper
              theme="snow"
              value={value}
              onChange={setValue}
              modules={modules}
              formats={formats}
            />

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
        </ClickAwayListener>
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
            onClick={() => {
              if (userStatus === "ACTIVE") {
                handleOpen();
              }
            }}
            sx={{ float: "right" }}
          >
            Add new Joke
          </Button>
        </Grid>
        <Grid xs={12} sx={{ mb: -2.25 }}>
          <NewsFeed jokes={jokes} fetchJokes={fetchJokes} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
