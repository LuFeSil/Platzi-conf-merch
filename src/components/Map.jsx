/** @format */

import React from 'react'
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api'

const Map = ({ data }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCmjvkXB_DMnBUNwxQztLMStyQmA_szbNw',
  })
  const mapStyles = {
    height: '50vh',
    with: '100%',
  }
  const defaultCenter = {
    lat: data.lat,
    lng: data.lng,
  }
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
      <Marker position={defaultCenter} />
    </GoogleMap>
  ) : (
    <>No se ha podido cargar el mapa :(</>
  )
}

export default Map
