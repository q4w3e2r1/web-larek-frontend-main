import { ProductsController } from "./controll";
import { IProduct } from "./model";

export interface IView {
    render(data: unknown): HTMLElement;
}


export class ProductsView implements IView{
    private controller: ProductsController;

    constructor(controller: ProductsController) {
        this.controller = controller;
    }

    renderAllProducts(): HTMLElement {
        const container = document.createElement('div');
        this.controller.getAllProducts().forEach(product => {
            const productElement = this.render(product.id);
            container.appendChild(productElement);
        });
        return container;
    }

    render(id: string): HTMLElement {
        const product = this.controller.getProduct(id);
        if (!product) return document.createElement('div');
        const productElement = document.createElement('div');
        productElement.innerHTML = `<h2>${product.title}</h2><p>${product.description}</p>`;
        return productElement;
    }

}
