import { IBasketModel, IEventEmitter } from './model';

export class BasketModel implements IBasketModel {
    items: Map<string, number> = new Map();

    constructor(protected emitter: IEventEmitter) {}

    add(id: string): void {
        this.items.set(id, (this.items.get(id) ?? 0) + 1);
        this._emitChange();
    }

    remove(id: string): void {
        if (!this.items.has(id)) return;
        const count = this.items.get(id) ?? 0;
        if (count === 1) this.items.delete(id);
        else this.items.set(id, count - 1);
        this._emitChange();
    }

    clear(): void {
        this.items.clear();
        this._emitChange();
    }

    protected _emitChange(): void {
        this.emitter.emit('basket:change', { items: Array.from(this.items.keys()) });
    }
}