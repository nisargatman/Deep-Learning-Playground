var Navbar = React.createClass({
    render: function() {
        return (
            <ul className="navbar">
                {
                    this.props.links.map(function(d, i) {
                        return <li key={i}><a href={d.url} className={d.active ? "active" : "not-active"}>{d.display}</a></li>;
                    }, this)
                }
            </ul>
        );
    }
});

ReactDOM.render(
    <Navbar links={[{url: "index.html", display: "Home", active: true}, {url: "about.html", display: "About", active: false}]} />,
    document.getElementById('navbar')
);