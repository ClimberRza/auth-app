import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import Error from '../../components/shared/error';
import { getUserInfo } from '../../api/getUserInfo'
import classes from './ProfilePage.module.scss'
import MyButton from '../../components/ui/MyButton'
import Modal from '../../components/shared/modal'
import { getAuthor } from '../../api/delayed/getAuthor'
import { getQuote } from '../../api/delayed/getQuote'

const ProfilePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const userToken = searchParams.get('token') || sessionStorage.getItem('userToken')!

  const [isQuoteLoading, setIsQuoteLoading] = React.useState(false)
  const [isAuthorLoading, setIsAuthorLoading] = React.useState(false)
  const [author, setAuthor] = React.useState('')
  const [quote, setQuote] = React.useState('')
  const [isErrorAutorQuote, setIsErrorAutorQuote] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const controllersStackRef = React.useRef<AbortController[]>([])

  const requestAuthorQuote = async () => {
    const controller = new AbortController
    controller.signal.onabort = () => {
      controllersStackRef.current.shift()
    }

    controllersStackRef.current.push(controller)
    setIsModalOpen(true)
    setIsAuthorLoading(true)
    setIsQuoteLoading(true)
    
    const authorResponse = await getAuthor(controller)
    
    setIsAuthorLoading(false)
    if (!authorResponse.success) {
      if (!controller.signal.aborted) {
        setIsErrorAutorQuote(true)
        setIsModalOpen(false)
      }
      return
    }

    const quoteResponse = await getQuote(authorResponse.data.authorId, controller)

    setIsQuoteLoading(false)
    if (!quoteResponse.success) {
      if (!controller.signal.aborted) {
        setIsErrorAutorQuote(true)
        setIsModalOpen(false)
      }
      return
    }

    if (!controller.signal.aborted) {
      setQuote(quoteResponse.data.quote)
      setAuthor(authorResponse.data.name)
      setIsModalOpen(false)
    }

    controllersStackRef.current.shift()
  }

  const queryPlacehoder = React.useMemo(() => {
    if (author && quote) {
      return (
        <>
          <span>Author: {author}.</span>
          <br />
          <span>His quote: <b>{quote}</b></span>
        </>
      )
    }
    return '[here is place for concatenated result from long running call]'
  }, [author, quote])
  
  // Request User Info
  const {data: response, isLoading, isError} = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(userToken)
  })

  if (isLoading) {
    return <h1>Loading</h1>
  }

  if (isError 
    || !response 
    || !response.success
    || isErrorAutorQuote) {
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
            onClick={() => requestAuthorQuote()}
          />
        </div>
      </div>
      <p>{queryPlacehoder}</p>
        <Modal 
          open={isModalOpen} 
          setOpen={setIsModalOpen}
          isQuoteLoading={isQuoteLoading}
          isAuthorLoading={isAuthorLoading}
          setIsQuoteLoading={setIsQuoteLoading}
          setIsAuthorLoading={setIsAuthorLoading}
          controllerStack={controllersStackRef.current}
        />
    </div>
  );
};

export default ProfilePage;