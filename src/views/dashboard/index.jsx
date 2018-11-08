import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import DashboardTile from "./tile";
import IconButton from '@material-ui/core/IconButton';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { updateTiles } from '../../store/uistate/actions';
import DragHandleIcon from '@material-ui/icons/DragHandle';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import vol from './vol';
import cpty from './cpty';
import clear from './clear';

const data = {
    vol: vol,
    cpty: cpty,
    clear: clear
}
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
            newCounter: 0
        };
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
            top: "-15px",
            zIndex: 9999
        };
        const nonDraggable = {
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%"
        };
        return (
            <div key={el.i} data-grid={el}>
                <span className="text dragHandleTraco"
                    style={dragHandleTraco}>
                    <IconButton>
                        <DragHandleIcon />
                    </IconButton>
                </span>
                <div style={nonDraggable} className="nonDraggable">
                    <DashboardTile title={el.title} subheader={el.subheader}
                        avatar={el.avatar} data={data[el.i]}/>
                </div>
                <span
                    className="remove"
                    style={removeStyle}
                    onClick={this.onRemoveItem.bind(this, el)}
                >
                    <IconButton aria-label="Share">
                        <PowerSettingsNewIcon />
                    </IconButton>
                </span>
            </div>
        );
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

    onRemoveItem(el) {
        let tiles = this.props.tiles.map((item, idx)=>{
            let copyItem = {...item};
            if (item.i === el.i) {
                copyItem.shown = false;
            }
            return copyItem;
        });
        this.props.updateTiles(tiles);
    }

    render() {
        return (
            <div>
                <ResponsiveReactGridLayout
                    draggableCancel=".nonDraggable"
                    onLayoutChange={this.onLayoutChange.bind(this)}
                    onBreakpointChange={this.onBreakpointChange.bind(this)}
                    {...this.props}
                >
                    {this.props.tiles.filter(el=> el.shown? true:false)
                        .map(el => {return this.createElement(el);})}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tiles: state.uistate.dashboardTile
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    updateTiles
},
    dispatch
)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
