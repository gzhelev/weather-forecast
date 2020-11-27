This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## General Information
The app displays weather forecast for Bulgaria.
A slider is implemented below the map that enables the user to see the forecast for 7 days ahead.
When a city is clicked on the map a dialog with detailed weather information is opened below the map. It stays open until the user closes it so when the slider is changed, the detailed information is also updated.
The map is rendered with a react component that maps D3 geo functions. More information below.

To start the app
- check out or download the repository
- run npm install
- run npm start

## Map component and render choice
The Map component in the app uses https://www.react-simple-maps.io/. 
The Map render component aims to be as much reusable as possible. It uses Geo data which can be downloaded from here: https://gadm.org/. The data is then parsed here https://mapshaper.org/ which generates a GeoJSON with coordinates for all the requested areas ( countries / districts etc). This way the application depends on actual Geo data ( latitude | longitude ) and not hardcoded coordinates on an image tag.
The Map component also uses another helper JSON for the district cities, which provides the localiszation for the city name and geo coordinates. With this data the labels for the cities are displayed.

Future Improvements:
- The background of the map can also be changed - for example with a PNG image of the heighmap for the country. This would require the image to be in the same scale as the map.
- Currently the geo projection for the map is hardcoded for Bulgaria. It should be calculated based on the GeoJSON.
- Add zoom functionality for the map

## Weather API choice
The weather API used in the application is https://www.worldweatheronline.com/.
This is the only API thah has free bulk execution for all district cities needed. Using this API forecast for all cities is requested in one API call which simplifies the application and reduces network cost.
The images displayed on the map are returned from the weaterAPI ( there are 90+ different images based on the weather). There were no free images with transparent background.

