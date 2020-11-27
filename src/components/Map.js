import geogr from '../resources/Bulgaria_map_geo.json'
import townCoordinates from '../resources/DistrictCityData.json'
import React from 'react';
import {ComposableMap, Geographies, Geography, Marker} from "react-simple-maps";
import Slider from './Slider'
import {useSelector, useDispatch} from 'react-redux';
import {handleTownSelect} from '../features/mapSlice'


/* 
    Main logic for rendering the map is here.
    <ComposableMap> receives the geography parameter( geoJSON - Bulgaria_map_geo.json), scale for the SVG image and geographical projection
    <Geographies> represent each polygon ( in this case district area ) for the map
    <Markers> are the labels for each district town. DistrictCityData.json is used for the predefined geo coordinates of the cities and display names 
*/

function Map() {
    const dispatch = useDispatch();
    const townData = useSelector(state => state.map.townsData);
    const selectedDate = useSelector(state => state.map.selectedDate);
    const loadingStatus = useSelector(state => state.map.loadingStatus);

    return (
        <div className="map">
            <ComposableMap
                width={800}
                height={500}
                projectionConfig={{ // these are the parameters for the geographic projection for Bulgaria. If the projection is not correct, the map will not be translated correctly.
                    scale: 8000,
                    center: [25.4, 42.5]
                }}
            >
                <Geographies geography={geogr}>
                    {({geographies}) => geographies.map(geo => <Geography stroke="lightgrey" fill="#fefee4" key={geo.rsmKey} geography={geo}></Geography>)}
                </Geographies>
                
                {loadingStatus === "succeeded" && townCoordinates // Markers need the forecast data so the render is done when the async thunk is fullfiled
                    .towns
                    .map((town, i) => {
                        return (
                            <Marker
                                className="town-info-map"
                                key={i}
                                onClick={() => { // calls the action that displays the additional dialog
                                    dispatch(handleTownSelect(town.townName))
                                }}
                                coordinates={[town.lat, town.long]}
                                >

                                <image
                                    href={townData[town.townName][selectedDate].weatherIcon}
                                    width={24}
                                    height={24}
                                    dy={0}
                                    x={0}
                                    y={-10}
                                    dx={0}/>
                                <g>
                                    <text x={28} textAnchor="left" fill="#000">
                                        <tspan>{town.titleToDisplay}</tspan>
                                        <tspan x="28" dy="14">{townData[town.townName][selectedDate].mintempC}&#8451; | {townData[town.townName][selectedDate].maxtempC}&#8451;</tspan>
                                    </text>
                                </g>
                            </Marker>
                        )
                    })
                }

            </ComposableMap>
            <Slider/>
        </div>
    )
}

export default Map;