import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { WidthProvider, Responsive } from "react-grid-layout";
import DashboardTile from "./tile";
import IconButton from '@material-ui/core/IconButton';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import _ from "lodash";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Dashboard extends React.PureComponent {
    static defaultProps = {
        className: "layout",
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        rowHeight: 100
    };

    constructor(props) {
        super(props);

        this.state = {
            items: [0, 1, 2].map(function (i, key, list) {
                return {
                    i: i.toString(),
                    x: i * 3,
                    y: 0,
                    w: 3,
                    h: 5,
                    draggableHandle: ".dragHandleTraco",
                    add: i === (list.length - 1).toString()
                };
            }),
            newCounter: 0
        };

        this.onAddItem = this.onAddItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
    }

    createElement(el) {
        const removeStyle = {
            position: "absolute",
            right: "2px",
            top: 0,
            cursor: "pointer"
        };
        const dragHandleTraco = {
            position: "absolute",
            top: "-35px"
        };
        const nonDraggable = {
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%"
        };
        const i = el.add ? "+" : el.i;
        return (
            <div key={i} data-grid={el}>
                <span className="text dragHandleTraco"
                    style={dragHandleTraco}>
                    <IconButton>
                        <DragHandleIcon />
                    </IconButton>
                </span>
                {el.add ? (
                    <span
                        className="nonDraggable"
                        onClick={this.onAddItem}
                        title="You can add an item by clicking here, too."
                    >
                        Add +
          </span>
                ) : (
                        <div style={nonDraggable} className="nonDraggable">
                            <DashboardTile />
                        </div>
                    )}
                <span
                    className="remove"
                    style={removeStyle}
                    onClick={this.onRemoveItem.bind(this, i)}
                >
                    <IconButton aria-label="Share">
                        <PowerSettingsNewIcon />
                    </IconButton>
                </span>
            </div>
        );
    }

    onAddItem() {
        /*eslint no-console: 0*/
        console.log("adding", "n" + this.state.newCounter);
        this.setState({
            // Add a new item. It must have a unique key!
            items: this.state.items.concat({
                i: "n" + this.state.newCounter,
                x: (this.state.items.length * 2) % (this.state.cols || 12),
                y: Infinity, // puts it at the bottom
                w: 3,
                h: 4
            }),
            // Increment the counter to ensure key is always unique.
            newCounter: this.state.newCounter + 1
        });
    }

    // We're using the cols coming back from this to calculate where to add new items.
    onBreakpointChange(breakpoint, cols) {
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }

    onLayoutChange(layout) {
        //this.props.onLayoutChange(layout);
        this.setState({ layout: layout });
    }

    onRemoveItem(i) {
        console.log("removing", i);
        this.setState({ items: _.reject(this.state.items, { i: i }) });
    }

    render() {        
        return (
            <div>
                <IconButton aria-label="Share">
                    <CreateNewFolderIcon onClick={this.onAddItem} />
                </IconButton>
                <ResponsiveReactGridLayout
                    draggableCancel=".nonDraggable"
                    onLayoutChange={this.onLayoutChange.bind(this)}
                    onBreakpointChange={this.onBreakpointChange.bind(this)}
                    {...this.props}
                >
                    {_.map(this.state.items, el => this.createElement(el))}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

export default (Dashboard);