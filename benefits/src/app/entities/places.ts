export interface Address {
  street: string;
  zipCode: string;
  city: string;
}

export interface Place {
  id: number;
  name: string;
  url: string;
  address: Address;
  activities: string[];
}

export interface Places {
  places: Place[];
}
