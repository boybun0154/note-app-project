import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Column from "./Column/Column";
import QueueIcon from "@mui/icons-material/Queue";

function ListColumns({ columns }) {
  return (
    <Box
      sx={{
        bgcolor: "inherit",
        width: "100%",
        height: "100%",
        display: "flex",
        overflowX: "auto",
        "&::-webkit-scrollbar-track": {
          m: 2,
        },
      }}
    >
      {columns?.map((column) => (
        <Column key={column._id} column={column} />
      ))}

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
