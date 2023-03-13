import { AfterViewInit, Component, ElementRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';
declare const google;

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss'],
})
export class GmapComponent extends BasePage implements OnInit{

  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  @ViewChild('searchbox', { read: ElementRef }) searchbar!: ElementRef;
  @Input() myAddress: any;
  @Input() newAddress = false;
  @Input() isDirections = false;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  myLatLng: any;
  mmarker: any;
  paddress: string | undefined;
  searchQuery = '';
  items: string[] | undefined;
  isBothDirectionsAvailable = false;
  iOrigin;
  iDestination;

  constructor(injector: Injector) {
    super(injector);

  }
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit() { }

  goBack(){
    console.log('tjhis sjd');

    this.modals.dismiss()

  }
  ngAfterViewInit() {

    this.platform.ready().then(() => {
      this.initializeMapBeforeSetCoordinates().then(v => {
        this.initMap(v);

        setTimeout(async () => {

          const active = localStorage.getItem('google_map');
          if (!active) {
            const flag = await this.utility.presentConfirm('Thanks', 'Remind Later', 'How To Use', 'In the search field, type in the new address and press enter. You can also hold your finger and drag to new location, then press the + symbol in the top right corner');
            localStorage.setItem('google_map', `${flag}`);

          }

        }, 1000);

      });
    });


  }


  initializeMapBeforeSetCoordinates(): Promise<unknown> {

    return new Promise(async resolve => {
      const mylocation = await this.utility.getCurrentLocationCoordinates();
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 13,
        center: mylocation
      });

      console.log(this.myAddress);
      this.utility.getCoordsForGeoAddress(this.myAddress)
        .then(coords => {
          resolve({
            mylocation,
            destinatioLocation: coords
          });
        }, err => {
          console.log(err);
          this.utility.presentFailureToast('Destination Not Found for given address');
          resolve({
            mylocation,
            destinatioLocation: null
          });
        });

    });

  }


  initMap(val) {

    // this.map = new google.maps.Map(this.mapElement.nativeElement, {
    //   zoom: 13,
    //   center: localatlong
    // });

    if (this.isDirections == false) {
      this.mmarker = new google.maps.Marker({
        position: val.mylocation,
        map: this.map,
        draggable: true,
        title: 'Destination'
      });

      google.maps.event.addListener(this.mmarker, 'dragend', ((event) => {
        const lt = event.latLng.lat();
        const lg = event.latLng.lng();
        const coords = { lat: -25.363, lng: 131.044 };
        self.getGeoAddress(coords);
      }));

      this.setSearchBox();

    }

    var self = this;
    this.directionsDisplay.setMap(this.map);



    // console.log(this.isDirections);
    if (this.isDirections == true) {

      const destination = new google.maps.LatLng(val.destinatioLocation);
      const mylocation = new google.maps.LatLng(val.mylocation);

      console.log('d-', destination, mylocation);

      const request = {
        origin: val.mylocation,
        destination: val.destinatioLocation,
        travelMode: 'DRIVING',
        drivingOptions: {
          departureTime: new Date(Date.now() + 2000),  // for the time N milliseconds from now.
          trafficModel: 'bestguess'
        }
        // drivingOptions: DrivingOptions,
        // unitSystem: UnitSystem,
        // waypoints[]: DirectionsWaypoint,
        // optimizeWaypoints: Boolean,
        // provideRouteAlternatives: Boolean,
        // avoidFerries: Boolean,
        // avoidHighways: Boolean,
        // avoidTolls: Boolean,
        // region: String
      };

      self.directionsService.route(request, ((result, status) => {
        // console.log(status);
        if (status == 'OK') {
          self.directionsDisplay.setDirections(result);
          self.isBothDirectionsAvailable = true;
          self.iOrigin = mylocation;
          self.iDestination = destination;
        } else {
          console.log(result, status);
          self.utility.presentFailureToast('Error Finding Driving Directions on Map');

          self.addDestinationOriginMarkers(val.mylocation, val.destinatioLocation);

        }
      }));

    }

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.





  }

  addDestinationOriginMarkers(origin, destination) {
    const marker_o = new google.maps.Marker({
      position: new google.maps.LatLng(origin.lat, origin.lng),
      title: 'Origin'
    });



    const marker_d = new google.maps.Marker({
      position: new google.maps.LatLng(destination.lat, destination.lng),
      title: 'Destination'
    });

    marker_o.setMap(this.map);
    marker_d.setMap(this.map);

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(origin);
    bounds.extend(destination);
    this.map.fitBounds(bounds);


  }

  setSearchBox() {

    const self = this;
    const searchInput = this.searchbar.nativeElement.querySelector('.searchbar-input');
    // console.log("Search input", searchInput);
    const searchBox = new google.maps.places.SearchBox(searchInput);
    let markers = [];

    searchBox.addListener('places_changed', (() => {
      const places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }

      self.mmarker.setMap(null);
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
      places.forEach(((place) => {
        if (!place.geometry) {
          // console.log("Returned place contains no geometry");
          return;
        }

        // Create a marker for each place.
        self.mmarker = new google.maps.Marker({
          position: place.geometry.location,
          map: self.map,
          draggable: true,
          title: 'Destination'
        });

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      }));
      self.map.fitBounds(bounds);
    }));
  }


  getGeoAddress(coords) {
    const self = this;
    const geocoder = new google.maps.Geocoder();
    const latlng = coords;
    geocoder.geocode({ location: latlng },  (results, status) => {
      if (status === 'OK') {
        if (results[0]) {

          self.paddress = results[0].formatted_address;
          this.utility.presentToast(self.paddress);
        } else {
          this.utility.presentToast('No results found');
        }
      } else {
        this.utility.presentToast('Geocoder failed due to: ' + status);
      }
    });

  }

  getDirection() {
    this.utility.openDirectionInMap(this.myAddress);
  }





  getMarkerLocation() {


    const lt = this.mmarker.position.lat();
    const lg = this.mmarker.position.lng();
    const coords = { lat: lt, lng: lg };


    const self = this;
    const geocoder = new google.maps.Geocoder();
    const latlng = coords;
    geocoder.geocode({ location: latlng }, ((results, status) => {
      if (status === 'OK') {
        // console.log(results);
        if (results[0]) {

          self.paddress = results[0].formatted_address;
          self.utility.presentToast(self.paddress);

          if (self.newAddress == true) {
            const _addressComponets = results[0].address_components;
            // console.log(_addressComponets)
            const countryObject = _addressComponets.filter(x => x.types.includes('country'))[0];
            const country = (countryObject) ? countryObject.long_name : '';
            const stateObject = _addressComponets.filter(x => x.types.includes('administrative_area_level_1'))[0];
            const state = (stateObject) ? stateObject.long_name : '';
            const cityObject = _addressComponets.filter(x => x.types.includes('administrative_area_level_2'))[0];
            const city = (cityObject) ? cityObject.long_name : '';
            const streetObject = _addressComponets.filter(x => x.types.includes('route'))[0];
            const street = (streetObject) ? streetObject.long_name : '';

            // console.log(country);


            const threepartAddress = {
              country,
              state,
              city,
              street
            };
            const coords2 = { lat: lt, lng: lg, address: self.paddress, parts: threepartAddress };
            self.closeModal(coords2);
          } else {

            const coords3 = { lat: lt, lng: lg, address: self.paddress };
            self.closeModal(coords3);

          }



        } else {
          self.utility.presentToast('No results found');
        }
      } else {
        self.utility.presentToast('Geocoder failed due to: ' + status);
      }
    }));


  }

  closeModal(res) {
    this.modals.dismiss(res);
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
