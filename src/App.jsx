import { useState } from 'react'

import './App.css'

function App() {
 const [latitude,setLatitude]=useState();
 const [longitude,setLongitude]=useState();
 const[adress,setadress]=useState()

 const geo=navigator.geolocation;

const watchId= geo.watchPosition(location)
 function location(position){
  let Newlatitude=position.coords.latitude;
  let NewLongitude=position.coords.longitude;
  setLatitude(Newlatitude);
  setLongitude(NewLongitude);
 }
 const getAddress= async()=>{
  let url=`https://api.opencagedata.com/geocode/v1/json?key=2b46f105534641028b3951cf02b8c60c&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;
  const loc= await fetch(url);
  const data=await loc.json();
  setadress(data.results[0].formatted);
 }
 function address(){
  getAddress();
 }

function stopAddress(){
  geo.clearWatch(watchId);
  alert("Tracking Stop");
}
  return (
    <>
     <h1>Current Location Tracking :)</h1>
     <p>Latitude: {latitude}</p>
     <p>Longitude: {longitude}</p>
     <button onClick={address} className='btn-get'>Get Address</button>
     <h3>Address : {adress}</h3>
     <br></br>
<button onClick={stopAddress}>Stop Tracking</button>
    </>
  )
}

export default App
