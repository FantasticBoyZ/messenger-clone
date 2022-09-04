import {
  Airplay,
  Apps,
  FacebookOutlined,
  Groups,
  HomeOutlined,
  Notifications,
  Search,
  SportsEsports,
  Storefront,
} from "@mui/icons-material";
import {
  AppBar,
  Autocomplete,
  Avatar,
  Badge,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

const useStyle = makeStyles({
  iconButtonFacebook: {
    "& svg": {
      fontSize: 45,
    },
  },
  iconFacebook: {
    color: "#fff",
    fontSize: "50px",
  },
  searchField: {
    backgroundColor: "#FFF",
    borderRadius: "50px",
  },
  iconButtonNav: {
    width: "100px",
    color: "#FFF",
    "& svg": {
      fontSize: 35,
    },
  },
  iconNav: {
    color: "#fff",
  },
  sideContainer: {
    width: "400px",
  },
});

const Header = () => {
  const classes = useStyle();
  const [options, setOptions] = useState([
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
  ]);
  const [loading, setLoading] = useState(false);
  return (
    <AppBar position="sticky">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        
        px={1}
      >
        <Stack
          direction="row"
          spacing={0.1}
          alignItems="center"
          className={classes.sideContainer}
        >
          <IconButton className={classes.iconButtonFacebook}>
            <FacebookOutlined
              fontSize="large"
              className={classes.iconFacebook}
            />
          </IconButton>
          <Autocomplete
            freeSolo
            id="asynchronous-demo"
            sx={{ width: 300 }}
            isOptionEqualToValue={(option, value) =>
              option.title === value.title
            }
            getOptionLabel={(option) => option.title}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.searchField}
                placeholder="Tìm kiếm trên facebook..."
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
        <Stack direction="row" spacing={3}>
          <Tooltip title="Trang chủ">
            <IconButton className={classes.iconButtonNav}>
              <HomeOutlined className={classes.iconNav} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Watch">
            <IconButton className={classes.iconButtonNav}>
              <Airplay className={classes.iconNav} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Marketplace">
            <IconButton className={classes.iconButtonNav}>
              <Storefront className={classes.iconNav} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Nhóm">
            <IconButton className={classes.iconButtonNav}>
              <Groups className={classes.iconNav} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Game">
            <IconButton className={classes.iconButtonNav}>
              <SportsEsports className={classes.iconNav} />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={1}
          className={classes.sideContainer}
        >
          <Tooltip title="Menu">
            <IconButton>
              <Apps className={classes.iconNav} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Thông báo">
            <IconButton>
              <Badge badgeContent={10} color="error">
                <Notifications className={classes.iconNav} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            alt="Remy Sharp"
            src="https://static.newsbreak.com/people/600/per_thumb_ef2f602d375441ffb2d9642b55d2cee4.webp"
          />
        </Stack>
      </Stack>
    </AppBar>
  );
};

export default Header;
