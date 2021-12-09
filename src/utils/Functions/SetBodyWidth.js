export const SetBodyWidth = () => {
  let body = document.querySelector(".body");
  body.style.height = `${body.scrollHeight + 10}px`;
};
