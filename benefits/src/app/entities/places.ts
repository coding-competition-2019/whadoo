export interface Address {
  street: string;
  zipCode: string;
  city: string;
}

export interface Coords {
  lat: number;
  lng: number;
}

export interface Place {
  id: number;
  distance: number;
  name: string;
  url: string;
  address: Address;
  activities: string[];
  coordinates: Coords;
}

export interface Places {
  places: Place[];
}
