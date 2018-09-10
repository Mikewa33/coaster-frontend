import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

require('../../../styles/rightPanel.scss');


class SearchList extends Component {
    constructor(props){
        super(props)

        this.state = {
            searchTeam: '',
            currentlyDisplayedParks: this.props.parks,
            currentlyDisplayedCoasters: this.props.coasters,
        }
        this.onInputChange = this.onInputChange.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.parks.length !== this.props.parks.length) {
          this.setState({ currentlyDisplayedParks: nextProps.parks, currentlyDisplayedCoasters: nextProps.coasters});
        }
      }

    onInputChange(event) {
        //Make all names lowercase
        let newDisplayParks = this.props.parks.filter(park => park.name.toLowerCase().includes(event.target.value.toLowerCase()));
        let newDisplayCoasters = this.props.coasters.filter(coaster => coaster.name.toLowerCase().includes(event.target.value.toLowerCase()));
        console.log(newDisplayParks.length)
        console.log(newDisplayCoasters.length)
        this.setState({
            searchTeam: event.target.value,
            currentlyDisplayedParks: newDisplayParks,
            currentlyDisplayedCoasters: newDisplayCoasters
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="search-list">
                <input type="text" placeholder="Search.." value={this.state.searchTeam} onChange={this.onInputChange}></input>
                {this.state.currentlyDisplayedParks.map((park, i) => (
                    (<div key={i} >{park.name}</div>)
                ))}
                {this.state.currentlyDisplayedCoasters.map((coaster, i) => (
                    (<div key={i+10000}>{coaster.name}</div>)
                ))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        parks: state.park.parks,
        coasters: state.park.coasters
    };
    
}

export default connect(mapStateToProps)(SearchList);