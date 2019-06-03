import React from 'react';
import './App.css';

//TODO:
//finish node cleanup

class Item extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      done: false,
      render: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  handleClick(){
    this.setState({done: !this.state.done});
  }
  deleteItem(){
    if(typeof this.props.id === 'number'){
      this.props.remove(this.props.id);
      this.setState({render: false});
    }
    else return;
  }
  render(){
    if(this.state.render){
      return(
        <div className="listItem" >
          <li onClick={this.handleClick}
            className={((this.state.done) ? "done" : "notDone")}>
            {this.props.text}
          </li><button onClick={this.deleteItem}>x</button>
        </div>
      );
    }else return null;
  }
}

class List extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inText: '',
      inputI: 0,
      items: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
  };
  handleChange(event){
    this.setState({inText: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    if(this.state.inText.length > 0){
      this.state.items.push([this.state.inputI, this.state.inText]);
      this.setState({inputI: this.state.inputI+1})
    }else{
      alert("too short");
      console.log(this.state.items);
      return;
    }
    this.setState({inText: ''});
  }
  removeListItem(it){
    //let n = this.state.items;

    //n.splice(n.indexOf(it))
    //this.setState({items: n});
    //this.setState(this.state.items.splice(this.state.items[i],1));
  }
  renderItems(){
    let items = this.state.items.map(
      (t) => <Item remove={this.removeListItem}
                   text={t[1]}
                   key={t[0]}
                   id={t[0]} />
    );
    console.log(items);
    return(items);
  }
  render(){
    return (
      <div id="wrapper">
        <form>
          <input id="i" type="text" value={this.state.inText} onChange={this.handleChange}/>
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </form>
        <ul id="notDone">
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}

class App extends React.Component {
  render(){
    return(
      <List />
    );
  }
}

export default App;
