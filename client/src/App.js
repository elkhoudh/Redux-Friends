import React, { Component } from "react";
import Friend from "./components/Friend";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import NavBar from "./components/NavBar";
import Form from "./components/Form";
import Snack from "./components/Snack";
import { connect } from "react-redux";
import {
  getFriends,
  handleChange,
  handleSliderValue,
  addFriend,
  handleClose,
  handleDelete,
  handleUpdate,
  submitUpdate
} from "./store/actions/index";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class App extends Component {
  componentWillMount = () => {
    this.props.getFriends();
  };

  render() {
    const {
      classes,
      name,
      age,
      email,
      updating,
      handleChange,
      handleSliderValue,
      sliderValue,
      open,
      message,
      variant,
      handleUpdate,
      submitUpdate,
      updatingId
    } = this.props;

    return (
      <>
        <NavBar />
        <Snack
          open={open}
          handleClose={this.props.handleClose}
          message={message}
          variant={variant}
        />
        <Form
          handleSliderChange={handleSliderValue}
          sliderValue={sliderValue}
          addFriend={this.props.addFriend}
          handleChange={handleChange}
          name={name}
          email={email}
          age={age}
          updating={updating}
          submitUpdate={submitUpdate}
          updatingId={updatingId}
        />
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid
              container
              className={classes.demo}
              justify="center"
              spacing={16}
            >
              {this.props.friends.map(friend => (
                <Friend
                  handleUpdate={handleUpdate}
                  handleDelete={this.props.handleDelete}
                  key={friend.id}
                  friend={friend}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  friends: state.friends,
  name: state.name,
  age: state.age,
  email: state.email,
  error: state.error,
  updating: state.updating,
  sliderValue: state.sliderValue,
  open: state.open,
  variant: state.variant,
  message: state.message,
  updatingId: state.updatingId
});

export default connect(
  mapStateToProps,
  {
    getFriends,
    handleChange,
    handleDelete,
    handleClose,
    handleSliderValue,
    addFriend,
    handleUpdate,
    submitUpdate
  }
)(withStyles(styles)(App));
