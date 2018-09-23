import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/parkAction';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps"
import { geoPath } from "d3-geo"
import { geoTimes } from "d3-geo-projection"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons'

require('../../../styles/map.scss');

const wrapperStyles = {
    width: "100%",
    maxWidth: "70%",
    display: "inline-block"
  }
  


class Map extends Component {
    static defaultProps = {
        width: 800,
        height: 450,
      }
    constructor() {
        super()
        this.state = {
          center: [0,20],
          zoom: 1,
          currentCountry: null,
          marks: []
        }
        this.projection = this.projection.bind(this);
        this.handleGeographyClick = this.handleGeographyClick.bind(this);
        this.ifOperating = this.ifOperating.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOff = this.mouseOff.bind(this);
        this.handleMarkerClick = this.handleMarkerClick.bind(this);
    }

    componentWillMount(){
        this.props.getParks()
    }

    projection() {
        return geoTimes()
        .translate([this.props.width/2, this.props.height/2])
        .scale(80)
    }

    mouseOver(){
      console.log("MOUSE ON")
    }

    mouseOff(){
      console.log("mOUSE")
    }

    zoomIn(){
      if(this.state.zoom < 35){
        this.setState({zoom: this.state.zoom + 5})
      }
    }

    zoomOut(){
      if(this.state.zoom > 1){
        if (this.state.zoom - 5 === 1){
          this.setState({zoom: this.state.zoom - 5, center: [0,20]})
        }else{
          this.setState({zoom: this.state.zoom - 5})
        }
        
      }
    }

    ifOperating(park,i, width){
        //ark.status == "Operating" && park.coasters.length > 10
        let coasters_need = 5
        if (this.state.zoom > 30){
          coasters_need = 1
        }else if(this.state.zoom > 20){
          coasters_need = 3
        }
        if (park.status == "Operating" && park.coasters.length > coasters_need && park.long && park.lat){
          return (
            <Marker
              key={i}
              onClick={this.handleMarkerClick}
              marker={{name: park.name, coordinates: [park.long, park.lat] }}
              style={{
                default: { stroke: "#455A64" },
                hover: { stroke: "green" },
                pressed: { stroke: "#FF5722" },
            }}>
              <circle
                r={5}
                className="park-mark"
                style={{
                stroke: "#FF5722",
                strokeWidth: 1,
                opacity: 0.9,
              }}/>
              <text
                textAnchor="middle"
                className="park-name"
                style={{
                  transform: "translate(0px,-10px)",
                  fontFamily: "Roboto, sans-serif",
                  fill: "#607D8B",
                  display: "none"
              }}>
                {park.name}
              </text>
            </Marker>
        )
        }else{
          return null
        }
    }

    handleGeographyClick(geography) {
        // geography looks something like this:
        // { type: "Feature",  properties: {...}, geometry: {...} }
        const path = geoPath().projection(this.projection())
        const centroid = this.projection().invert(path.centroid(geography))
        console.log(centroid)
        this.setState({
          center: centroid,
          zoom: 6,
          currentCountry: geography.properties.name,
        })
    }

    handleMarkerClick(event) {
      console.log(event)
      if(this.state.zoom != 36){
        this.setState({
          center: event.coordinates,
          zoom: 36
        })
      }else{
        this.setState({
          center: event.coordinates
        })
      }
      
    }



    render() {
        var map_style_1 = { display: "block"}
        var map_style_2 = { display: "none" }
        if(this.state.zoom >= 6){
          map_style_1 = { display: "none" }
          map_style_2 = { display: "block" }
        }
        return (
          <div style={wrapperStyles}>
            <div className="map-buttons">
              <FontAwesomeIcon icon={faSearchPlus} onClick={this.zoomIn} />
              <FontAwesomeIcon icon={faSearchMinus} onClick={this.zoomOut}/>

            </div>
            <div style={map_style_1}>
              <ComposableMap
                projectionConfig={{
                  scale: 205,
                  rotation: [-11,0,0],
                }}
                width={980}
                height={551}
                style={{
                  width: "100%",
                  height: "auto",
                }}>
                <ZoomableGroup center={this.state.center} zoom={this.state.zoom} disablePanning>
                  <Geographies geography="/static/world-50m.json">
                    {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        onClick={this.handleGeographyClick}
                        style={{
                          default: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.1,
                            outline: "none",
                          },
                          hover: {
                            fill: "#607D8B",
                            stroke: "#607D8B",
                            strokeWidth: 0.1,
                            outline: "none",
                          },
                          pressed: {
                            fill: "#FF5722",
                            stroke: "#607D8B",
                            strokeWidth: 0.1,
                            outline: "none",
                          },
                        }}
                      />
                    ))}
                  </Geographies>
                  <Markers>
                    {this.props.parks.map((marker, i) => (
                      this.ifOperating(marker,i, 1)
                    ))}
                  </Markers>
                </ZoomableGroup>
              </ComposableMap>
            </div>
            <div style={map_style_2}>
              <ComposableMap
                projectionConfig={{
                  scale: 205,
                  rotation: [-11,0,0],
                }}
                width={980}
                height={551}
                style={{
                  width: "100%",
                  height: "auto",
                }}
                >
                <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
                  <Geographies geography="/static/state_3.json">
                    {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.01,
                            outline: "none",
                          },
                          hover: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.01,
                            outline: "none",
                          },
                          pressed: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.01,
                            outline: "none",
                          },
                        }}
                      />
                    ))}
                  </Geographies>
                  <Markers>
                    {this.props.parks.map((marker, i) => (
                      this.ifOperating(marker,i, 20)
                    ))}
                  </Markers>
                </ZoomableGroup>
              </ComposableMap>
            </div>
          </div>
        )
      }
}
    
function mapStateToProps(state) {
    return { parks: state.park.parks || [] };
}
      
export default connect(mapStateToProps, actions)(Map);