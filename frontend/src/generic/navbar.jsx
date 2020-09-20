import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";

import { AccountCircle } from "@material-ui/icons";

import { useWindowScroll } from "beautiful-react-hooks";
import { NavLink } from "react-router-dom";

const MainNav = () => {
    const [isShadow, setIsShadow] = useState(window.scrollY > 20);

    useWindowScroll(() => {
        setIsShadow(window.scrollY > 20);
    });

    return (
        <Navbar
            sticky="top"
            className={"bg-bg crounded" + (isShadow ? " shadow" : "")}
        >
            <Navbar.Brand
                style={{ fontFamily: "MuseoModerno" }}
                as={NavLink}
                to="/"
            >
                ToDo++
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="main-nav" />

            <Navbar.Collapse id="main-nav">
                <Nav className="ml-auto">
                    <Nav.Link
                        className="pl-3 pr-0 navLink-border"
                        as={NavLink}
                        to="/login"
                    >
                        <AccountCircle className="text-syntax" />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MainNav;
