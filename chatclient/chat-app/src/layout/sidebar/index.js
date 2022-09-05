import { BorderColor, FiberManualRecord, MoreHoriz, Search, VideoCall } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Badge,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { Fragment, useState } from "react";
import FormatDataUtils from "../../utils/formatData";
const useStyle = makeStyles({
  sidebar: {
    minHeight: "93vh",
  },
  listItewTextMessage: {
    paddingLeft: "8px",
  },
  unseen: {
    fontWeight: "bold",
  },
  badgeUnseen: {
    backgroundColor: '#31A24C',
  },
  iconUnseen: {
    color: '#2E89FF',
    fontSize: '12px'
  },
  iconUnseenContainer: {
    "& svg": {
      fontSize: 18,
    },
  }
});
const Sidebar = () => {
  const [options, setOptions] = useState([
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
  ]);
  const [loading, setLoading] = useState(false);
  const classes = useStyle();

  const listMessage = [
    {
      id: 1,
      avatarUrl:
        "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/283532607_808389037216345_1075669431769648577_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=xAqM1nGLZSQAX_bp3Ic&_nc_ht=scontent.fhan14-2.fna&oh=00_AT9Gyr7ITq5qSEuWPMym561oDfKzlWMLPMdD8ydBvd7YGQ&oe=631AB744",
      name: "Thuỷ Tiên",
      message: "alo anh ơi",
      status: "seen",
      active: false,
    },
    {
      id: 2,
      avatarUrl:
        "https://static1.personality-database.com/profile_images/f932b4f742854748b263e5d52b337985.png",
      name: "Leader Team Dev",
      message:
        "Mọi người mai họp sớm để hoàn thành nốt dư án nhé. Yêu cầu mn đúng giờ ai chậm trễ trừ lương",
      status: "unseen",
      active: true,
    },
    
  ];
  return (
    <Stack className={classes.sidebar}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={1}
      >
        <Typography variant="h5">
          <strong>Chat</strong>
        </Typography>
        <Stack direction="row">
          <Tooltip title="Menu">
            <IconButton>
              <MoreHoriz />
            </IconButton>
          </Tooltip>
          <Tooltip title="Menu">
            <IconButton>
              <VideoCall />
            </IconButton>
          </Tooltip>
          <Tooltip title="Menu">
            <IconButton>
              <BorderColor />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <Stack p={1}>
        <Autocomplete
          freeSolo
          id="asynchronous-demo"
          isOptionEqualToValue={(option, value) => option.title === value.title}
          getOptionLabel={(option) => option.title}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.searchField}
              placeholder="Tìm kiếm trên Messenger..."
              size="small"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
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
          )}
        />
      </Stack>
      <Stack style={{maxHeight: '83vh', overflow: 'auto'}}>
        <List>
          {listMessage.map((sender) => (
            <ListItem alignItems="center" key={sender.id} secondaryAction={
              <Box className={classes.iconUnseenContainer}>
                {sender.status === 'unseen' ?  <FiberManualRecord className={classes.iconUnseen}/> : null}
              </Box>
            }>
              <ListItemAvatar>
                <Badge
                  // color="success"
                  classes={{ badge: classes.badgeUnseen }}
                  badgeContent={sender.active ? "" :null}
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={sender.avatarUrl}
                    sx={{ width: 56, height: 56 }}
                  />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                className={classes.listItewTextMessage}
                primary={
                  <Fragment>
                    <Typography
                      variant="span"
                      className={
                        sender.status === "unseen" ? classes.unseen : null
                      }
                    >
                      {sender.name}
                    </Typography>
                  </Fragment>
                }
                secondary={
                  <Fragment>
                    <Typography
                      variant="span.body2"
                      className={
                        sender.status === "unseen" ? classes.unseen : null
                      }
                    >
                      {FormatDataUtils.truncate(sender.message, 25)}
                    </Typography>
                  </Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Stack>
  );
};

export default Sidebar;
