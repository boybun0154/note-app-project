import { useState } from "react";
import Box from "@mui/material/Box";
import ModeSelect from "~/components/ModeSelect/ModeSelect";
import { ReactComponent as TrelloIcon } from "~/assets/trello.svg";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import Workspaces from "./Menus/Workspaces";
import Recent from "./Menus/Recent";
import Starred from "./Menus/Starred";
import Templates from "./Menus/Templates";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Profiles from "./Menus/Profiles";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SwipeableTemporaryDrawer from "../Drawer/Drawer";
import Create from "./Menus/Create";

function Appbar({ boardByUserId }) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        paddingX: 2,
        overflowX: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2c3e50" : "#fffff",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "hsla(218,54%,19.6%,0.16)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <SwipeableTemporaryDrawer boardByUserId={boardByUserId} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            fontSize="small"
            inheritViewBox
            sx={{ color: "black" }}
          />
          <Typography
            variant="span"
            sx={{ fontSize: "1.2rem", fontWeight: "bold", color: "black" }}
          >
            Trolle
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Create />
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          id="outlined-search"
          label="Search field"
          type="text"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "black" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CloseIcon
                  fontSize="small"
                  sx={{
                    color: "black",
                    cursor: "pointer",
                    display: searchValue ? "block" : "none",
                  }}
                  onClick={() => setSearchValue("")}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: "120px",
            maxWidth: "180px",
            "& label": { color: "black" },
            "& input": { color: "black" },
            "& label.Mui-focused": { color: "black" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "black" },
              "&:hover fieldset": { borderColor: "black" },
              "&.Mui-focused fieldset": { borderColor: "black" },
            },
          }}
        />
        <ModeSelect />

        <Tooltip title="Notifications">
          <Badge color="warning" variant="dot" sx={{ cursor: "pointer" }}>
            <NotificationsNoneIcon sx={{ color: "black" }} />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: "pointer", color: "black" }} />
        </Tooltip>

        <Profiles />
      </Box>
    </Box>
  );
}

export default Appbar;
