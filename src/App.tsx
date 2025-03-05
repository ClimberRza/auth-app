import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { getCompanyInformation } from './api/getCompanyInfo/getCompanyInformation'
import './App.scss';
import MyButton from './components/MyButton/MyButton'

function App() {
  const {data: response, isLoading, isError} = useQuery({
    queryKey: ['companyInfo'],
    queryFn: getCompanyInformation
  })

  
  if (isLoading) {
    return <h1>Loading</h1>
  }

  if (isError || !response || !response.success) {
    return <h1>Error occured!</h1>
  }

  return (
    <div className="App">
      <MyButton text='About us' />
      <MyButton text='Sign in' />
      <h1>{response.data.info}</h1>
    </div>
  );
}

export default App;
