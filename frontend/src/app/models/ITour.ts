export interface ITour{
  name: string;
  description: string;
  tourOperator: string;
  price: string;
  img: string;
  _id: string;
  type: string;
  date: string;
}

export interface ITourTypeSelect {
  label?: string;
  value?: string;
  date?: string;
}
