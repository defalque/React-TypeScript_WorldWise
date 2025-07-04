import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

// import AppLayout from "./pages/AppLayout";
// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import PageNotFound from "./pages/PageNotFound";

import { CitiesProvider } from "./contexts/CitiesContext";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// before lazy loading
// dist/assets/index-7kEsUe5n.css   29.32 kB │ gzip:   4.91 kB
// dist/assets/index-C-7CabNL.js   560.78 kB │ gzip: 165.73 kB

// after lazy loading
// dist/assets/Logo-BYigXoGP.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Product-ftt4lYil.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/Homepage-DU-CjQIG.css         0.50 kB │ gzip:   0.30 kB
// dist/assets/PageNav-CcPXYRy9.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/AppLayout-Dq-0IgzN.css        1.39 kB │ gzip:   0.55 kB
// dist/assets/index-DOqAmE11.css           26.54 kB │ gzip:   4.38 kB
// dist/assets/Product.module-Be8LLB42.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-BjzRedg4.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-DreKYX5r.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-6kbr7aYS.js           0.37 kB │ gzip:   0.24 kB
// dist/assets/Pricing-qWB_Tp45.js           0.65 kB │ gzip:   0.42 kB
// dist/assets/Homepage-BFYyWo8r.js          0.66 kB │ gzip:   0.42 kB
// dist/assets/Product-D_9xmhy6.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/AppLayout-B7adVjnM.js       156.43 kB │ gzip:  45.96 kB
// dist/assets/index-BNvAs7yI.js           403.20 kB │ gzip: 119.57 kB

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function Layout() {
  const location = useLocation();

  return (
    <Suspense fallback={<SpinnerFullPage />} key={location.key}>
      <Outlet />
    </Suspense>
  );
}

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage></SpinnerFullPage>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage></Homepage>}></Route>
              <Route path="product" element={<Product></Product>}></Route>
              <Route path="pricing" element={<Pricing></Pricing>}></Route>
              <Route path="app" element={<AppLayout></AppLayout>}>
                <Route
                  index
                  element={<Navigate replace to="cities"></Navigate>}
                ></Route>
                <Route path="cities" element={<CityList></CityList>}></Route>
                <Route path="cities/:id" element={<City></City>}></Route>
                <Route
                  path="countries"
                  element={<CountryList></CountryList>}
                ></Route>
                <Route path="form" element={<Form></Form>}></Route>
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
