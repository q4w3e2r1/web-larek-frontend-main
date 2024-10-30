import './scss/styles.scss';

//модель
interface IProduct{
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
}


interface ICatalogModel{
    items: IProduct[];
    getProduct(id: string): IProduct | undefined;
    setProducts(products: IProduct[]): void;
}





interface IBasketModel{
    items: Map<string, number>,
    add(id: string): void;
    remove(id: string): void;
    clear(): void;
}

interface IEventEmitter{
    emit: (event: string,data: unknown) => void;
}

class BasketModel implements IBasketModel{

    items: Map<string, number> = new Map();

    constructor(protected emitter: IEventEmitter){
    }

    add(id: string): void {
        this.items.set(id, (this.items.get(id) ?? 0) + 1);
        this._emitChange();
    }

    remove(id: string): void {
       if(!this.items.has(id)) return;
       const count = this.items.get(id) ?? 0;
       if(count === 0) this.items.delete(id);
       else this.items.set(id, count - 1);
       this._emitChange();
    }

    clear(): void {
        this.items.clear();
        this._emitChange();
    }

    protected _emitChange(): void {
        this.emitter.emit('basket:change', {items: Array.from(this.items.keys())});
    }
}


const emitter = new EventEmitter();
const basket = new BasketModel(emitter);


//отображение

interface IView{
    render(data?: object): HTMLElement;
}

interface IViewConstructor{
    new (container: HTMLElement, events?: IEventEmitter): IView;
}


class BasketItemView implements IView{
    protected title: HTMLSpanElement;
    protected addButton: HTMLButtonElement;
    protected removeButton: HTMLButtonElement;

    protected id: string | null = null;

    constructor(protected container: HTMLElement, protected events: IEventEmitter){
        this.title = container.querySelector('.basket-item__title') as HTMLSpanElement;
        this.addButton = container.querySelector('.basket-item__add') as HTMLButtonElement;
        this.removeButton = container.querySelector('.basket-item__remove') as HTMLButtonElement;

        this.addButton.addEventListener('click', ()=>{
            this.events.emit('ui:basket-add', {id: this.id});
        });
        this.removeButton.addEventListener('click', ()=>{
            this.events.emit('ui:basket-remove', {id: this.id});
        });

    }


    render(data: {id: string, count: number}): HTMLElement {
        if(data){
            this.id = data.id;
            this.title.textContent = data.count.toString();
        }
        return this.container;
    }
}

class BasketView implements IView{
    constructor(protected container: HTMLElement){
        render(data: {items: HTMLElement[]}): HTMLElement{}
        if(data){
            this.container.replaceChildren(...data.items);
        }

        return this.container;
    }
}



//одъединение
const api = new ShopAPI();
const events = new EventEmitter();
const basketView = new BasketView(document.querySelector('.basket')!);
const basketModel = new BasketModel(events);
const catalogModel = new CatalogModel(events);

// можно собрать в функции или классы отдельные экраны с логикой их формирования
function renderBasket(items: string[]) {
    basketView.render();
    items.map(id => {
        const itemView = new BasketItemView(events);
        return itemView.render(catalogModel.getProduct(id));
    });
}

// при изменении рендерим
events.on('basket:change', (event: { items: string[] }) => {
    renderBasket(event.items);
});

// при действиях изменяем модель, а после этого случится рендер
events.on('ui:basket-add', (event: { id: string }) => {
    basketModel.add(event.id);
});

events.on('ui:basket-remove', (event: { id: string }) => {
    basketModel.remove(event.id);
});

// подгружаем начальные данные и запускаем процесс
api.getCatalog()
    .then(catalogModel.setItems.bind(catalogModel))
    .catch(err => console.error(err));