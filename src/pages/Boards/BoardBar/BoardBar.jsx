/* eslint-disable react/no-unescaped-entities */
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { capitalizeFirstLetter } from "~/utils/formatters";
import Filters from "./Menus/Filters";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { cloneDeep } from "lodash";
import { updateBoard } from "~/apis";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

const MENU_STYLES = {
  color: "black",
  bgcolor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  ".MuiSvgIcon-root": {
    color: "black",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

function BoardBar({ board, setBoard }) {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  const deleteBoard = () => {
    const destroyColumn = {
      _destroy: "true",
    };

    updateBoard(board._id, destroyColumn).then(() => {
      navigate(`/boards/654f462cbae839768f802f92`);
    });
  };

  function openDeleteColumnDialog() {
    setOpenDialog(true);
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        paddingX: 2,
        overflowX: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#fffff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip
            sx={MENU_STYLES}
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          />
        </Tooltip>
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Filters board={board} setBoard={setBoard} />
        <Button
          variant="outlined"
          startIcon={<DeleteForeverIcon fontSize="small" />}
          onClick={openDeleteColumnDialog}
          sx={{
            color: "black",
            borderColor: "black",
            "&:hover": { borderColor: "black" },
          }}
        >
          Delete
        </Button>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: "black",
            borderColor: "black",
            "&:hover": { borderColor: "black" },
          }}
        >
          Invite
        </Button>

        <AvatarGroup
          max={7}
          sx={{
            gap: "10px",
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: 16,
              border: "none",
              color: "black",
              cursor: "pointer",
              "&:first-of-type": { bgcolor: "white" },
            },
          }}
        >
          <Tooltip title="Member">
            <Avatar
              alt="Member"
              src="https://mui.com/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title="Member">
            <Avatar
              alt="Member"
              src="https://mui.com/static/images/avatar/2.jpg"
            />
          </Tooltip>
          <Tooltip title="Member">
            <Avatar
              alt="Member"
              src="https://mui.com/static/images/avatar/3.jpg"
            />
          </Tooltip>
          <Tooltip title="Member">
            <Avatar
              alt="Member"
              src="https://mui.com/static/images/avatar/4.jpg"
            />
          </Tooltip>
          <Tooltip title="Member">
            <Avatar
              alt="Member"
              src="https://mui.com/static/images/avatar/5.jpg"
            />
          </Tooltip>
          <Tooltip title="Member">
            <Avatar
              alt="Member"
              src="https://mui.com/static/images/avatar/6.jpg"
            />
          </Tooltip>
          <Tooltip title="Member">
            <Avatar
              alt="Member"
              src="https://mui.com/static/images/avatar/7.jpg"
            />
          </Tooltip>
          <Tooltip title="Member">
            <Avatar
              alt="Member"
              src="https://mui.com/static/images/avatar/1.jpg"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          Are you sure you want to delete board "{board.title}"?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting this column will remove all associated cards. This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteBoard();
              handleCloseDialog();
            }}
            color="primary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BoardBar;
