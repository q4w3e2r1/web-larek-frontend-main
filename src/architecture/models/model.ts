
export interface IProduct {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export interface ICatalogModel {
    items: IProduct[];
    getProduct(id: string): IProduct | undefined;
    setProducts(products: IProduct[]): void;
}

export interface IBasketModel {
    items: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
    clear(): void;
}

export interface IEventEmitter {
    emit(event: string, data: unknown): void;
}
