import { Box, Button, Divider, Stack, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { API_URL } from "./constants/apiUrl";
import Header from "./layout/header";
import Sidebar from "./layout/sidebar";
import ChatRoom from "./pages/chat-room";

var stompClient = null;
function App() {
  const [publicChats, setPublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
    seenState: "unseen",
  });
  const [tab, setTab] = useState("CHATROOM");
  // const API_URL = "https://messsenger-clone-server.herokuapp.com/"
  // const API_URL = "http://localhost:8080/"

  const handleUserNameChange = (event) => {
    const { value, name } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const registerUser = () => {
    let Sock = new SockJS(API_URL + "ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    console.log("stompclient", stompClient);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onPublicMessageReceived);
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessageReceived
    );
    userJoin();
  };

  const userJoin = () => {
    let chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    console.log("stompclient", stompClient);
    setUserData({ ...userData, connected: true, message: "" });
  };

  const onError = (e) => {
    console.log(e);
  };

  const onPublicMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
      case "LEAVE":
        break;
    }
  };

  const onPrivateMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };
  return (
    <Fragment>
      {!userData.connected ? (
        <Box height="100vh">
          <Stack
            height="100%"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <TextField
              placeholder="Enter the user name"
              name="username"
              value={userData.username}
              onChange={handleUserNameChange}
            />
            <Button variant="contained" onClick={registerUser}>
              Connect
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box>
          <Header />
          <Stack direction="row">
            <Stack flex={2}>
              <Sidebar
                privateChats={privateChats}
                publicChats={publicChats}
                tab={tab}
                setTab={setTab}
                userData={userData}
              />
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack flex={10}>
              <ChatRoom
                privateChats={privateChats}
                setPrivateChats={setPrivateChats}
                publicChats={publicChats}
                tab={tab}
                userData={userData}
                setUserData={setUserData}
                stompClient={stompClient}
              />
            </Stack>
          </Stack>
        </Box>
      )}
    </Fragment>
  );
}

export default App;
