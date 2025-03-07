import React, { MouseEventHandler, useContext } from 'react';
import MyInput from '../../components/ui/MyInput'
import classes from './LoginPage.module.scss'
import { postUserData } from '../../api/postUserData'
import Error from '../../components/shared/error'
import { useNavigate } from 'react-router'
import MyButton from '../../components/ui/MyButton'
import { appContext } from '../../App'

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const navigate = useNavigate()
  const { setIsLoggedIn } = useContext(appContext)

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    const response = await postUserData({ email, password })
    if (!response.success) {
      setIsError(true)
    } else {
      const token = response.data.token
      sessionStorage.setItem('userToken', token)
      // Navigate to User Screen
      navigate(`/profile?token=${token}`)
      setIsLoggedIn(true)
    }
  }

  if (isError) {
    return <Error />
  }

  return (
    <div>
      <form className={classes.userForm}>
        <MyInput 
          inputPlaceholder='Enter email'
          title='Email address'
          inputValue={email}
          hint="We'll never share your email with anyone else."
          changeValue={setEmail}
        />
        <MyInput 
          inputPlaceholder='Password'
          title='Password'
          inputValue={password}
          changeValue={setPassword}
        />
        <MyButton 
          onClick={handleSubmit}
          text='Submit'
        />
      </form>
    </div>
  );
};

export default LoginPage;