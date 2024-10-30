import { IProduct, Products } from "./product/model";
import { ProductsView } from "./product/view";
import { ProductsController } from "./product/controll";

const productModel = new Products();
const productsController = new ProductsController(productModel);
const productsView = new ProductsView(productsController);

productsView.renderAllProducts();

const product = productsView.render('1');
document.body.appendChild(product);
