import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export default function AlertDialog(props) {

  return (
    <Dialog
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Deseja excluir ${props.item.name || props.item.user_name}?`}
      </DialogTitle>
      {props.description && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        {props.children}
      </DialogActions>
    </Dialog>
  );
}
