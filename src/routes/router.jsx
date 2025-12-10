import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/homePage/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Meals from "../pages/Meals/Meals";
import MealDetails from "../pages/MealDetails/MealDetails";

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
                Component:MealDetails
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