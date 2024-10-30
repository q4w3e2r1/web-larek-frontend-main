import { IEvents } from '../../components/base/events';
import { IProduct } from '../models/model';
import { IView } from './view';

/**
 * Интерфейс для представления каталога
 */
interface ICatalogView {
    render(data: { products: IProduct[] }): HTMLElement;
}

/**
 * Класс представления каталога продуктов
 */
export class CatalogView implements IView, ICatalogView {
    constructor(protected container: HTMLElement, protected events: IEvents) {}

    render(data: { products: IProduct[] }): HTMLElement {
        this.container.innerHTML = ''; // Очистка контейнера

        data.products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('catalog-item');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="catalog-item__image"/>
                <h3 class="catalog-item__name">${product.name}</h3>
                <p class="catalog-item__description">${product.description}</p>
                <span class="catalog-item__price">${product.price} ₽</span>
                <button class="catalog-item__add-to-basket" data-id="${product.id}">В корзину</button>
            `;
            this.container.appendChild(productElement);

            // Добавление обработчика события для кнопки "В корзину"
            const addButton = productElement.querySelector('.catalog-item__add-to-basket') as HTMLButtonElement;
            addButton.addEventListener('click', () => {
                this.events.emit('ui:basket-add', { id: product.id });
            });
        });

        return this.container;
    }
} 