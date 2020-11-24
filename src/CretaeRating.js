import React, { useState } from "react";
import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputLabel,
  Box
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

function CretaeRating({ handleAddNewRating }) {
  const [open, setDialog] = useState(false);
  const [createObj, setCreateObj] = React.useState({ name: "", rating: 0 });
  const handleClose = () => {
    setDialog(false);
    setCreateObj({ name: "", rating: 0 });
  };
  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={() => setDialog(true)}
      >
        Add new
      </Button>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
        <DialogTitle title="Add User">Add User</DialogTitle>
        <DialogContent>
          <Box mb={1}>
            <InputLabel> User Name</InputLabel>
            <TextField
              fullWidth
              variant="outlined"
              value={createObj.name}
              onChange={event => {
                setCreateObj({ ...createObj, name: event.target.value });
              }}
            />
          </Box>
          <Box>
            <InputLabel> User Reating</InputLabel>
            <Rating
              value={createObj.rating}
              onChange={(event, newValue) => {
                setCreateObj({ ...createObj, rating: newValue });
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              handleAddNewRating(createObj, () => {
                handleClose();
              });
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CretaeRating;
