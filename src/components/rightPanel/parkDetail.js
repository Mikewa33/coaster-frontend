import React from 'react';
import { Component } from 'react';
import * as actions from '../../actions/parkAction';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faChevronLeft } from '@fortawesome/free-solid-svg-icons'

require('../../../styles/rightPanel.scss');

class ParkDetail extends Component {
  constructor(props){
    super(props)

    this.visitButtons = this.visitButtons.bind(this);
    this.visitClick = this.visitClick.bind(this);
    this.plusClick = this.plusClick.bind(this);
    this.minusClick = this.minusClick.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.submitForm = this.submitForm.bind(this);
}

  componentWillMount(){
    this.props.getParkInfo(this.props.park.id)
  }

  handleKeypress (e) {
    const characterCode = e.key
    console.log(characterCode)
    if (characterCode === 'Backspace') return

    const characterNumber = Number(characterCode)
    if (characterNumber >= 0 && characterNumber <= 9) {
      if (e.currentTarget.value && e.currentTarget.value.length) {
        return
      }
    } else {
      e.preventDefault()
    }
  }


  visitButtons(){
    if(this.props.current_park.has_visited){
      return (<div><button type="button" disabled>You visited this park</button></div>)
    }else{
      return (<div><button type="button" onClick={this.visitClick}>Park visited?</button></div>)
    }
  }

  visitClick(){
    this.props.setParkVist(this.props.park.id, 1)
  }

  plusClick(){
    this.props.setParkVist(this.props.park.id, 1)
  }

  minusClick(){
    this.props.setParkVist(this.props.park.id, -1)
  }

  submitForm(){
    let form_value = document.getElementById('park-visit-text-input').value;
    this.props.setParkVist(this.props.park.id, form_value)
  }

  render() {
    return (
      <div className="park-tab">
        <div className="back-tab">
          <FontAwesomeIcon icon={faChevronLeft} onClick={this.props.backArrow} />
        </div>
        {this.props.park.name}
        <div className="park-visit-count">{this.props.current_park.visit_count || 0}</div>
        {this.visitButtons()}
        <button type="button" onClick={this.minusClick}>-</button>
        <button type="button" onClick={this.plusClick}>+</button>
        <input type='number' onKeyDown={this.handleKeypress} min='0' step='1' id="park-visit-text-input"></input>
        <button type="button" onClick={this.submitForm}>Submit Visit Count</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      current_park: state.park.current_park
    };
    
}

export default connect(mapStateToProps, actions)(ParkDetail);