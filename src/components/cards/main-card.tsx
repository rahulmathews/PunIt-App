import PropTypes, { InferProps } from "prop-types";
import { forwardRef } from "react";

// material-ui
import { alpha, useTheme } from "@mui/material/styles";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";

// header style
const headerSX = {
  p: 2.5,
  "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" },
};

const MainCard = forwardRef<typeof Card, IMainCard>(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentSX = {},
      darkTitle,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      codeHighlight,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();
    boxShadow = theme.palette.mode === "dark" ? boxShadow || true : boxShadow;

    return (
      <Card
        elevation={elevation || 0}
        // ref={ref}
        {...others}
        sx={{
          border: border ? "1px solid" : "none",
          borderRadius: 2,
          borderColor: theme.palette.grey.A700,
          boxShadow: `0px 4px 8px ${alpha(theme.palette.grey[900], 0.15)}`,
          ":hover": {
            boxShadow: "0px 6px 12px 4px rgb(33 33 33 / 38%)",
          },
          "& pre": {
            m: 0,
            p: "16px !important",
            fontFamily: theme.typography.fontFamily,
            fontSize: "0.75rem",
          },
          ...sx,
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={headerSX}
            titleTypographyProps={{ variant: "subtitle1" }}
            title={title}
            action={secondary}
          />
        )}

        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}

        {/* card footer - clipboard & highlighter  */}
        {codeHighlight && (
          <>
            <Divider sx={{ borderStyle: "dashed" }} />
            {/* <Highlighter codeHighlight={codeHighlight} main> */}
            {children}
            {/* </Highlighter> */}
          </>
        )}
      </Card>
    );
  }
);

type IMainCard = InferProps<typeof propTypes>;

const propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  divider: PropTypes.bool,
  elevation: PropTypes.number,
  secondary: PropTypes.node,
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  codeHighlight: PropTypes.bool,
  content: PropTypes.bool,
  children: PropTypes.node,
};

MainCard.propTypes = propTypes;
MainCard.displayName = "MainCard";

export default MainCard;
