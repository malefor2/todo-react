import React from 'react';
import './App.css';

//TODO:
//saving object array(localstorage)

class Item extends React.Component {
  render(){
    if(this.props.render){
      return(
        <div className="listItem" >
          <li onClick={() => this.props.changeClass(this.props.id)}
              className={((this.props.done) ? "done" : "notDone")}>
            {this.props.text}
          </li>
          <button onClick={() => this.props.remove(this.props.id)}>x</button>
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
      items: [
        {key: 10, text: "item1", done: true, render: true},
        {key: 11, text: "item2", done: false, render: true},
        {key: 21, text: "item4", done: false, render: true}
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
    this.changeCls = this.changeCls.bind(this);
  }
  handleChange(event){
    this.setState({inText: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    if(this.state.inText.length > 0){
      let o = {key: this.state.inputI,
              text: this.state.inText,
              done: false,
              render: true};
      this.state.items.push(o);
      this.setState({inputI: this.state.inputI+1});
    }else{
      alert("too short");
      console.log(this.state.items);
      return;
    }
    this.setState({inText: ''});
  }
  removeListItem(it){
    let ar = this.state.items.slice();
    let i = ar.indexOf(
      ar.find(i => i.key === it)
    );
    ar.splice(i, 1);
    this.setState({items: ar});
  }
  changeCls(it){
    let item = this.state.items.find(i => i.key === it);
    let ar = this.state.items.slice();
    item.done = !item.done;
    this.setState({items: ar});
  }
  renderItems(){
    let items = this.state.items.filter(item => !item.done);
    console.log(items);
    items = items.map(
      (t) => <Item remove={this.removeListItem}
                   text={t.text}
                   key={t.key}
                   id={t.key}
                   done={t.done}
                   render={t.render}
                   changeClass={this.changeCls}
                   />
    );
    return(items);
  }
  renderDone(){
    let items = this.state.items.filter(item => item.done);
    console.log(items);
    items = items.map(
      (t) => <Item remove={this.removeListItem}
                   text={t.text}
                   key={t.key}
                   id={t.key}
                   done={t.done}
                   render={t.render}
                   changeClass={this.changeCls}
                   />
    );
    return(items);
  }
  render(){
    return (
      <div id="wrapper">
        <form>
          <input id="i" type="text" value={this.state.inText} onChange={this.handleChange}/>
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </form>
        <ul id="notDone">TODO:
          {this.renderItems()}
        </ul>
        <ul id="done">DONE:
          {this.renderDone()}
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
