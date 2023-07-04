import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import SchoolIcon from '@mui/icons-material/School';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PersonIcon from '@mui/icons-material/Person';
import { blue  } from "@mui/material/colors";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.blueAccent[800]}
          display="flex"
          flexDirection="column"
          padding="15px"
        >
          <SchoolIcon style={{ color: blue[500] }} />
          <p>Students</p>
          <h1 style={{ textAlign: 'right' }}>243</h1>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.orange[100]}
          display="flex"
          flexDirection="column"
          padding="15px"
        >
      <BookmarkIcon style={{ color: "#FFC0CB" }} />
      <p>Course</p>
      <h1 style={{ textAlign: 'right' }}>13</h1>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.orange[100]}
          display="flex"
          flexDirection="column"
          padding="15px"
        >
      <LocalAtmIcon style={{ color: "#FFD700" }}/>
      <p>Payments</p>
      <h1 style={{ textAlign: 'right' }}>556,000₺</h1>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.orange[500]}
          display="flex"
          flexDirection="column"
          padding="15px"
        >
        <PersonIcon style={{ color: "#FFFFFF" }}/>
        <p>Users</p>
        <h1 style={{ textAlign: 'right' }}>3</h1>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;