//.map {
//    height: 300px;
//}

//@media screen and(min - width: 1024px){
//    .map {
//        height: 500px;
//    }
//}

import React, { PropTypes } from "react"

import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"

import iconMarker from "./assets/iconMarker.svg"
import iconMarkerHover from "./assets/iconMarkerHover.svg"

import styles from "./index.css"

const MY_API_KEY = "AIzaSyDwsdjfskhdbfjsdjbfksiTgnoriOAoUOgsUqOs10J0" // fake

const Map = ({ googleMaps }) => (
    // GoogleMap component has a 100% height style.
    // You have to set the DOM parent height.
    // So you can perfectly handle responsive with differents heights.
    <div className={styles.map}>
        <GoogleMap
            googleMaps={googleMaps}
            // You can add and remove coordinates on the fly.
            // The map will rerender new markers and remove the old ones.
            coordinates={[
                {
                    title: "Toulouse",
                    position: {
                        lat: 43.604363,
                        lng: 1.443363,
                    },
                    onLoaded: (googleMaps, map, marker) => {
                        // Set Marker animation
                        marker.setAnimation(googleMaps.Animation.BOUNCE)

                        // Define Marker InfoWindow
                        const infoWindow = new googleMaps.InfoWindow({
                            content: `
                <div>
                  <h3>Toulouse<h3>
                  <div>
                    Toulouse is the capital city of the southwestern
                    French department of Haute-Garonne,
                    as well as of the Occitanie region.
                  </div>
                </div>
              `,
                        })

                        // Open InfoWindow when Marker will be clicked
                        googleMaps.event.addListener(marker, "click", () => {
                            infoWindow.open(map, marker)
                        })

                        // Change icon when Marker will be hovered
                        googleMaps.event.addListener(marker, "mouseover", () => {
                            marker.setIcon(iconMarkerHover)
                        })

                        googleMaps.event.addListener(marker, "mouseout", () => {
                            marker.setIcon(iconMarker)
                        })

                        // Open InfoWindow directly
                        infoWindow.open(map, marker)
                    },
                }
            ]}
            center={{ lat: 43.604363, lng: 1.443363 }}
            zoom={8}
            onLoaded={(googleMaps, map) => {
                map.setMapTypeId(googleMaps.MapTypeId.SATELLITE)
            }}
        />
    </div>
)

ap.propTypes = {
    googleMaps: PropTypes.object.isRequired,
}

export default GoogleMapLoader(Map, {
    libraries: ["places"],
    key: MY_API_KEY,
})
