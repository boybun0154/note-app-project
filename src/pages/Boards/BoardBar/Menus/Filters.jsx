import React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import FilterListIcon from "@mui/icons-material/FilterList";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography } from "@mui/material";

export default function Filters({ board }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [state, setState] = React.useState({
    johndoe: false,
    janedoe: false,
    brucewayne: false,
    clarkkent: false,
  });
  const { johndoe, janedoe, brucewayne, clarkkent } = state;

  const findColumnByMemberId = (memberId) => {
    return board.lists.filter((list) =>
      list?.cards?.map((c) => c._id)?.memberIds.includes(memberId)
    );
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box>
      <Chip
        sx={{
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
        }}
        icon={<FilterListIcon />}
        label="Filters"
        id="basic-button-filter"
        aria-controls={open ? "basic-menu-filter" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      {/* <Button
        sx={{ color: 'white' }}
        id="basic-button-filter"
        aria-controls={open ? 'basic-menu-filter' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        Filter
      </Button> */}
      <Menu
        id="basic-menu-filter"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button-filter",
        }}
      >
        <MenuItem
          sx={{ py: "4px", "&:hover": { bgcolor: "transparent" } }}
          divider
          disableRipple
        >
          <Typography
            sx={{ fontWeight: 500 }}
            variant="body2"
            color="text.secondary"
          >
            Members
          </Typography>
        </MenuItem>
        <MenuItem sx={{ py: "4px" }} disableRipple>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={johndoe}
                onChange={handleChange}
                name="johndoe"
              />
            }
            label="John Doe"
          />
        </MenuItem>
        <MenuItem sx={{ py: "4px" }} disableRipple>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={janedoe}
                onChange={handleChange}
                name="janedoe"
              />
            }
            label="Jane Doe"
          />
        </MenuItem>
        <MenuItem sx={{ py: "4px" }} disableRipple>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={brucewayne}
                onChange={handleChange}
                name="brucewayne"
              />
            }
            label="Bruce Wayne"
          />
        </MenuItem>
        <MenuItem sx={{ py: "4px" }} disableRipple>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={clarkkent}
                onChange={handleChange}
                name="clarkkent"
              />
            }
            label="Clark Kent"
          />
        </MenuItem>
      </Menu>
    </Box>
  );
}
