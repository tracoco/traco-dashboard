import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import data from './demo';
import { NavLink } from "react-router-dom";

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class Sidebar extends React.Component {
    state = {
        menuExpaned: {}
    };

    constructor(props) {
        super(props);
        data.forEach((item, idx) => {
            if (Array.isArray(item.children) && item.id) {
                this.state.menuExpaned[item.id] = false;
            }
        }, this
        );
    }

    handleExpand = (id) => {
        let expand = this.state.menuExpaned
        expand[id] = !this.state.menuExpaned[id];
        this.setState(state => ({ menuExpaned: expand }));
    };

    render() {
        const { classes } = this.props;
        return (
            <List>
                {data.map((item, idx) => (
                    item.type === "divider" ? <Divider key={item.id} /> :
                        item.type === "link" &&
                        <div key={item.id}>
                            <NavLink to={item.url} style={{ textDecoration: 'none' }}>
                                <ListItem button onClick={this.handleExpand.bind(this, item.id)}>
                                    <ListItemIcon>
                                        <Icon>{item.icon}</Icon>
                                    </ListItemIcon>
                                    <ListItemText inset primary={item.text} />
                                    {item.children ?
                                        this.state.menuExpaned[item.id] ? <ExpandLess /> : <ExpandMore />
                                        : <div />
                                    }
                                </ListItem>
                            </NavLink>
                            {Array.isArray(item.children) &&
                                <Collapse in={this.state.menuExpaned[item.id]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.children.map((subitem, index) => (
                                            <ListItem button className={classes.nested} key={index}
                                                onClick={(e)=>this.props.menuClicked(subitem.id,e)}>
                                                <ListItemIcon>
                                                    <Icon>{subitem.icon}</Icon>
                                                </ListItemIcon>
                                                <ListItemText inset primary={subitem.text} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            }
                        </div>
                ))
                }
            </List >
        );
    }
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    menuClicked: PropTypes.func
};

export default withStyles(styles, { withTheme: true })(Sidebar);