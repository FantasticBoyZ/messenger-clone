import {
  CollectionsRounded,
  GifRounded,
  InfoRounded,
  LocalPhoneRounded,
  Send,
  ThumbUp,
  VideocamRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";

const useStyle = makeStyles({
  myMessage: {
    color: "#FFF",
    backgroundColor: "#0084FF",
    borderRadius: "18px",
    padding: "8px 12px",
    width: "fit-content",
    maxWidth: "30%",
    wordWrap: "break-word",
  },
  otherMessage: {
    color: "#FFF",
    backgroundColor: "#3e4042",
    borderRadius: "18px",
    padding: "8px 12px",
    width: "fit-content",
    maxWidth: "30%",
    wordWrap: "break-word",
  },
  chatRoomContainer: {
    height: "100%",
  },
  messageContainer: {
    height: "86%",
  },
  iconAction: {
    color: "#0084FF",
  },
  iconActionButton: {
    "& svg": {
      fontSize: 30,
    },
  },
});
const ChatRoom = (props) => {
  const {
    privateChats,
    setPrivateChats,
    publicChats,
    tab,
    userData,
    setUserData,
    stompClient,
  } = props;
  const classes = useStyle();
  const [isTyping, setIsTyping] = useState(false);

  const handleMessage = (event) => {
    setUserData({ ...userData, message: event.target.value });
    setIsTyping(true);
  };

  const sendMessage = (e) => {
    if (e.keyCode === 13 || e.type === "click") {
      switch (tab) {
        case "CHATROOM":
          if (stompClient) {
            let chatMessage = {
              senderName: userData.username,
              message: userData.message,
              status: "MESSAGE",
            };
            console.log(chatMessage);
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: "" });
          }
          break;

        default:
          if (stompClient) {
            let chatMessage = {
              senderName: userData.username,
              receiverName: tab,
              message: userData.message,
              status: "MESSAGE",
              seenState: 'unseen'
            };
            console.log(chatMessage);
            if (userData.username !== tab) {
              privateChats.get(tab).push(chatMessage);
              setPrivateChats(new Map(privateChats));
            }
            stompClient.send(
              "/app/private-message",
              {},
              JSON.stringify(chatMessage)
            );
            setUserData({ ...userData, message: "" });
          }
          break;
      }
      setIsTyping(false)
    }
  };

  useEffect(() => {
    console.log("stompclient", stompClient);
    console.log(privateChats);
    console.log(publicChats);
  }, [privateChats, publicChats]);
  return (
    <Stack className={classes.chatRoomContainer}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        p={1}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Badge
            color="success"
            // classes={{ badge: classes.badgeUnseen }}
            variant="dot"
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://vi.wikipedia.org/wiki/T%E1%BA%ADp_tin:Larry_Page_in_the_European_Parliament,_17.06.2009_(cropped).jpg"
              sx={{ width: 40, height: 40 }}
            />
          </Badge>
          <Stack>
            <Typography variant="span" fontSize="17px">
              <strong>{tab}</strong>
            </Typography>
            <Typography variant="body2" fontSize="13px">
              ??ang ho???t ?????ng
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="B???t ?????u g???i tho???i">
            <IconButton>
              <LocalPhoneRounded className={classes.iconAction} />
            </IconButton>
          </Tooltip>
          <Tooltip title="B???t ?????u g???i video">
            <IconButton>
              <VideocamRounded className={classes.iconAction} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Th??ng tin v??? cu???c tr?? chuy???n">
            <IconButton>
              <InfoRounded className={classes.iconAction} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Divider />
      <Stack px={1} className={classes.messageContainer}>
        {/* <Stack direction="row" justifyContent="flex-end" py={1}>
          <Typography variant="p" className={classes.myMessage}>
            B??n ???? ??ang l??m g?? th????
          </Typography>
        </Stack>
        <Typography variant="p" className={classes.otherMessage}>
          Anh h???i ai?
        </Typography>
        <Stack direction="row" justifyContent="flex-end" py={1}>
          <Typography variant="p" className={classes.myMessage}>
            Tay anh mu???n h???i tay b??n ???? ??ang l??m c??i chi chi?
          </Typography>
        </Stack>
        <Typography variant="p" className={classes.otherMessage}>
          C?? l??m g?? ????u?
        </Typography>
        <Stack direction="row" justifyContent="flex-end" py={1}>
          <Typography variant="p" className={classes.myMessage}>
            Tay b??n ????y mu???n h???i tay b??n ???? c?? r??nh l???m kh??ng?
          </Typography>
        </Stack>
        <Typography variant="p" className={classes.otherMessage}>
          Uh, tay b??n ????y r???t r??nh ch??? c?? l??m g?? c???
        </Typography>
        <Stack direction="row" justifyContent="flex-end" py={1}>
          <Typography variant="p" className={classes.myMessage}>
            V???y th?? cho tay b??n ????y c???m c??i tay b??n ???? nh??!
          </Typography>
        </Stack>
        <Typography variant="p" className={classes.otherMessage}>
          Hihi anh n??y kh??o th???t ?????y
        </Typography> */}
        {tab === "CHATROOM" && (
          <>
            {publicChats.map((chat, index) => (
              <Stack
                direction="row"
                key={index}
                justifyContent={
                  chat.senderName === userData.username ? "flex-end" : null
                }
                py={1}
              >
                <Typography
                  variant="p"
                  className={
                    chat.senderName === userData.username
                      ? classes.myMessage
                      : classes.otherMessage
                  }
                >
                  {chat.message}
                </Typography>
              </Stack>
            ))}
          </>
        )}
        {tab !== "CHATROOM" && (
          <>
            {[...privateChats.get(tab)].map((chat, index) => (
              <Stack
                direction="row"
                key={index}
                justifyContent={
                  chat.senderName === userData.username ? "flex-end" : null
                }
                py={1}
              >
                <Typography
                  variant="p"
                  className={
                    chat.senderName === userData.username
                      ? classes.myMessage
                      : classes.otherMessage
                  }
                >
                  {chat.message}
                </Typography>
              </Stack>
            ))}
          </>
        )}
      </Stack>
      <Divider />
      <Stack direction="row" spacing={1} py={1.5}>
        <Tooltip title="????nh k??m file">
          <IconButton className={classes.iconActionButton}>
            <CollectionsRounded className={classes.iconAction} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Ch???n file gif">
          <IconButton className={classes.iconActionButton}>
            <GifRounded className={classes.iconAction} />
          </IconButton>
        </Tooltip>
        <TextField
          placeholder="Aa"
          name="message"
          variant="outlined"
          fullWidth
          value={userData.message}
          onChange={handleMessage}
          onKeyDown={sendMessage}
          onBlur={() => {
            if(!userData.message) {
              setIsTyping(false)
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",

              legend: {
                marginLeft: "30px",
              },
            },
            "& .MuiAutocomplete-inputRoot": {
              paddingLeft: "20px !important",
              borderRadius: "50px",
            },
            "& .MuiInputLabel-outlined": {
              paddingLeft: "20px",
            },
            "& .MuiInputLabel-shrink": {
              marginLeft: "20px",
              paddingLeft: "10px",
              paddingRight: 0,
              background: "white",
            },
          }}
        />
        {isTyping ? (
          <Tooltip title="G???i">
            <IconButton onClick={sendMessage} className={classes.iconActionButton}>
              <Send className={classes.iconAction} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="G???i l?????t th??ch">
            <IconButton className={classes.iconActionButton}>
              <ThumbUp className={classes.iconAction} />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </Stack>
  );
};

export default ChatRoom;
