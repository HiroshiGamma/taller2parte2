export interface ReceiptDto {
    id:      number;
    userRut: string;
    country: string;
    city:    string;
    commune: string;
    street:  string;
    date:    Date;
    total:   number;
    items:   Item[];
}

export interface Item {
    productId: number;
    quantity:  number;
    price:     number;
    total:     number;
}