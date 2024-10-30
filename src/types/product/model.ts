import { Api } from "../../components/base/api";

export interface IProduct{
    id:string;
    description:string;
    image:string;
    title:string;
    category:string;
    price:number;

}

export interface IProductAPIResponse {
    items: IProduct[];
}

export interface IProductsModel{
    products: IProduct[];

    getProduct(id: string): IProduct | undefined;
    getAllProducts(): IProduct[];
    isContains(id: string): boolean;
}

export class Products implements IProductsModel {
    products: IProduct[] = [];
    private api: Api;

    constructor() {
        this.api = new Api('/');
        this.initProducts();
    }

    // Обновленный метод initProducts
    private initProducts(): void {
        this.api.get('/products.json')
            .then((data: IProductAPIResponse) => {
                this.products = data.items;
            })
            .catch(error => {
                console.error('Ошибка при загрузке продуктов:', error);
            });
    }


    getProduct(id: string): IProduct | undefined {
        return this.products.find(product => product.id === id);
    }

    getAllProducts(): IProduct[] {
        return this.products;
    }

    isContains(id: string): boolean {
        return this.products.some(product => product.id === id);
    }
}

