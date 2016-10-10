var Header = React.createClass({
    render: function() {
        return (
            <div className="header">{this.props.title || "Title"}</div>
        );
    }
});

ReactDOM.render(
    <Header title="Neural Networks" />,
    document.getElementById('header')
);