import { Stack } from "@mui/material";
import { Fragment } from "react";
import Header from "./layout/header";
import Sidebar from "./layout/sidebar";
import ChatRoom from "./pages/chat-room";

function App() {
  return (
    <Fragment>
      <Header />
      <Stack direction='row'>
        <Sidebar/>
        <ChatRoom/>
      </Stack>
    </Fragment>
  );
}

export default App;
