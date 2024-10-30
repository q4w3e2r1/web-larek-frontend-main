import { IEvents } from '../../components/base/events';


// Ensure that IView is exported
export interface IView {
    render(data: any): HTMLElement;
    // Add other method signatures as needed
}

/**
 * Интерфейс для представления элемента корзины
 */
export interface IBasketItemView {
    render(data: { id: string; count: number }): HTMLElement;
}

/**
 * Базовый класс для представления
 */
export class BaseView {
    constructor(protected container: HTMLElement, protected events: IEvents) {}
}

/**
 * Класс для представления элемента корзины
 */
export class BasketItemView extends BaseView implements IBasketItemView {
    protected title: HTMLSpanElement;
    protected addButton: HTMLButtonElement;
    protected removeButton: HTMLButtonElement;
    protected id: string | null = null;
    protected countElement: HTMLSpanElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.title = container.querySelector('.basket-item__title') as HTMLSpanElement;
        this.countElement = container.querySelector('.basket-item__count') as HTMLSpanElement;
        this.addButton = container.querySelector('.basket-item__add') as HTMLButtonElement;
        this.removeButton = container.querySelector('.basket-item__remove') as HTMLButtonElement;

        this.addButton.addEventListener('click', () => {
            this.events.emit('ui:basket-add', { id: this.id });
        });
        this.removeButton.addEventListener('click', () => {
            this.events.emit('ui:basket-remove', { id: this.id });
        });
    }

    render(data: { id: string; count: number }): HTMLElement {
        if (data) {
            this.id = data.id;
            this.countElement.textContent = data.count.toString();
        }
        return this.container;
    }
}

/**
 * Класс для представления корзины
 */
export class BasketView extends BaseView {
    render(data: { items: HTMLElement[] }): HTMLElement {
        if (data) {
            this.container.replaceChildren(...data.items);
        }
        return this.container;
    }
}
