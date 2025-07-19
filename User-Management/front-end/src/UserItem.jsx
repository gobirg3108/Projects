import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

function UserItem({ user, onEdit, onDelete }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "linear-gradient(90deg, #6366f1 0%, #10b981 100%)",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: "#6366f1",
              mr: 2,
              width: 56,
              height: 56,
              fontSize: 24,
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6" component="div">
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            size="small"
            onClick={() => onEdit(user)}
            sx={{ color: "#6366f1" }}
          >
            Edit
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button size="small" color="error" onClick={() => onDelete(user._id)}>
            Delete
          </Button>
        </motion.div>
      </CardActions>
    </Card>
  );
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserItem;
