import PropTypes, { InferProps } from "prop-types";

// material-ui
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";

// project import
import MainCard from "@punit-app/components/cards/main-card";

// assets
import { RiseOutlined, FallOutlined } from "@ant-design/icons";

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({
  color,
  title,
  count,
  percentage,
  isLoss,
  extra,
}: IAnalytics) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <Stack spacing={0.5}>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h4" color="inherit">
            {count}
          </Typography>
        </Grid>
        {percentage && (
          <Grid item>
            <Chip
              variant="outlined"
              color={color}
              icon={
                <>
                  {!isLoss && (
                    <RiseOutlined
                      style={{ fontSize: "0.75rem", color: "inherit" }}
                    />
                  )}
                  {isLoss && (
                    <FallOutlined
                      style={{ fontSize: "0.75rem", color: "inherit" }}
                    />
                  )}
                </>
              }
              label={`${percentage}%`}
              sx={{ ml: 1.25, pl: 1 }}
              size="small"
            />
          </Grid>
        )}
      </Grid>
    </Stack>
    <Box sx={{ pt: 2.25 }}>
      <Typography variant="caption" color="textSecondary">
        Total count up by{" "}
        <Typography
          component="span"
          variant="caption"
          sx={{ color: `${color || "primary"}.main` }}
        >
          {extra}
        </Typography>{" "}
        this year
      </Typography>
    </Box>
  </MainCard>
);

type IAnalytics = InferProps<typeof propTypes>;

const propTypes = {
  color: PropTypes.string as unknown as "warning" | "error" | "info",
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

AnalyticEcommerce.propTypes = propTypes;

AnalyticEcommerce.defaultProps = {
  color: "primary",
};

export default AnalyticEcommerce;
