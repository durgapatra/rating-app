import React, { useState, useEffect } from "react";
import {
  Card,
  Box,
  CardContent,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  List,
  ListItemSecondaryAction
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CretaeRating from "./CretaeRating";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    height: "100vh",
    alignItems: "center"
  },
  ratineCard: {
    minHeight: "300px",
    width: "700px"
  },
  cardHeader: {
    display: "flex",
    background: "#000",
    color: "#fff"
  },
  radioGroupRoot: {
    display: "flex",
    flexDirection: "row"
  },
  redioBtn: {
    color: "#3f51b5"
  }
});

function App() {
  const classes = useStyles();
  const [sortValue, setSortValue] = useState("des");
  const [listData, setListData] = useState([]);

  const handleSortByRating = (arr, sortKey = sortValue) => {
    return arr.sort(function(a, b) {
      let keyA = a.rating,
        keyB = b.rating; // Compare the 2 rating
      if (sortKey === "des") {
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
      } else {
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
      }
      return 0;
    });
  };

  const handleOnChange = value => {
    setSortValue(value);
    handleSortByRating(listData, value);
  };

  const handleAddNewRating = (createObj, callBack) => {
    if (!createObj.name) return alert("Please enter user name ");
    setListData([createObj, ...listData]);
    localStorage.setItem("listData", JSON.stringify([createObj, ...listData]));
    callBack();
  };

  useEffect(() => {
    if (!localStorage.getItem("listData")) {
      localStorage.setItem(
        "listData",
        JSON.stringify([
          { name: "Lio massy", rating: 0 },
          { name: "Cr 7", rating: 1 },
          { name: "John Smith", rating: 2 },
          { name: "Will Smith", rating: 3 },
          { name: "Virat Kohli", rating: 4 }
        ])
      );
      setListData(
        handleSortByRating(JSON.parse(localStorage.getItem("listData")))
      );
    } else {
      setListData(
        handleSortByRating(
          localStorage.getItem("listData")
            ? JSON.parse(localStorage.getItem("listData"))
            : []
        )
      );
    }
  }, []);

  return (
    <div className={classes.root}>
      <Card className={classes.ratineCard}>
        <Box p={2} className={classes.cardHeader}>
          <Box display="flex" alignItems="center">
            <FormLabel
              component="legend"
              style={{ color: "#fff", marginRight: 10 }}
            >
              Sort By:-
            </FormLabel>
            <RadioGroup
              className={classes.radioGroupRoot}
              value={sortValue}
              onChange={event => {
                handleOnChange(event.target.value);
              }}
            >
              <FormControlLabel
                value="des"
                control={<Radio className={classes.redioBtn} color="primary" />}
                label="Highest rating fist"
              />
              <FormControlLabel
                value="accending"
                control={<Radio className={classes.redioBtn} color="primary" />}
                label="Low rating fist"
              />
            </RadioGroup>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            flex={1}
            justifyContent="flex-end"
          >
            <CretaeRating handleAddNewRating={handleAddNewRating} />
          </Box>
        </Box>
        <CardContent>
          <List>
            {listData.map((each, index) => {
              return (
                <ListItem key={index}>
                  <ListItemText primary={each.name} />
                  <ListItemSecondaryAction>
                    <Rating name="rating" value={each.rating} />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
