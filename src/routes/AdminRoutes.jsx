import React from 'react';
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner/Spinner';
import Forbidden from '../components/Forbidden/Forbidden';

const AdminRoutes = ({children}) => {
    const {user,loading} = useAuth()
    const {role,isLoading} = useRole();
    
    if(loading || !user || isLoading || !role){
    return <Spinner/>
   }
   if(role.role!=='admin'){
    return <Forbidden/>
   }
    return children
};

export default AdminRoutes;