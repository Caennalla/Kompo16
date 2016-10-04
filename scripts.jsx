var Product = React.createClass({
  getInitialState: function(){
    return {qty: 0};  
  },
  
  buy: function(){
    this.setState({qty: this.state.qty + 1});
    this.props.handleTotal(this.props.price);
  },
  
  show: function(){
    this.props.handleShow(this.props.name);
  },
  
  render: function(){
    return (
      <div>
       <p>{this.props.name} - €{this.props.price}</p>
       <button onClick={this.buy}>Buy</button>
       <button onClick={this.show}>Show</button>
       <h3>Qty: {this.state.qty} item(s)</h3>
       <hr/>
      </div>
    );
  }
});
///////
var Total = React.createClass({
  render: function(){
    return (
      <div>
        <h3>Total Cash: {this.props.total} </h3>
      </div>
    );
  }  
});
////////
var ProductForm = React.createClass({
  submit: function(e){
      e.preventDefault();
      
      var product = {
        name: this.refs.name.value,
        price: parseInt(this.refs.price.value)
      }

      this.props.handleCreate(product);
      
      this.refs.name.value = "";
      this.refs.price.value = "";
  },
  
  render: function(){
    return(
      <form onSubmit={this.submit}>
        <input type="text" placeholder="Product name" ref="name"/>-
        <input type="text" placeholder="Product price" ref="price"/>
        <br/>
        <button>Create Product</button>
      </form>
    );
    
  }
  
});
///////
var Productlist = React.createClass({
  getInitialState: function(){
    return {
      total: 0,
      productList:[
        {name: "Android", price: 121},  
        {name: "iPhone", price: 500},
        {name: "Nokia", price: 30}
      ]
    };
  },
  
  calculateTotal: function(price){
    this.setState({total: this.state.total + price});
  },
  
  showProduct: function(name){
    alert("You selected " + name);  
  },

  createProduct: function(product){
    this.setState({
     productlist: this.state.productList.concat(product)
    })
  },
  
  render: function(){
    var component = this;
    var products = this.state.productList.map(function(product){
      return (
        <Product  name={product.name} price={product.price}
                  handleShow={component.showProduct}
                  handleTotal={component.calculateTotal}/>
      );  
      
    });
    
    return (
      <div>
        <ProductForm handleCreate={this.createProduct}/>
        {products}
        <Total total={this.state.total}/>
      </div>
    );
  }  
});

ReactDOM.render(<Productlist/>, document.getElementById("root"));
