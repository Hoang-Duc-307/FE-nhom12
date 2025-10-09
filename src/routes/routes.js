import HomePage from "../pages/Client/HomePage/HomePage";
import ProductsPage from "../pages/Client/ProductsPage/ProductsPage";
import OrderPage from "../pages/Client/OrderPage/OrderPage";
import AboutPage from "../pages/Client/AboutPage/AboutPage";
import AddProductPage from "../pages/Admin/AddProductPage/AddProductPage";
import AddUserPage from "../pages/Admin/AddUserPage/AddUserPage";
import ListProduct from "../pages/Admin/ListProduct/ListProduct";
import OrdersPage from "../pages/Admin/Orders/OrdersPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        layout: 'main',
    },
    {
        path: '/products',
        page: ProductsPage,
        layout: 'main',
    },
    {
        path: '/order',
        page: OrderPage,
        layout: 'main',
    },
    {
        path: '/about',
        page: AboutPage,
        layout: 'main',
    },
    {
        path: '/admin',
        page: ListProduct,
        layout: 'admin',
    },
    {
        path: '/admin/orders',
        page: OrdersPage,
        layout: 'admin',
    },
    {
        path: '/admin/AddProduct',
        page: AddProductPage,
        layout: 'admin',
    },
    {
        path: '/admin/User',
        page: AddUserPage,
        layout: 'admin',
    },
]