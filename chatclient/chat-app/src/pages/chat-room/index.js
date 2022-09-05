import {
  CollectionsRounded,
  GifRounded,
  InfoRounded,
  LocalPhoneRounded,
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
import React from "react";

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
const ChatRoom = () => {
  const classes = useStyle();
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
              <strong>Gái Xênh</strong>
            </Typography>
            <Typography variant="body2" fontSize="13px">
              Đang hoạt động
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="Bắt đầu gọi thoại">
            <IconButton>
              <LocalPhoneRounded className={classes.iconAction} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bắt đầu gọi video">
            <IconButton>
              <VideocamRounded className={classes.iconAction} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Thông tin về cuộc trò chuyện">
            <IconButton>
              <InfoRounded className={classes.iconAction} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Divider />
      <Stack px={1} className={classes.messageContainer}>
        <Stack direction="row" justifyContent="flex-end" py={1}>
          <Typography variant="p" className={classes.myMessage}>
            Bên đó đang làm gì thế?
          </Typography>
        </Stack>
        <Typography variant="p" className={classes.otherMessage}>
          Anh hỏi ai?
        </Typography>
        <Stack direction="row" justifyContent="flex-end" py={1}>
          <Typography variant="p" className={classes.myMessage}>
            Tay anh muốn hỏi tay bên đó đang làm cái chi chi?
          </Typography>
        </Stack>
        <Typography variant="p" className={classes.otherMessage}>
          Có làm gì đâu?
        </Typography>
        <Stack direction="row" justifyContent="flex-end" py={1}>
          <Typography variant="p" className={classes.myMessage}>
            Tay bên đây muốn hỏi tay bên đó có rãnh lắm không?
          </Typography>
        </Stack>
        <Typography variant="p" className={classes.otherMessage}>
          Uh, tay bên đây rất rãnh chả có làm gì cả
        </Typography>
        <Stack direction="row" justifyContent="flex-end" py={1}>
          <Typography variant="p" className={classes.myMessage}>
            Vậy thì cho tay bên đây cầm cái tay bên đó nhá!
          </Typography>
        </Stack>
        <Typography variant="p" className={classes.otherMessage}>
          Hihi anh này khéo thật đấy
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" spacing={1} py={1.5}>
        <Tooltip title="Đính kèm file">
          <IconButton className={classes.iconActionButton}>
            <CollectionsRounded className={classes.iconAction} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Chọn file gif">
          <IconButton className={classes.iconActionButton}>
            <GifRounded className={classes.iconAction} />
          </IconButton>
        </Tooltip>
        <TextField
          placeholder="Aa"
          name="message"
          variant="outlined"
          fullWidth
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
        <Tooltip title="Gửi lượt thích">
          <IconButton className={classes.iconActionButton}>
            <ThumbUp className={classes.iconAction} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default ChatRoom;
