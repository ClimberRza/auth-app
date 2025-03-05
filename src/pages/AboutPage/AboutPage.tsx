import React from 'react';
import { getCompanyInformation } from '../../api/getCompanyInfo/getCompanyInformation'
import { useQuery } from '@tanstack/react-query'

const AboutPage: React.FC = () => {
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
    <div>
      <h1>{response.data.info}</h1>
    </div>
  );
};

export default AboutPage;