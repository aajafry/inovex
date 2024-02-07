import { Box, Divider, Stack, Typography } from "@mui/material";
import { MuiColorInput } from 'mui-color-input';
import { useDispatch, useSelector } from "react-redux";
import {
  setPraimaryColor,
  setSecondaryColor,
  setTextColor,
} from "../../features/theme/themeSlice";

export default function Theme() {
  const dispatch = useDispatch();
  // redux theme data check.
  const primaryColor = useSelector((state) => state.theme.praimaryColor);
  const secondaryColor = useSelector((state) => state.theme.secondaryColor);
  const textColor = useSelector((state) => state.theme.textColor);

  return (
    <Box>
      <Stack spacing={2} divider={<Divider orientation="horizontal" />}>
        <Box className="flex justify-between items-center">
          <Box>
            <Typography variant="h6" color={primaryColor}>
              Primary Color
            </Typography>
            <Typography variant="body2">
              The Primary Color will apply to button and link.
            </Typography>
          </Box>
          <Box>
            <MuiColorInput
              value={primaryColor}
              onChange={(event) => dispatch(setPraimaryColor(event))}
              deferred
            />
          </Box>
        </Box>

        <Box className=" flex justify-between items-center">
          <Box>
            <Typography variant="h6" color={secondaryColor}>
            Secondary Color
            </Typography>
            <Typography variant="body2">
            The Secondary Color will apply to the Menu, Sidebar & highlighted positions background.            </Typography>
          </Box>
          <Box>
            <MuiColorInput
              value={secondaryColor}
              onChange={(event) => dispatch(setSecondaryColor(event))}
              deferred
            />
          </Box>
        </Box>

        <Box className=" flex justify-between items-center">
          <Box>
            <Typography variant="h6" color={textColor}>
              Text Color
            </Typography>
            <Typography variant="body2">
              The Text Color will apply to the Secondary Text Color.
            </Typography>
          </Box>
          <Box>
            <MuiColorInput
              value={textColor}
              onChange={(event) => dispatch(setTextColor(event))}
              deferred
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
