import { Container } from "@material-ui/core";
import React from "react";
import Actions from "../components/Actions";
import Triggers from "../components/Triggers";

export default function Launch(props) {
  return <Container>
    <Triggers useActions={false} onClick={(trigger) => {
      console.log(trigger);
    }}></Triggers>
    <Actions useActions={true}></Actions>
  </Container>
}