var Line = React.createClass({
  render: function() {
    return (
      <path
        d={this.props.path}
        fill={this.props.fill}
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeWidth}/>
    );
  }
});

var DataSeries = React.createClass({
  render: function() {
    let line = d3.svg.line()
      .x((d) => { return this.props.xScale(d.x); })
      .y((d) => { return this.props.yScale(d.y); });

    let lines = this.props.data.points.map((series, id) => {
      return (
        <Line
          path={line(series)}
          stroke={this.props.colors(id)}
          key={id}/>
      );
    });

    return (
      <g>
        <g>{lines}</g>
      </g>
    );
  }

});

var LineChart = React.createClass({
    render: function() {
        let xScale = d3.scale.linear()
            .range([-2, 2])
            .domain([-2, 2]);

        let yScale = d3.scale.linear()
            .range([-2, 2])
            .domain([-2, 2]);

        return (
            <svg width={this.props.width} height={this.props.height}>
            <DataSeries
              xScale={xScale}
              yScale={yScale}
              data={this.props.data}
              width={this.props.width}
              height={this.props.height}/>
            </svg>
        )}
});