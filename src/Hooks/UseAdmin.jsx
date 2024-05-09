import React, { useEffect, useState } from 'react';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './UseAuth';

const UseAdmin = () => {
    const [admin,setAdmin]=useState(false);
    const {user}=useAuth()
    const [axiosSecure] = UseAxiosSecure();
    
      // Get Users
      const { data: users = [], refetch: usersRefetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        },
    });

useEffect(()=>{
    const thisUser = users.find((u) => user?.email === u.email); 
    if (thisUser?.role=="admin"){
        setAdmin(true)
    }
},[users,user])
   

 
    return {admin};
};

export default UseAdmin;