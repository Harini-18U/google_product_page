import { createBrowserRouter, RouterProvider, Navigate, redirect } from 'react-router-dom';
import { AppRoutes } from './router/routes';
import { CreateAccount, Products, SignIn } from './screens';
import { Provider } from 'react-redux';
import { store } from './redux';

function App() {

  const protectedRouteLoader = ({ request }) => {
    if (!localStorage.getItem('isUserLoggedIn')) {
      let params = new URLSearchParams();
      params.set("from", new URL(request.url).pathname);
      return redirect(AppRoutes.sign_in + "?" + params.toString());
    }

    return null;
  };

  const publicRouteLoader = ({ request }) => {
    if (localStorage.getItem('isUserLoggedIn')) {
      return redirect(AppRoutes.products);
    }

    return null;
  }

  const browserRouter = createBrowserRouter([
    {
      path: AppRoutes.root,
      element: <Navigate to={AppRoutes.products} />
    },
    {
      path: AppRoutes.sign_in,
      loader: publicRouteLoader,
      element: <SignIn />
    },
    {
      path: AppRoutes.create_account,
      loader: publicRouteLoader,
      element: <CreateAccount />
    },
    {
      path: AppRoutes.products,
      loader: protectedRouteLoader,
      element: <Products />
    }
  ])

  return (
    <Provider store={store}>
      <RouterProvider router={browserRouter} />
    </Provider>
  );
}

export default App;
