import { IProduct, Products} from "../product/model";


export class ProductsController{
    private products:Products;

    constructor(productsModel:Products){
        this.products = productsModel;
    }

    getProduct(id:string):IProduct | undefined{
        if(!this.products.isContains(id)) throw new Error('Product not found');
        return this.products.getProduct(id);
    }

    getAllProducts():IProduct[]{
        if(!this.products) throw new Error('ProductsModel not found');
        return this.products.getAllProducts();
    }
}
