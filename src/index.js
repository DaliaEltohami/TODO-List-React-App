//components
//props & states

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      product: "",
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleInput = (e) => {
      this.setState({
        product: e.target.value,
      });
    };
    this.handleSubmit = (e) => {
      e.preventDefault();
      if (this.state.product) {
        let products = [
          ...this.state.products,
          {
            id: Math.random(),
            name: this.state.product,
          },
        ];
        this.setState({
          products,
          product: "",
        });
      } else {
        alert("please insert product values");
      }
    };
  }
  handleDelete(id) {
    let products = [...this.state.products];
    let filteredProducts = products.filter((product) => product.id != id);
    this.setState({
      products: filteredProducts,
    });
  }
  render() {
    return (
      <div>
        <Header />
        <ListItems
          products={this.state.products}
          handleDelete={this.handleDelete}
        />
        <AddItem
          handleSubmit={this.handleSubmit}
          handleInput={this.handleInput}
          value={this.state.product}
        />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>TODO List React App</h1>
      </div>
    );
  }
}

class ListItems extends React.Component {
  render() {
    return (
      <div>
        {this.props.products.length == 0 && <div>There is no products</div>}
        {this.props.products.map((product) => (
          <Item product={product} handleDelete={this.props.handleDelete} />
        ))}
      </div>
    );
  }
}

class Item extends React.Component {
  render() {
    let product = this.props.product;
    return (
      <div>
        {product.name}{" "}
        <button onClick={() => this.props.handleDelete(product.id)}>
          Delete
        </button>
      </div>
    );
  }
}

class AddItem extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <input
            type="text"
            onChange={this.props.handleInput}
            value={this.props.value}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
