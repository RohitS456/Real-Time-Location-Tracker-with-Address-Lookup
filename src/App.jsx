import { useState } from 'react';
import './App.css';

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState('');

  const geo = navigator.geolocation;

  const watchId = geo.watchPosition(location);

  function location(position) {
    let newLatitude = position.coords.latitude;
    let newLongitude = position.coords.longitude;
    setLatitude(newLatitude);
    setLongitude(newLongitude);
  }

  const getAddress = async () => {
    let url = (`https://api.opencagedata.com/geocode/v1/json?key=2b46f105534641028b3951cf02b8c60c&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`);
    const loc = await fetch(url);
    const data = await loc.json();
    setAddress(data.results[0].formatted);
  }

  function fetchAddress() {
    getAddress();
  }

  function stopAddress() {
    geo.clearWatch(watchId);
    alert("Tracking Stopped");
  }

  return (
    <>
      <h1>Current Location Tracking :)</h1>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <button onClick={fetchAddress} className='btn-get'>Get Address</button>
      <h3>Address: {address}</h3>
      <br />
      <button onClick={stopAddress}>Stop Tracking</button>
    </>
  );
}

export default App;
