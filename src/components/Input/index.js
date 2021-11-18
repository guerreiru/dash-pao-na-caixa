import React from "react";
import { Input } from "./styles";
const index = ({ setValue, type, id, name, value, ...props }) => {
  return (
    <Input
      id={id}
      type={"text" || type}
      placeholder={props.placeholder || id}
      name={props.name || id}
      value={value}
      onChange={({ target }) => setValue(target.value)}
    ></Input>
  );
};

export default index;
