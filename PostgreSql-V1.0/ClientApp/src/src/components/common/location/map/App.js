// import React from 'react';

// import './../../../../index.css';

// export default class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       zoom: 13,
//       maptype: 'roadmap',
//       place_formatted: '',
//       place_id: '',
//       place_location: '',
//     };
//   }

//   componentDidMount() {
//     let map = new window.google.maps.Map(document.getElementById('map'), {
//       center: {lat: -33.8688, lng: 151.2195},
//       zoom: 13,
//       mapTypeId: 'roadmap',
//     });

//     map.addListener('zoom_changed', () => {
//       this.setState({
//         zoom: map.getZoom(),
//       });
//     });

//     map.addListener('maptypeid_changed', () => {
//       this.setState({
//         maptype: map.getMapTypeId(),
//       });
//     });

//   }

//   render() {
//     return (
//       <div id='app'>
//         <div id='map' />
//       </div>
//     );
//   }
// };