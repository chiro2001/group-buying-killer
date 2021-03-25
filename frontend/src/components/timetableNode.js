import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import PropTypes from 'prop-types'
import { parseTimePoint } from '../utils/utils'

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  secondaryIcon: {
    // paddingRight: theme.spacing(4),
  }
}));

function TimetableNode(props) {
  const classes = useStyles();
  const { node } = props;
  const [ open, setOpen ] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const getSecondaryText = () => {
    return `${node.periodId}/周期:${parseTimePoint(node.cycle)}/${node.avaliable ? "可用" : "不可用"}`
  };
  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon><AlarmOnIcon /></ListItemIcon>
        <ListItemText primary={node.itemName} secondary={getSecondaryText()} />
        <div className={classes.secondaryIcon}>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
        <ListItemSecondaryAction>
          <IconButton edge="end">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={classes.nested}>
          <ListItem button>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
}

TimetableNode.propTypes = {
  node: PropTypes.object.isRequired
};

export default TimetableNode;