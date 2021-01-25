import '../style.css';
import './index.js';
import CRM from './index'
import Products from './products'

const products = new Products();
const crm = new CRM(products);
crm.init()
