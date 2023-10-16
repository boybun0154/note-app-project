import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Column from "./Column/Column";
import QueueIcon from "@mui/icons-material/Queue";
function ListColumns() {
  return (
    <Box
      sx={{
        bgcolor: "inherit",
        width: "100%",
        height: "100%",
        m: "0 5px",
        p: "0 5px",
        display: "flex",
        overflowX: "auto",
        overflowY: "hidden",
        "&::-webkit-scrollbar-track": {
          m: 2,
        },
      }}
    >
      <Column />
      <Column />
      <Box
        sx={{
          minWidth: "200px",
          maxWidth: "200px",
          mx: 2,
          borderRadius: "6px",
          height: "fit-content",
          bgcolor: "#ffffff3d",
        }}
      >

        {/* Add New Column */}
        <Button
          startIcon={<QueueIcon />}
          sx={{
            color: "white",
            width: "100%",
            justifyContent: "flex-start",
            pl: 2.5,
            py: 1,
          }}
        >
          Add New Column
        </Button>
      </Box>
    </Box>
  );
}

export default ListColumns;
