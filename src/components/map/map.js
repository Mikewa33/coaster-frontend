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
    }

    componentWillMount(){
        this.props.getParks()
    }

    projection() {
        return geoTimes()
        .translate([this.props.width/2, this.props.height/2])
        .scale(80)
    }

    ifOperating(park,i, width){
        //ark.status == "Operating" && park.coasters.length > 10
        if (park.status == "Operating" && park.coasters.length > 5 && park.long && park.lat){
          return (
            <Marker
                key={i}
                marker= {{name: park.name, coordinates: [park.long, park.lat] }}
                style={{
                    default: { fill: "#FF5722" },
                    hover: { fill: "#FFFFFF" },
                    pressed: { fill: "#FF5722" },
            }}>
                <circle
                    cx={0}
                    cy={0}
                    r={1}
                    style={{
                        stroke: "#FF5722",
                        strokeWidth: width,
                        opacity: 0.9,
                }}/>
                <text
                    textAnchor="middle"
                    className="park-name"
                    y={park.markerOffset}
                    style={{
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
        console.log(geography)
        console.log(path.centroid(geography))
        const centroid = this.projection().invert(path.centroid(geography))
        this.setState({
          center: centroid,
          zoom: 35,
          currentCountry: geography.properties.name,
        })
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
                            fill: "#607D8B",
                            stroke: "#607D8B",
                            strokeWidth: 0.01,
                            outline: "none",
                          },
                          pressed: {
                            fill: "#FF5722",
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