import { images } from "../constants";

export const  markers = [
    {
      id: "1",
      coordinate: {
        latitude: 22.6293867,
        longitude: 88.4354486,
      },
      name: "Glamour Salon",
      description: "Offering a variety of beauty services",
      type: "Salon",
      image: images.salon1,
      rating: 4.5,
      reviews: 120,
      address: "123 Main Street",
      phoneNumber: "+1 (555) 123-4567",
      distance: 1.5,
      servicesOffered: ["Haircut", "Manicure", "Pedicure"],
      openingHours: "9:00 AM - 6:00 PM",
      website: "www.glamoursalon.com"
    },
    {
      id: "2",
      coordinate: {
        latitude: 22.6345648,
        longitude: 88.4377279,
      },
      name: "The Gentleman's Den",
      description: "A classic barbershop for gentlemen",
      type: "Barbershop",
      image: images.salon2,
      rating: 4.8,
      reviews: 90,
      address: "456 Elm Street",
      phoneNumber: "+1 (555) 987-6543",
      distance: 3,
      servicesOffered: ["Haircut", "Shave", "Beard Trim"],
      openingHours: "10:00 AM - 8:00 PM",
      website: "www.gentlemansden.com"
    },
    {
      id: "3",
      coordinate: {
        latitude: 22.6281662,
        longitude: 88.4410113,
      },
      name: "Chic Hair Studio",
      description: "Specializing in trendy hairstyles",
      type: "Salon",
      image: images.salon3,
      rating: 4.2,
      reviews: 150,
      address: "789 Oak Lane",
      phoneNumber: "+1 (555) 321-7890",
      distance: 2.5,
      servicesOffered: ["Hair Coloring", "Extensions", "Blowout"],
      openingHours: "8:00 AM - 7:00 PM",
      website: "www.chichairstudio.com"
    },
    {
      id: "4",
      coordinate: {
        latitude: 22.6341137,
        longitude: 88.4497463,
      },
      name: "Sharp Cuts Barbershop",
      description: "Where precision meets style",
      type: "Barbershop",
      image: images.salon2,
      rating: 4.9,
      reviews: 120,
      address: "101 Oak Street",
      phoneNumber: "+1 (555) 321-7890",
      distance: 2,
      servicesOffered: ["Haircut", "Hot Towel Shave", "Facial"],
      openingHours: "9:00 AM - 6:00 PM",
      website: "www.sharpcutsbarbershop.com"
    },
    {
      id: "5",
      coordinate: {
        latitude: 22.5341137,
        longitude: 88.4797463,
      },
      name: "Our Best Barbers",
      description: "Where precision meets style",
      type: "Barbershop",
      image: images.salon5,
      rating: 4.9,
      reviews: 120,
      address: "101 Oak Street",
      phoneNumber: "+1 (555) 321-7890",
      distance: 2,
      servicesOffered: ["Haircut", "Hot Towel Shave", "Facial"],
      openingHours: "9:00 AM - 6:00 PM",
      website: "www.sharpcutsbarbershop.com"
    }
];


export const mapDarkStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];

  export const mapStandardStyle = [
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
  ];