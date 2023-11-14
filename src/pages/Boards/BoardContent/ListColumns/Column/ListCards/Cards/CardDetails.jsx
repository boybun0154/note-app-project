import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  ClickAwayListener,
  Icon,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import Popper from "@mui/material/Popper";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import DescriptionIcon from "@mui/icons-material/Description";
import SubjectIcon from "@mui/icons-material/Subject";
import PersonIcon from "@mui/icons-material/Person";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import TodayIcon from "@mui/icons-material/Today";
import PanoramaIcon from "@mui/icons-material/Panorama";
function CardDetails({ isOpen, onClose, card }) {
  console.log("member", card.memberIds);
  return (
    <ClickAwayListener onClickAway={onClose}>
      <Popper open={isOpen}>
        <Box
          sx={{
            width: "600px",
            height: "600px",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
            borderRadius: "8px",
            display: "flex",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box>
            {/* Card Details header */}
            <Box
              sx={{
                display: "flex",
                height: "100px",
                mt: 2,
                ml: 2,
              }}
            >
              <SubtitlesIcon sx={{ mr: 1 }} />
              <Box>
                {card.title}
                <Typography variant="body2" color="textSecondary">
                  Created at: {new Date(card.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            {/* Card Main Details */}
            <Box>
              {/* Description */}
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <DescriptionIcon sx={{ ml: 2, mr: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "350px",
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    Description
                  </Typography>
                  <TextField fullWidth label="More Details" id="fullWidth" />
                </Box>
              </Box>
              {/* Activity */}
              <Box sx={{ display: "flex", flexDirection: "row", mt: 10 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <SubjectIcon sx={{ ml: 2, mr: 1, mb: 1 }} />
                  <Avatar
                    sx={{ width: 30, height: 30, ml: 2, mr: 1, mt: 1 }}
                    alt="Avatar"
                    src="https://mui.com/static/images/avatar/1.jpg"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "350px",
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    Activity
                  </Typography>
                  <TextField
                    fullWidth
                    label="Write Comment"
                    id="fullWidth"
                    sx={{ mt: 1 }}
                  />
                  <Box sx={{ mt: 2, ml: 2 }}>
                    {card.comments.map((comment) => (
                      <Box key={comment.createdAt} sx={{ mb: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            fontWeight="bold"
                            sx={{ mr: "10px" }}
                          >
                            @{comment.userId}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="textSecondary">
                          {comment.content}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Stack direction="column" spacing={2} marginTop={10} marginLeft={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Tooltip title={`${card.memberIds.length} members`}>
                <Chip
                  icon={<PersonIcon />}
                  clickable
                  sx={{
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
                    mr: 1, // Margin right to create space between Chip and Typography
                  }}
                />
              </Tooltip>
              <Typography>Member</Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                fontWeight="bold"
                sx={{ mr: "10px" }}
              ></Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Chip
                icon={<LocalOfferIcon />}
                clickable
                sx={{
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
                  mr: 1,
                }}
              />
              <Typography> Tag</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Chip
                icon={<AssignmentTurnedInIcon />}
                clickable
                sx={{
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
                  mr: 1,
                }}
              />
              <Typography>To do</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Chip
                icon={<TodayIcon />}
                clickable
                sx={{
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
                  mr: 1,
                }}
              />
              <Typography>Date</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Chip
                icon={<PanoramaIcon />}
                clickable
                sx={{
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
                  mr: 1,
                }}
              />
              <Typography>Cover</Typography>
            </Box>
          </Stack>
        </Box>
      </Popper>
    </ClickAwayListener>
  );
}

export default CardDetails;
