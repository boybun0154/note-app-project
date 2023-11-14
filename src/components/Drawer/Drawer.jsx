import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppsIcon from "@mui/icons-material/Apps";
import PersonIcon from "@mui/icons-material/Person";
import { ReactComponent as TrelloIcon } from "~/assets/trello.svg";
import { Chip, SvgIcon, Tooltip } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

export default function SwipeableTemporaryDrawer({ boardByUserId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const navigateToBoard = (boardId) => {
    navigate(`/boards/${boardId}`);
    console.log("boardByUserId", { boardByUserId });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Boards", "Members", "Settings"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <SvgIcon component={TrelloIcon} />}
                {index === 1 && <PersonIcon />}
                {index === 2 && <SettingsIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <h4
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: "20px",
        }}
      >
        Your boards
      </h4>
      {Array.isArray(boardByUserId) && boardByUserId.length > 0 ? (
        boardByUserId.map(
          (board) =>
            (
              /* eslint-disable */
              console.log("board_.id", board._id),
              (
                <Chip
                  key={board._id}
                  icon={<DashboardIcon />}
                  label={board.title}
                  onClick={() => navigateToBoard(board._id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "80%",
                    ml: 2,
                    m: 2,
                  }}
                />
              )
            )
        )
      ) : (
        <p>No boards available</p>
      )}
    </Box>
  );
  return (
    <Box>
      {["left"].map((anchor) => (
        <Box key={anchor}>
          <AppsIcon
            onClick={toggleDrawer(anchor, true)}
            sx={{
              color: "black",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {anchor}
          </AppsIcon>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </Box>
      ))}
    </Box>
  );
}
