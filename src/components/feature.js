import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/parkAction';
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

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}


class Feature extends Component {
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
  handleGeographyClick(geography) {
    // geography looks something like this:
    // { type: "Feature",  properties: {...}, geometry: {...} }
    const path = geoPath().projection(this.projection())
    const centroid = this.projection().invert(path.centroid(geography))
    console.log(centroid)
    console.log(geography)
    this.setState({
      center: centroid,
      zoom: 6,
      currentCountry: geography.properties.name,
    })
  }

  ifOperating(park,i){
    if (park.status == "Operating" && park.coasters.length > 10){
      return (
        <Marker
                  key={i}
                  marker= {{name: park.name, coordinates: [park.long, park.lat] }}
                  style={{
                    default: { fill: "#FF5722" },
                    hover: { fill: "#FFFFFF" },
                    pressed: { fill: "#FF5722" },
                  }}
                  >
                  <circle
                    cx={0}
                    cy={0}
                    r={1}
                    style={{
                      stroke: "#FF5722",
                      strokeWidth: 5,
                      opacity: 0.9,
                    }}
                  />
                  <text
                    textAnchor="middle"
                    y={park.markerOffset}
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fill: "#607D8B",
                    }}
                    >
                  </text>
                  
                </Marker>
      )
    }else{
      return null
    }

  }

  render() {
    var map_style_1 = {
      display: "block"
    }

    var map_style_2 = {
      display: "none"
    }
    if(this.state.zoom >= 6){
      map_style_1 = {
        display: "none"
      }
  
      map_style_2 = {
        display: "block"
      }
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
            }}
            >
            <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
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
                  this.ifOperating(marker,i)
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
              <Geographies geography="/static/state_2.json">
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
                  this.ifOperating(marker,i)
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

export default connect(mapStateToProps, actions)(Feature);