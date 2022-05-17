import React from "react";
import logo from "../Images/logo.png";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import AddForm from "./AddForm";
import NavBarAvatar from "./NavBarAvatar"

const Navigation = () => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    color: "black",
    borderColor: "black",
    "&:hover": {
      borderColor: "red",
    },
    [theme.breakpoints.up("sm")]: {
      width: "70%",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    color: "black",
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "black",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      //vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));
  return (
    <Box sx={{ padding: "50px" }}>
      <AppBar elevation={0} sx={{ bgcolor: "white", padding: "2px" }}>
        <Toolbar sx={{ justifyContent: "space-between", flexGrow: 1 }}>
          <Link to={"/"}>
            {" "}
            <img src={logo} />
          </Link>
          <Search sx={{ border: 1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" />
          </Search>
          <NavBarAvatar />
          <AddForm />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
