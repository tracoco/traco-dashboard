import React from "react";

import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import PivotTableUI from 'react-pivottable/PivotTableUI';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';

import 'react-pivottable/pivottable.css';

const PlotlyRenderers = createPlotlyRenderers(Plot);

const style = theme => {
};

class Pivot extends React.Component {

  render() {
    return (
      <PivotTableUI
        data={this.props.data}
        onChange={s => this.setState(s)}
        renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
        {...this.state}
      />
    );
  }
}

Pivot.propTypes = {
  data: PropTypes.array.isRequired
};

export default withStyles(style)(Pivot);
