import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Spinner from '../components/Spinner/Spinner';
import Forbidden from '../components/Forbidden/Forbidden';

const ChefRoutes = ({children}) => {
      const {user,loading} = useAuth()
    const {role,isLoading} = useRole();
    
    if(loading || !user || isLoading){
    return <Spinner/>
   }
   if(role.role!=='chef'){
    return <Forbidden/>
   }
    return children
};

export default ChefRoutes;