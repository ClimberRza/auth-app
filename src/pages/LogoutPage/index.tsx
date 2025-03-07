import React from 'react';
import { useMutation } from '@tanstack/react-query'
import { deleteUserData } from '../../api/delayed/deleteUserData'
import Error from '../../components/shared/error'

const LogoutPage: React.FC = () => {
  const userToken = sessionStorage.getItem('userToken') || ''
  
  const {
    mutate,
    isError,
    isPending,
    data
  } = useMutation({
    mutationKey: ['delete user'],
    mutationFn: async () => await deleteUserData(userToken)
  })

  React.useEffect(() => {
    mutate()
  }, [])

  if (isPending) {
    return <h1>Loading...</h1>
  }

  if (isError || !data?.success) {
    return <Error />
  }

  return (
    <h1>
      User Successfully deleted!
    </h1>
  );
};

export default LogoutPage;