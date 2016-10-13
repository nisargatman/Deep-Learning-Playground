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

    return (
      <g>
        <Line path={line(this.props.data)} stroke="black" fill="none"/>
      </g>
    );
  }
});

var LineChart = React.createClass({
    render: function() {
        let xScale = d3.scale.linear()
            .domain([this.props.xDomain[0], this.props.xDomain[1]])
            .range([0, this.props.width]);

        let yScale = d3.scale.linear()
            .domain([this.props.yDomain[0], this.props.yDomain[1]])
            .range([this.props.height, 0]);

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

var FormLabel = React.createClass({
    render: function() {
        return (
            <div className="form-label" style={{width: (this.props.width || 100)}}>{this.props.children}</div>
        );
    }
});

var Form = React.createClass({
    update: function(e) {
        if (this.props.propName === undefined)
            throw "propName property is not defined";
        var val = (this.props.type === "number") ? parseInt(e.target.value) : e.target.value;
        this.props.updater(this.props.propName, val);
    },
    render: function() {
        return (
            <input type={this.props.type} onChange={this.update} defaultValue={this.props.defaultValue} className="form" style={{width: this.props.width || 100}} />
        );
    }
});

var Select = React.createClass({
    update: function(e) {
        if (this.props.propName === undefined)
            throw "propName property is not defined";
        this.props.updater(this.props.propName, e.target.value);
    },
    render: function() {
        return (
            <select name={this.props.name} onChange={this.update} defaultValue={this.props.defaultValue} className="select" style={{width: (this.props.width || 100)}}>
                {
                    this.props.values.map(function(d, i) {
                        return <option value={d.raw} key={i}>{d.display}</option>;
                    }, this)
                }
            </select>
        );
    }
});

var LayerEditorHeader = React.createClass({
    render: function() {
        return (
            <div className="layer-editor-header">
                <span className="u-uppercase">{this.props.title}</span>
                <a href="#" onClick={this.props.deleter.bind(null, this.props.index)} className="u-pad-right x">✕</a>
            </div>
        )
    }
});

var LayerEditorContainer = React.createClass({
    render: function() {
        return (
            <div className="layer-editor">
                <LayerEditorHeader deleter={this.props.deleter} title={this.props.title} />
                <div className="layer-editor-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

var InputLayerEditor = React.createClass({
    render: function() {
        return (
            <LayerEditorContainer title="Input layer" deleter={this.props.deleter}>
                <FormLabel width={80}>Input size:</FormLabel>
                <Form type="number" defaultValue={this.props.layer.width} width={60} updater={this.props.updater} propName="width" />
                ×<Form type="number" defaultValue={this.props.layer.height} width={60} updater={this.props.updater} propName="height" /> <br />
                <FormLabel width={80}>Channels:</FormLabel>
                <Form type="number" defaultValue={this.props.layer.n_channels} updater={this.props.updater} propName="n_channels" width={60} />
            </LayerEditorContainer>
        );
    }
});

var ConvLayerEditor = React.createClass({
    render: function() {
        return (
            <LayerEditorContainer title="Convolutional layer" deleter={this.props.deleter}>
                <FormLabel width={80}>Filter size:</FormLabel>
                <Form type="number" defaultValue={this.props.layer.filter_width} updater={this.props.updater} propName="filter_width" width={60}/>
                ×<Form type="number" defaultValue={this.props.layer.filter_height} updater={this.props.updater} propName="filter_height" width={60}/> <br />
                <FormLabel width={80}>Depth:</FormLabel>
                <Form type="number" defaultValue={this.props.layer.depth} updater={this.props.updater} propName="depth" width={60}/> <br />
                <FormLabel width={80}>Stride:</FormLabel>
                <Form type="number" defaultValue={this.props.layer.stride_x} updater={this.props.updater} propName="stride_x" width={60}/>
                <Form type="number" defaultValue={this.props.layer.stride_y} updater={this.props.updater} propName="stride_y" width={60}/>
                <Form type="number" defaultValue={this.props.layer.stride_z} updater={this.props.updater} propName="stride_z" width={60}/>
                <Form type="number" defaultValue={this.props.layer.stride_t} updater={this.props.updater} propName="stride_t" width={60}/> <br />
                <FormLabel width={80}>Padding:</FormLabel>
                <Select name="padding" width={90} defaultValue={this.props.layer.padding} updater={this.props.updater} propName="padding" values={[{raw: "same", display: "Same"}, {raw: "valid", display: "Valid"}]} />
            </LayerEditorContainer>
        );
    }
});

var FullyConnectedLayerEditor = React.createClass({
    render: function() {
        return (
            <LayerEditorContainer title="Fully-connected layer" deleter={this.props.deleter}>
                <FormLabel width={95}>Output size:</FormLabel>
                <Form type="number" defaultValue={this.props.layer.output_size} updater={this.props.updater} propName="output_size" width={60}/>
            </LayerEditorContainer>
        );
    }
});

var PoolLayerEditor = React.createClass({
    render: function() {
        return (
            <LayerEditorContainer title="Pooling layer" deleter={this.props.deleter}>
                <FormLabel width={100}>Pooling type</FormLabel>
                <Select name="pooling" width={90} defaultValue={this.props.layer.pool_type} updater={this.props.updater} propName="pool_type" values={[{raw: "max", display: "Max"}, {raw: "average", display: "Average"}]} /> <br />
                <FormLabel width={100}>Window size</FormLabel>
                <Form type="number" defaultValue={this.props.layer.window_size_x} updater={this.props.updater} propName="window_size_x" width={60} />
                ×<Form type="number" defaultValue={this.props.layer.window_size_y} updater={this.props.updater} propName="window_size_y" width={60} /> <br />
                <FormLabel width={100}>Stride:</FormLabel>
                <Form type="number" defaultValue={this.props.layer.stride_x} updater={this.props.updater} propName="stride_x" width={60}/>
                <Form type="number" defaultValue={this.props.layer.stride_y} updater={this.props.updater} propName="stride_y" width={60}/>
                <Form type="number" defaultValue={this.props.layer.stride_z} updater={this.props.updater} propName="stride_z" width={60}/>
                <Form type="number" defaultValue={this.props.layer.stride_t} updater={this.props.updater} propName="stride_t" width={60}/> <br />
                <FormLabel width={100}>Padding:</FormLabel>
                <Select name="padding" width={90} defaultValue={this.props.layer.padding} updater={this.props.updater} propName="padding" values={[{raw: "same", display: "Same"}, {raw: "valid", display: "Valid"}]} />
            </LayerEditorContainer>
        );
    }
});

var ActivationLayerEditor = React.createClass({
    range: function(a, b, n_points) {
        var dx = (b - a)/(n_points - 1);
        var arr = [];
        for (var i = 0; i < n_points; i++) {
            arr.push(a + dx*i);
        }
        return arr;
    },
    sigmoid: function(x) {
        return 1/(1 + Math.exp(-x));
    },
    relu: function(x) {
        return (x < 0) ? 0 : x;
    },
    tanh: function(x) {
        return Math.tanh(x);
    },
    assemble: function(arr1, key1, arr2, key2) {
        var arr = [];
        for (var i = 0; i < arr1.length; i++) {
            var obj = {};
            obj[key1] = arr1[i];
            obj[key2] = arr2[i];
            arr.push(obj);
        }
        return arr;
    },
    render: function() {
        var x = this.range(-5, 5, 20);
        var y = x.map(function(d) {return this.tanh(d);}, this);
        var minX = Math.min(...x);
        var maxX = Math.max(...x);
        var minY = Math.min(...y);
        var maxY = Math.max(...y);
        /*
        <LineChart
                        data={this.assemble(x, "x", y, "y")}
                        xDomain={[minX, maxX]}
                        yDomain={[minY - 0.2*Math.abs(minY), maxY+0.2*Math.abs(maxY)]}
                        width={100}
                        height={80}/>
        */

        return (
            <LayerEditorContainer title="Activation layer" deleter={this.props.deleter}>
                <div style={{width: "75%", "float": "left"}}>
                    <FormLabel width={150}>Activation {"function"}:</FormLabel>
                    <Select name="activation" width={100} defaultValue="sigmoid" updater={this.props.updater} propName="activation_type" values={[{raw: "sigmoid", display: "Sigmoid"}, {raw: "relu", display: "ReLU"}, {raw: "tanh", display: "tanh"}]} />
                </div>
                <div style={{width: 100, "float": "right"}}>
                    
                </div>
            </LayerEditorContainer>
        );
    }
});

var ClassificationLayerEditor = React.createClass({
    render: function() {
        return (
            <LayerEditorContainer title="Classification layer" deleter={this.props.deleter}>
                <FormLabel width={170}>Classification {"function"}:</FormLabel>
                <Select name="activation" width={100} defaultValue="softmax" updater={this.props.updater} propName="classification_type" values={[{raw: "softmax", display: "Softmax"}]} />
            </LayerEditorContainer>
        );
    }
});

var LayerManager = React.createClass({
    i: -1,
    getNextId: function() {
        this.i += 1;
        return this.i;
    },
    getInitialState: function() {
        return {
            layers: []
        }
    },
    componentWillMount: function() {
        this.addLayer(new InputLayer());
        this.addLayer(new ConvLayer());
        this.addLayer(new PoolLayer());
        this.addLayer(new FullyConnectedLayer());
        this.addLayer(new ActivationLayer());
        this.addLayer(new ClassificationLayer());
    },
    updateLayer: function(uid, prop, val) {
        var idx = this.refs[uid].props.index;
        var layers = this.state.layers;
        layers[idx][prop] = val;
        this.setState({layers: layers});
        console.log("Updated property '" + prop + "' of layer " + uid + " to '" + val + "'");
    },
    addLayer: function(layer) {
        var layers = this.state.layers;
        layer.uid = this.getNextId();
        layers.push(layer);
        this.setState({layers: layers});
        console.log("Added layer '" + layer.type + "'' with uid " + layer.uid);
    },
    removeLayer: function(uid) {
        var idx = this.refs[uid].props.index;
        var layers = this.state.layers;
        layers.splice(idx, 1);
        this.setState({layers: layers});
        console.log("Removed layer with uid " + uid);
    },
    log_json: function() {
        console.log(JSON.stringify(this.state.layers));
    },
    createLayerEditor: function(layer, i) {
        var deleter = this.removeLayer.bind(null, layer.uid);
        var updater = this.updateLayer.bind(null, layer.uid);
        if (layer instanceof InputLayer)
            return (<InputLayerEditor layer={layer} deleter={deleter} key={layer.uid} index={i} ref={layer.uid} updater={updater} />);
        else if (layer instanceof ConvLayer)
            return (<ConvLayerEditor layer={layer} deleter={deleter} key={layer.uid} index={i} ref={layer.uid} updater={updater} />);
        else if (layer instanceof FullyConnectedLayer)
            return (<FullyConnectedLayerEditor layer={layer} deleter={deleter} key={layer.uid} index={i} ref={layer.uid} updater={updater} />);
        else if (layer instanceof PoolLayer)
            return (<PoolLayerEditor layer={layer} deleter={deleter} key={layer.uid} index={i} ref={layer.uid} updater={updater} />);
        else if (layer instanceof ActivationLayer)
            return (<ActivationLayerEditor layer={layer} deleter={deleter} key={layer.uid} index={i} ref={layer.uid} updater={updater} />);
        else if (layer instanceof ClassificationLayer)
            return (<ClassificationLayerEditor layer={layer} deleter={deleter} key={layer.uid} index={i} ref={layer.uid} updater={updater} />);
        else
            throw "Invalid layer: " + layer.constructor;
    },
    createChevron: function(i) {
        return (i !== this.state.layers.length-1) ? <div className="chevron">⌄</div> : null;
    },
    render: function() {
        return (
            <div>
            {
                this.state.layers.map(function(d, i) {
                    var layerEditor = this.createLayerEditor(d, i);
                    var chevron = this.createChevron(i);
                    return (
                        <div key={i}>
                            {layerEditor}
                            {chevron}
                        </div>
                    );
                }, this)
            }
            <button type="button" className="button" onClick={this.addLayer.bind(null, new InputLayer())}>Add input layer</button>
            <button type="button" className="button" onClick={this.addLayer.bind(null, new ConvLayer())}>Add convolutional layer</button>
            <button type="button" className="button" onClick={this.addLayer.bind(null, new FullyConnectedLayer())}>Add fully-connected layer</button>
            <button type="button" className="button" onClick={this.addLayer.bind(null, new PoolLayer())}>AAdd pooling layer</button>
            <button type="button" className="button" onClick={this.addLayer.bind(null, new ActivationLayer())}>Add activation layer</button>
            <button type="button" className="button" onClick={this.addLayer.bind(null, new ClassificationLayer())}>Add classification layer</button>
            <br />
            <button type="button" className="button" onClick={this.log_json}>Log json</button>
            </div>
        );
    }
});

ReactDOM.render(
    <div className="layer-editor-container">
        <LayerManager />
    </div>,
    document.getElementById('content')
);