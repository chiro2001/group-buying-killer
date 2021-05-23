import { Container } from "@material-ui/core";
import React from "react";
import Actions from "../components/Actions";
import Triggers from "../components/Triggers";

export default function Launch(props) {
  return <Container>
    <Triggers useActions={true}></Triggers>
    <Actions useActions={true}></Actions>
  </Container>
}