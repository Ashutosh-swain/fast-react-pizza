// importing the createBrowserRouter
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order, { loader as orderLoader } from './features/order/Order';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Error from './ui/Error';
import AppLayout from './ui/AppLayout';
import { action as updateOrderAction } from './features/order/UpdateOrder';
// this is a function and inside it in an array we define all our routes
const router = createBrowserRouter([
  // defining the parent route and rest all in children routes
  // in parent route we do not need a path which will effectively make it a layout route as it only provides the layout to the application
  // a route defined without any path is the layout route in react router:
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        //step2: connectin the loader to the route
        loader: menuLoader,
        // here i am providing the error element as it is the only component which is fetching data so error can occur here
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        // so whenever there will be a new form submittion on this route then the action function will be called
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        // here i am providing the error element as it is the only component which is fetching data so error can occur here
        errorElement: <Error />,
        // so whenever there will be a new form submittion on this route then the action function will be called
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
