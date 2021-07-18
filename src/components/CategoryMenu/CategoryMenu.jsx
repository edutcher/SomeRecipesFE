import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router";

export default function CategoryMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    const name = e.currentTarget.getAttribute("name");
    if (name) history.push(`/category/${name}`);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Category
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem name="appetizer" onClick={handleClose}>
          Appetizer
        </MenuItem>
        <MenuItem name="main" onClick={handleClose}>
          Main
        </MenuItem>
        <MenuItem name="side" onClick={handleClose}>
          Side
        </MenuItem>
        <MenuItem name="dessert" onClick={handleClose}>
          Dessert
        </MenuItem>
      </Menu>
    </div>
  );
}
