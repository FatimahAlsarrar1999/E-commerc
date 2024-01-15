/* eslint-disable @typescript-eslint/no-unused-vars */
import jwtDecode from 'jwt-decode'
import { useNavigate, useParams } from 'react-router-dom'
import { activateUserAccount } from '../redux/slices/users/userSlice'
const ActivatePage = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const decode = jwtDecode(token)

  const handleActivate = async () => {
    try {
      const response = await activateUserAccount(token)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    navigate('/SignIn')
  }

  return (
    <div>
      <h3>hello {decode.name} ! Click the button to activate your account </h3>
      <button onClick={handleActivate}>activate your Account</button>
    </div>
  )
}

export default ActivatePage
