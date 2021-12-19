import React, { useContext } from "react";
import styled from "styled-components";
import { ScrollView } from "../../components/Elements";
import { UserDataContext } from "../../context/UserContext";
import { Login } from "./Login";
import { Profile } from "./Profile";


export function Account() {
    const { UserData } = useContext(UserDataContext);

    
    if (UserData) return <Profile />
    else return <Login />
}