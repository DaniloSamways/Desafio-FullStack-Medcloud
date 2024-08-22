export interface Patient {
  id: string;
  cpf: string;
  name: string;
  birth_date: string;
  email: string;
  address: {
    zip_code: string;
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    country: string;
  };
}
