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
    })

    // const filtred = fake.filter(({
    //   id, first_name, last_name, email, gender, ip_address
    // }) => (
    //   first_name.indexOf(value) !== -1 ||
    //   last_name.indexOf(value) !== -1 ||
    //   ip_address.indexOf(value) !== -1 ||
    //   email.indexOf(value) !== -1
    // ));

    // this.setState({
    //   fake: filtred
    // });
  }
  onFilterCss(fakeItem) {
    const {
      id, first_name, last_name, email, gender, ip_address
    } = fakeItem;

    const { value } = this.state;
    if (value === '') return true;

    return (
      first_name.indexOf(value) !== -1 ||
      last_name.indexOf(value) !== -1 ||
      ip_address.indexOf(value) !== -1 ||
      email.indexOf(value) !== -1
    )
  }
  render() {
    return (
      <div className="App">
        <input type="text" onChange={this.onFilter} />
        {
          this.state.fake.map((f) => (           
            <Row
              {...f}
              value={this.st}
            />
          ))
        }
      </div>
    );
  }
}

class Row extends PureComponent {
  render() {
    const {  id, first_name, last_name, email, gender, ip_address } = this.props;
    console.log('Rendered:', id);
    return (
      <div key={`id-${id}`} className="row">
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
