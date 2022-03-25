export class NewCommandDto {
  date: string;
  time: string;
  price: number;
  user: {
    id: number;
  };
  address: {
    id: number;
  };
  products: SelectProductDto[];
}

class SelectProductDto {
  id: number;
  amount: number;
}
