    export interface CountryRequest {
      name: string;
      link: string;
      flag: string;
      circuit: string;
    }
    export interface CountryResponse extends CountryRequest {
      id: number | string;
    }