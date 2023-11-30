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
  Snackbar,
  Alert,
  ClickAwayListener,
} from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

import "react-quill/dist/quill.snow.css";

// import { Spin } from 'antd';
import dynamic from "next/dynamic";
import axios from "axios";

import { useRouter } from "next/navigation";
import _ from "lodash";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => null,
});

const NewsFeedItem = ({ joke, fetchJokes }: any) => {
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [reports, setReports] = useState(0);

  const [success, setSuccess] = React.useState<any>(null);
  const [reportSuccess, setReportSuccess] = React.useState<any>(false);

  const [rating, setRating] = useState(0);
  const [isReported, setIsReported] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [reportMessage, setReportMessage] = React.useState("");

  const handleClick = () => {
    setOpen((prev) => {
      if (prev === true) {
        fetchJokes();
      }
      return !prev;
    });

    setReportSuccess((prev: any) => {
      if (prev === true) {
        return false;
      }
    });
  };

  const router = useRouter();

  const handleClose = (event: React.SyntheticEvent | Event) => {
    setSuccess({ open: false });
  };

  const handleReport = () => {
    if (!isReported) {
      setReportSuccess((prev: any) => {
        return !prev;
      });
    }
  };

  const handleUpvote = async (jokeId: string) => {
    if (!isUpvoted) {
      setIsUpvoted(true);
      await submitUpvote(jokeId);
    }
  };

  const handleDownvote = async (jokeId: string) => {
    if (!isDownvoted) {
      setIsDownvoted(true);
      await submitDownvote(jokeId);
    }
  };

  const submitReport = async (jokeId: string) => {
    if (!isReported) {
      handleReport();
      await submitReportAPI(jokeId, reportMessage);
      handleClick();
      setIsReported(true);
    }
  };

  const handleOpen = (jokeId: string) => {
    setOpen(true);
    handleView(jokeId);
    fetchUpvote(jokeId);
    fetchDownvote(jokeId);
    fetchReport(jokeId);
  };

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

  const modules = {
    toolbar: [[]],
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

  const reportModules = {
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

  const reportFormats = [
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

  const token =
    typeof window !== "undefined"
      ? window?.localStorage?.getItem("access_token")
      : "";

  const handleView = async (jokeId: string) => {
    const queryUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/api/views`;

    const data = await axios
      .post(
        queryUrl,
        {
          jokeId: jokeId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
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
  };

  const fetchUpvote = async (jokeId: string) => {
    const queryUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/api/upvotes/${jokeId}`;

    const data = await axios
      .get(queryUrl, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (!_.isEmpty(response.data)) {
          setIsUpvoted(true);
        }
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
  };

  const submitUpvote = async (jokeId: string) => {
    const queryUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/api/upvotes`;

    const data = await axios
      .post(
        queryUrl,
        {
          jokeId: jokeId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
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
  };

  const fetchDownvote = async (jokeId: string) => {
    const queryUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/api/downvotes/${jokeId}`;

    const data = await axios
      .get(queryUrl, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (!_.isEmpty(response.data)) {
          setIsDownvoted(true);
        }
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
  };

  const submitDownvote = async (jokeId: string) => {
    const queryUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/api/downvotes`;

    const data = await axios
      .post(
        queryUrl,
        {
          jokeId: jokeId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
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
  };

  const fetchReport = async (jokeId: string) => {
    const queryUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/api/reports/${jokeId}`;

    const data = await axios
      .get(queryUrl, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (!_.isEmpty(response.data)) {
          setIsReported(true);
        }
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
  };

  const submitReportAPI = async (jokeId: string, reportMessage: string) => {
    const queryUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/api/reports`;

    const data = await axios
      .post(
        queryUrl,
        {
          jokeId: jokeId,
          message: reportMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
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
  };

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
      <Grid
        item
        xs={4}
        sx={{ marginBottom: "10px" }}
        onClick={() => handleOpen(joke.id)}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={joke.s3Url}
            title="joke image"
          />
          <CardContent>
            <QuillNoSSRWrapper
              theme="snow"
              value={joke.content}
              modules={modules}
              formats={formats}
              readOnly
            />
          </CardContent>
          <CardActions>
            <Grid container direction="row" justifyContent="space-evenly">
              <Grid item xs={4}>
                <ArrowCircleUpIcon color="success" />
                {joke.upvotes}
              </Grid>
              <Grid item xs={4}>
                <ArrowCircleDownIcon color="error" />
                {joke.downvotes}
              </Grid>
              <Grid item xs={4}>
                <ReportGmailerrorredIcon color="warning" />
                {joke.reports}
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
      <Modal
        open={open}
        onClose={handleClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <ClickAwayListener onClickAway={handleClick}> */}
        <Box sx={style}>
          <CardMedia
            sx={{ height: 250 }}
            image={joke.s3Url}
            title="joke image"
          />
          <CardContent>
            <QuillNoSSRWrapper
              theme="snow"
              value={joke.content}
              modules={modules}
              formats={formats}
              readOnly
            />
          </CardContent>
          <CardActions>
            <Grid container direction="row">
              <Grid item xs={3} sx={{ mr: "20px" }}>
                <Button
                  variant={isUpvoted ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => handleUpvote(joke.id)}
                  size="small"
                >
                  {isUpvoted ? "Upvoted" : "Upvote"}
                </Button>
              </Grid>
              <Grid item xs={3} sx={{ mr: "20px" }}>
                <Button
                  variant={isDownvoted ? "contained" : "outlined"}
                  color="error"
                  onClick={() => handleDownvote(joke.id)}
                  size="small"
                >
                  {isDownvoted ? "Downvoted" : "Downvote"}
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant={isReported ? "contained" : "outlined"}
                  color="warning"
                  onClick={handleReport}
                  size="small"
                >
                  {isReported ? "Reported" : "Report"}
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Box>
        {/* </ClickAwayListener> */}
      </Modal>
      <Modal
        open={reportSuccess}
        onClose={handleReport}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <ClickAwayListener onClickAway={handleReport}> */}
        <Box sx={style}>
          <Grid container direction="column">
            <Grid item xs={12}>
              <QuillNoSSRWrapper
                theme="snow"
                value={reportMessage}
                modules={reportModules}
                formats={reportFormats}
                onChange={setReportMessage}
              />
              <Button
                sx={{ mt: 5 }}
                variant={isReported ? "contained" : "outlined"}
                color="warning"
                onClick={() => submitReport(joke.id)}
                size="small"
              >
                Report
              </Button>
            </Grid>
          </Grid>
        </Box>
        {/* </ClickAwayListener> */}
      </Modal>
    </>
  );
};

export default NewsFeedItem;
