import { ICatalogModel, IProduct, IEventEmitter } from './model';

export class CatalogModel implements ICatalogModel {
    items: IProduct[] = [];

    getProduct(id: string): IProduct | undefined {
        return this.items.find(product => product.id === id);
    }

    setProducts(products: IProduct[]): void {
        this.items = products;
        this.emitter?.emit('catalog:change', { products: this.items });
    }

    constructor(protected emitter?: IEventEmitter) {}
}