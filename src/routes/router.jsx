import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/homePage/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Meals from "../pages/Meals/Meals";
import MealDetails from "../pages/MealDetails/MealDetails";
import PrivateRoute from "./PrivateRoutes";
import PrivateRoutes from "./PrivateRoutes";
import Order from "../pages/Order/Order";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import MyOrders from "../pages/dashboard/MyOrder/MyOrders";
import MyProfile from "../pages/dashboard/MyProfile/MyProfile";
import MyReviews from "../pages/dashboard/MyReviews/MyReviews";
import MyFavorite from "../pages/dashboard/MyFavorite/MyFavorite";

const router = createBrowserRouter([

    // main layout
    {
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
        children:[
            {
               index:true,
                element:<DashboardHome/>
            },
            {
               path:'my-orders',
                element:<MyOrders/>
            },
            {
               path:'my-profile',
                element:<MyProfile/>
            },
            {
               path:'my-reviews',
                element:<MyReviews/>
            },
            {
               path:'my-favorite',
                element:<MyFavorite/>
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