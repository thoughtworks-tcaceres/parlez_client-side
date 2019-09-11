import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { socket } from "../../../server_api";
import { FriendContext, ChatViewContext } from "../../../Context";
import "./CreateChat.scss";
import FriendList from "../../ContactList/FriendList";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  }
}));

const SingleFriendList = props => {
  const classes = useStyles();

  const { friendState } = useContext(FriendContext);
  const { masterState, dispatch } = useContext(ChatViewContext);

  const handleSubmit = (friend_id, friend_username, friend_avatar) => {
    socket.emit("create single chat", {
      type: "single",
      name: friend_username,
      creatorUserId: masterState.userId,
      usersArr: [friend_id, masterState.userId],
      avatar: friend_avatar
    });
  };

  const friend = friendState.friends.map(friend => {
    return (
      <li onClick={() => handleSubmit(friend.id, friend.username, friend.avatar)}>
        <img src={friend.avatar}></img>
        {friend.username}
      </li>
    );
  });

  return (
    <div className="addContainer">
      <ul> {friend} </ul>
    </div>
  );
};

export default SingleFriendList;
