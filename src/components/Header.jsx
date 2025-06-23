import React from "react";

function Header() {
  return (
    <header
      style={{
        width: "100%",
        height: "100vh", // 화면 높이만큼
        backgroundImage: `url("/images/main.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

export default Header;