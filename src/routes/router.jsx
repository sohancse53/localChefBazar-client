import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/homePage/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Meals from "../pages/Meals/Meals";
import MealDetails from "../pages/MealDetails/MealDetails";
import PrivateRoutes from "./PrivateRoutes";
import Order from "../pages/Order/Order";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import MyOrders from "../pages/dashboard/MyOrder/MyOrders";
import MyProfile from "../pages/dashboard/MyProfile/MyProfile";
import MyReviews from "../pages/dashboard/MyReviews/MyReviews";
import MyFavorite from "../pages/dashboard/MyFavorite/MyFavorite";
import CreateMeal from "../pages/dashboard/CreateMeal/CreateMeal";
import ManageRequest from "../pages/dashboard/ManageRequest/ManageRequest";
import MyMeals from "../pages/dashboard/MyMeals/MyMeals";
import UpdateMeal from "../pages/dashboard/MyMeals/UpdateMeal";
import MealOrderRequest from "../pages/dashboard/MyMeals/MealOrderRequest";
import PaymentSuccess from "../pages/dashboard/Payments/PaymentSuccess";
import PaymentCancel from "../pages/dashboard/Payments/PaymentCancel";
import ManageUser from "../pages/dashboard/ManagerUser/ManageUser";
import ChefRoutes from "./ChefRoutes";
import AdminRoutes from "./AdminRoutes";
import DashboardRedirect from "../pages/dashboard/DashBoardRedirect/DashBoardRedirect";
import Spinner from "../components/Spinner/Spinner";


const router = createBrowserRouter([

    // main layout
    {
        hydrateFallbackElement:<Spinner/>,
        errorElement:<p>Error</p>,
        path:'/',
        Component:MainLayout,
        children:[
            {
                path:'/',
                Component:Home
            },
            {
                path:'/meals',
                Component:Meals
            },
            {
                path:'/meal-details/:id',
                element:
                <PrivateRoutes>

                    <MealDetails/>
                </PrivateRoutes>
                
            },
            {
                path:'/order/:id',
                element:
                <PrivateRoutes>

                    <Order/>
                </PrivateRoutes>,
                loader:()=>fetch('/location.json')
                
            },

        ]
    },

// dashboard layout 
    {

        path:'dashboard',
        element:<DashboardLayout/>,
            hydrateFallbackElement:<Spinner/>,
        children:[
                {
            index: true, // default /dashboard
            element: <PrivateRoutes>
                <DashboardRedirect />
            </PrivateRoutes>
        },
            {
               path:'stats',
                element:<AdminRoutes><DashboardHome/></AdminRoutes>
            },
            {
               path:'my-orders',
                element:<PrivateRoutes><MyOrders/></PrivateRoutes>
            },
            {
               path:'my-profile',
            //    index:true,
                element:<PrivateRoutes><MyProfile/></PrivateRoutes>
            },
            {
               path:'my-reviews',
                element:<PrivateRoutes><MyReviews/></PrivateRoutes>
            },
            {
               path:'my-favorite',
                element:<PrivateRoutes><MyFavorite/></PrivateRoutes>
            },

            // chef route dibo
            {
               path:'create-meal',
                element:<ChefRoutes><CreateMeal/></ChefRoutes>
            },
                // chef route dibo
            {
               path:'my-meals',
                element:<ChefRoutes><MyMeals/></ChefRoutes>
            },
                // chef route dibo
            {
               path:'update-meal/:id',
                element:<ChefRoutes><UpdateMeal/></ChefRoutes>
            },
                // chef route dibo
            {
               path:'meal-order-request',
                element:<ChefRoutes><MealOrderRequest/></ChefRoutes>
            },


                // admin route dibo
            {
               path:'manage-request',
                element:<AdminRoutes><ManageRequest/></AdminRoutes>
            },
                // admin route dibo
            {
               path:'manage-user',
                element:<AdminRoutes><ManageUser/></AdminRoutes>
            },

            {
               path:'payment-success',
                element:<PaymentSuccess/>
            },
            {
               path:'payment-cancel',
                element:<PaymentCancel/>
            },
        ]
        
    },



    // auth layout
    {
        path:'auth-layout',
        Component:AuthLayout,
        children:[
            {
                path:'login',
                Component:Login
            },
            {
                path:'register',
                Component:Register
            }
        ]
    }


  
])






export default router