import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import Error from '../../components/shared/error/Error';
import { getUserInfo } from '../../api/getUserInfo/getUserInfo'
import classes from './ProfilePage.module.scss'
import MyButton from '../../components/ui/MyButton/MyButton'

const ProfilePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userToken = searchParams.get('token') || sessionStorage.getItem('userToken')!

  const {data: response, isLoading, isError} = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(userToken)
  })

  if (isLoading) {
    return <h1>Loading</h1>
  }

  if (isError || !response || !response.success) {
    return <Error />
  }

  return (
    <div>
      <div className={classes.mainContent}>
        <img 
          className={classes.avatar}
          src='ava.jpg'
          alt='avatar'
        />
        <div className={classes.userProfile}>
          <h1>Welcome, {response.data.fullname}!</h1>
          <MyButton 
            text='Update'
            onClick={() => console.log(1)}
          />
        </div>
      </div>
      <p>[here is place for concatenated result from long running call]</p>
    </div>
  );
};

export default ProfilePage;