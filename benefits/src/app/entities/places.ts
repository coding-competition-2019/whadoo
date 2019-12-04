export interface Address {
  street: string;
  zipCode: string;
  city: string;
}

export interface Place {
  name: string;
  url: string;
  address: Address;
  activities: string[];
}

export interface Places {
  places: Place[];
}
