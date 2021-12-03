import React from 'react'
//import '../App.css'

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js"
import awsConfiguration from '../../awsConfiguration'

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId: awsConfiguration.ClientId,
})

const SignIn: React.FC = () => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const changedEmailHaldler = (e: any) => setEmail(e.target.value)
  const changedPasswordHandler = (e: any) => setPassword(e.target.value)

  const signIn = () => {
    const authenticationDetails = new AuthenticationDetails({
      Username : email,
      Password : password
    })
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log('result: ' + result)
        const accessToken = result.getAccessToken().getJwtToken()
        console.log('AccessToken: ' + accessToken)
        setEmail('')
        setPassword('')
        console.log("OK, signIn");
      },
      onFailure: (err) => {
        alert('NG, Login please check email, password');
        console.log("NG, signIn:onFailure");
        console.error(err)
      }
    })
  }

  const checkLogin = () => {
    const cognitoUser = userPool.getCurrentUser()
    if (cognitoUser) {
      console.log('OK, sign in')
    } else {
      console.log('not, signing in')
    }
  }

  return (
    <div className="SignIn">
      <h1>SingIn</h1>
      <input type="text" placeholder='email' onChange={changedEmailHaldler}/><br />
      <input type="text" placeholder='password' onChange={changedPasswordHandler}/><br />
      <button onClick={signIn}>Sign In</button>
      <br />
      <button onClick={checkLogin}>checkLogin</button>

    </div>
  )
}

export default SignIn