import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function AccountPage() {
  const { currentUser } = useContext(UserContext);
  return <h1>Account {currentUser.username}</h1>;
}
