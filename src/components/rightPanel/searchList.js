import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import ParkList from './parkList'
import CoasterList from './coasterList'
import ParkDetail from './parkDetail';
import CoasterDetail from './coasterDetail';

require('../../../styles/rightPanel.scss');


class SearchList extends Component {
    constructor(props){
        super(props)

        this.state = {
            searchTeam: '',
            currentlyDisplayedParks: this.props.parks,
            currentlyDisplayedCoasters: this.props.coasters,
            selectedPark: null,
            selectedCoaster: null
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.selectPark = this.selectPark.bind(this);
        this.selectCoaster = this.selectCoaster.bind(this);
        this.backArrowPark = this.backArrowPark.bind(this);
        this.backArrowCoaster = this.backArrowCoaster.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.parks.length !== this.props.parks.length) {
          this.setState({ currentlyDisplayedParks: nextProps.parks, currentlyDisplayedCoasters: nextProps.coasters});
        }
      }

    onInputChange(event) {
        //Make all names lowercase
        const target_value = event.target.value.toLowerCase()
        let newDisplayParks, newDisplayCoasters;
        if (target_value.length > 0){
            newDisplayParks = this.props.parks.filter(park => park.name.toLowerCase().includes(target_value));
            newDisplayCoasters = this.props.coasters.filter(coaster => coaster.name.toLowerCase().includes(target_value));
        }else {
            newDisplayParks = this.props.parks;
            newDisplayCoasters = this.props.coasters;
        }
        this.setState({
            searchTeam: event.target.value,
            currentlyDisplayedParks: newDisplayParks,
            currentlyDisplayedCoasters: newDisplayCoasters
        })
    }

    parkHeader(){
        if(this.state.currentlyDisplayedParks.length != 0)
        {
            return (<div className="park-header-bar">Parks</div>)
        }
    }

    coasterHeader(){
        if(this.state.currentlyDisplayedCoasters.length != 0)
        {
            return (<div className="coaster-header-bar">Coasters</div>)
        }
    }

    selectPark(park){
        this.setState({selectedPark: park })
    }

    selectCoaster(coaster){
        this.setState({selectedCoaster: coaster })
    }

    backArrowPark(){
        this.setState({selectedPark: null })
    }
    //This is so in park we can go back when selecting a coaster in park
    backArrowCoaster(){
        his.setState({selectedCoaster: null })
    }


    renderListOrDetail(){
        if(this.state.selectedCoaster != null){
            return (<CoasterDetail coaster={this.state.selectedCoaster} selectPark={this.selectPark} backArrow={this.backArrow} />)
        }
        else if(this.state.selectedPark != null){
            return (<ParkDetail park={this.state.selectedPark} selectCoaster={this.selectCoaster} backArrow={this.backArrowPark} />)
        }else if(this.state.searchTeam.length == 0){
            return (
                <div className="search-list">
                    <input type="text" placeholder="Search.." value={this.state.searchTeam} onChange={this.onInputChange}></input>
                    {this.parkHeader()}
                    {this.state.currentlyDisplayedParks.map((park, i) => (
                        <ParkList key={i} value={i} selectPark={this.selectPark} park={park}  />
                    ))}
                </div>
            );
        }else{
            return (
                <div className="search-list">
                    <input type="text" placeholder="Search.." value={this.state.searchTeam} onChange={this.onInputChange}></input>
                    {this.parkHeader()}
                    {this.state.currentlyDisplayedParks.map((park, i) => (
                        <ParkList key={i} value={i} selectPark={this.selectPark}  park={park}  />
                    ))}
                    {this.coasterHeader()}
                    {this.state.currentlyDisplayedCoasters.map((coaster, i) => (
                        //Look into changing coaster so it has park inside it
                        <CoasterList key={i+10000} value={i+10000} selectCoaster={this.selectCoaster} coaster={coaster}/>
                    ))}
                </div>
            );
        }
    }

    render() {
        return (this.renderListOrDetail())
    }
}

function mapStateToProps(state) {
    return {
        parks: state.park.parks,
        coasters: state.park.coasters
    };
    
}

export default connect(mapStateToProps)(SearchList);