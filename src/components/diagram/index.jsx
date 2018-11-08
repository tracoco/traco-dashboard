import React from "react";

import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";

const style = theme => {
};

class Diagram extends React.Component {
    componentDidMount() {
        if (this.diagramDiv === undefined) {
            return;
        }
        this.diagramDiv.style.height = "100%";
        this.diagramDiv.style.width = "100%";

        if (window.mxGraph === undefined) {
            return;
        }
        if (!window.mxClient.isBrowserSupported()) {
            // Displays an error message if the browser is not supported.
            window.mxUtils.error('Browser is not supported!', 200, false);
            return;
        }
        var graph = new window.mxGraph(this.diagramDiv);
        // Disables moving of edge labels in this examples
        graph.edgeLabelsMovable = false;

        // Enables rubberband selection
        new window.mxRubberband(graph);
        // Needs to set a flag to check for dynamic style changes,
        // that is, changes to styles on cells where the style was
        // not explicitely changed using mxStyleChange
        graph.getView().updateStyle = true;

        // Overrides mxGraphModel.getStyle to return a specific style
        // for edges that reflects their target terminal (in this case
        // the strokeColor will be equal to the target's fillColor).
        var previous = graph.model.getStyle;

        graph.model.getStyle = function (cell) {
            if (cell != null) {
                var style = previous.apply(this, arguments);

                if (this.isEdge(cell)) {
                    var target = this.getTerminal(cell, false);
                    if (target != null) {
                        var state = graph.getView().getState(target);
                        var targetStyle = (state != null) ? state.style : graph.getCellStyle(target);
                        var fill = window.mxUtils.getValue(targetStyle, window.mxConstants.STYLE_FILLCOLOR);

                        if (fill != null) {
                            style += ';strokeColor=' + fill;
                        }
                    }
                }
                else if (this.isVertex(cell)) {
                    var geometry = this.getGeometry(cell);

                    if (geometry != null &&
                        geometry.width > 80) {
                        style += ';fillColor=green';
                    }
                }

                return style;
            }

            return null;
        };

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try {
            var v1 = graph.insertVertex(parent, null, 'Input,', 20, 20, 80, 30, 'fillColor=white');
            var v2 = graph.insertVertex(parent, null, 'Process', 200, 150, 80, 30, 'fillColor=grey');
            var v3 = graph.insertVertex(parent, null, 'Rule', 20, 150, 80, 30, 'fillColor=white');
            var e1 = graph.insertEdge(parent, null, 'Connect', v1, v2, 'perimeterSpacing=4;strokeWidth=4;strokeColor=black;labelBackgroundColor=white;fontStyle=1');
        }
        finally {
            // Updates the display
            graph.getModel().endUpdate();
        }
    }

    render() {
        return (
            <div ref={c => this.diagramDiv = c} />
        );
    }
}

Diagram.propTypes = {
    data: PropTypes.object.isRequired
};

export default withStyles(style)(Diagram);
