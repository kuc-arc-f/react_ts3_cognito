import React from 'react'
//import '../App.css'

import {
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js"
import awsConfiguration from '../../awsConfiguration'

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId: awsConfiguration.ClientId,
})

//const SignUp: React.FC = () => {
export default function Page() {  
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const changedEmailHandler = (event: any) => setEmail(event.target.value)
  const changedPasswordHandler = (event: any) => setPassword(event.target.value)
  const signUp = () => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      })
    ]
    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        console.error(err)
        console.error(result)
        alert("Error, signUp");
        return
      }
      setEmail('')
      setPassword('');
      console.log("conmplete, SignUp !!");
    })
  }

  return (
    <div className="remix__page">
      <h1 style={{ textAlign: 'left' }}>SignUp</h1>
      <hr />
      <input type="text" placeholder="email" onChange={changedEmailHandler} /><br />
      <input type="text" placeholder="password" onChange={changedPasswordHandler} /><br />
      <button onClick={signUp}>SignUp</button>
    </div>
  )
}
//export default SignUp

