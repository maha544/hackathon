export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
  }
  
  export interface ServiceRequest {
    id: string;
    serviceId: string;
    customerName: string;
    requestDate: string;
    status: string;
  }
  