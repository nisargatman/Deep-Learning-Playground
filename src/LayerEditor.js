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

var LayerEditor = React.createClass({
    getInitialState: function() {
        return {
            editing: false
        };
    },
    renderInput: function() {
        return (
            <div className="layer-editor">
                <LayerEditorHeader deleter={this.props.deleter.bind(null, this.props.index)} title="Input layer" />
                <div className="layer-editor-content">
                    Input size: <input type="number" defaultValue={10} /> × <input type="number" defaultValue={10} /><br />
                    Channels: <input type="number" defaultValue={3} />
                </div>
            </div>
        );
        
    },
    renderConv: function() {
        return (
            <div className="layer-editor">
                <LayerEditorHeader deleter={this.props.deleter.bind(null, this.props.index)} title="Convolutional layer" />
                <div className="layer-editor-content">
                    Filter size: <input type="number" defaultValue={5} /> × <input type="number" defaultValue={5} />  <br />
                    Depth: <input type="number" defaultValue={32} /> <br />
                    Stride: <input type="number" defaultValue={1} /> <input type="number" defaultValue={1} /> <input type="number" defaultValue={1} /> <input type="number" defaultValue={1} /> <br />
                    Padding:
                    <select name="padding" defaultValue="same">
                      <option value="same">Same</option>
                      <option value="valid">Valid</option>
                    </select>
                </div>
            </div>
        );
    },
    renderFull: function() {
        return (
            <div className="layer-editor">
                <LayerEditorHeader deleter={this.props.deleter.bind(null, this.props.index)} title="Fully-connected layer" />
                <div className="layer-editor-content">
                    Output size: <input type="number" defaultValue={10} /> × <input type="number" defaultValue={10} />  <br />
                </div>
            </div>
        );
    },
    render: function() {
        if (this.props.type == "input")
            return this.renderInput();
        else if (this.props.type == "conv")
            return this.renderConv();
        else if (this.props.type == "full")
            return this.renderFull();
        else
            throw "Invalid layer type" + this.props.type;
    }
});

var LayerManager = React.createClass({
    getInitialState: function() {
        return {layers: ["input", "conv", "full"]}
    },
    addLayerEditor: function(type) {
        var layers = this.state.layers;
        layers.push(type);
        this.setState({layers: layers});
    },
    removeLayerEditor: function(i) {
        var layers = this.state.layers;
        layers.splice(i, 1);
        this.setState({layers: layers});
    },
    render: function() {
        return (
            <div>
            {this.state.layers.map(function(d, i) {
                return (
                    <LayerEditor type={d} key={i} index={i} deleter={this.removeLayerEditor}></LayerEditor>
                );
            }, this)}
            <button type="button" className="button" onClick={this.addLayerEditor.bind(null, "input")}>Add input layer</button>
            <button type="button" className="button" onClick={this.addLayerEditor.bind(null, "conv")}>Add convolutional layer</button>
            <button type="button" className="button" onClick={this.addLayerEditor.bind(null, "full")}>Add fully-connected layer</button>
            </div>
        );
    }
});

ReactDOM.render(
    <div className="layer-editor-container">
        <LayerManager />
    </div>,
    document.getElementById('example')
);