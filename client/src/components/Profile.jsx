//import React from "react";
import React, { useState, useEffect, useRef } from "react";

//import { useParams } from "react-router-dom";

const Profile = () => {
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <div className="menu-container" ref={menuRef}>
      <div
        className="menu-trigger"
        onClick={() => {
          setOpen(!open);
          //alert("open");
        }}
      >
        <a>Login</a>
      </div>

      <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
        <h3>
          The Kiet
          <br />
          <span>Website Designer</span>
        </h3>
        <ul>
          <DropdownItem text={"My Profile"} />
          <DropdownItem text={"Edit Profile"} />
          <DropdownItem text={"Inbox"} />
          <DropdownItem text={"Settings"} />
          <DropdownItem text={"Helps"} />
          <DropdownItem text={"Logout"} />
        </ul>
      </div>
    </div>
  );
};

function DropdownItem(props) {
  return (
    <li className="dropdownItem">
      <a> {props.text} </a>
    </li>
  );
}
export default Profile;
