import React from "react";
import NavBarAvatar from "./NavBarAvatar";
import AddForm from "./AddForm";
import NavBarMenuIcon from "./NavBarMenuIcon";
import { useEffect, useState } from "react";

const NavBarRightSide = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, [screenWidth]);

  return (
    <>
      {screenWidth > 900 ? (
        <>
          <NavBarAvatar /> <AddForm />{" "}
        </>
      ) : (
        <NavBarMenuIcon />
      )}
    </>
  );
};

export default NavBarRightSide;
