import React from "react";

const HeadTitle = (props) => {
  React.useEffect(() => {
    document.title = props.title;
    document.querySelector("meta[name='description']")
    .setAttribute("content", props.description);
  }, [props]);
  return <></>;
};

export default HeadTitle