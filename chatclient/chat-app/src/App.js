import { Divider, Stack } from "@mui/material";
import { Fragment } from "react";
import Header from "./layout/header";
import Sidebar from "./layout/sidebar";
import ChatRoom from "./pages/chat-room";

function App() {
  return (
    <Fragment>
      <Header />
      <Stack direction="row">
        <Stack flex={2}>
          <Sidebar />
        </Stack>
        <Divider orientation="vertical" flexItem/>
        <Stack flex={10}>
          <ChatRoom />
        </Stack>
      </Stack>
    </Fragment>
  );
}

export default App;
