import React, { Component, PureComponent } from 'react';
// import logo from './logo.svg';
import fake from './fake.json';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      fake,
      value: '',
    };
    this.onFilter = this.onFilter.bind(this);
    this.flag = true;
    this.subscribers = [];
  }
  shouldComponentUpdate() {
    return this.flag;
  }
  componentDidMount() {
    this.flag = false;
  }
  onFilter(evt) {
    const { target: { value }} = evt;
    this.setState({
      value,
    });
    this.subscribers.forEach(subscriber => subscriber(value));
  }
  subscribe = (subscriber) => {
    this.subscribers.push(subscriber);
  };

  render() {

    return (
      <div className="App">
        <input type="text" onChange={this.onFilter} />
        {
          this.state.fake.map((f) => (
            <Row
              {...f}
              subscribe={this.subscribe}
            />
          ))
        }
      </div>
    );
  }
}

class Row extends PureComponent {
  componentDidMount() {
    const { subscribe, first_name, last_name, email, ip_address } = this.props;
    subscribe(
      (value) => {
        value === ''
      ?
        this.row.className = 'row show'
      :
        (
          first_name.indexOf(value) !== -1 ||
          last_name.indexOf(value) !== -1 ||
          ip_address.indexOf(value) !== -1 ||
          email.indexOf(value) !== -1
          ?
            this.row.className = 'row show'
          :
            this.row.className = 'row hide'
        );
      }
    );
  }

  render() {
    const {  id, first_name, last_name, email, gender, ip_address } = this.props;
    console.log('Rendered:', id);

    return (
      <div key={`id-${id}`} className="row" ref={(el) => {this.row = el}} >
        <span>{first_name}</span>
        <span>{last_name}</span>
        <span>{email}</span>
        <span>{gender}</span>
        <span>{gender}</span>
        <span>{ip_address}</span>
      </div>
    );
  }
}
export default App;
