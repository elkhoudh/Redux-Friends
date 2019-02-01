import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit
  }
});

const Friend = props => {
  const { classes, friend, handleDelete, handleUpdate } = props;
  return (
    <Chip
      onClick={() =>
        handleUpdate(
          friend.id,
          friend.email,
          friend.age,
          friend.name,
          friend.like
        )
      }
      icon={<FaceIcon />}
      label={`${friend.name} ${friend.age} ${friend.email} ${friend.like}`}
      onDelete={() => handleDelete(friend.id)}
      className={classes.chip}
      color="primary"
    />
  );
};

export default withStyles(styles)(Friend);
