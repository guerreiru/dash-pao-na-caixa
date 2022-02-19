import React from 'react'
import { getUserConfig } from '../../utils/Functions/Auth'
import BakeryUsers from "../BakeryPages/BakeryUsers"

const PersonPages = () => {
  const [user, setUser] = React.useState([])
  const [role, setRole] = React.useState("")

  React.useEffect(() => {
    setUser(getUserConfig())
    setRole(getUserConfig().roles[0])
  }, [])

  if (role === "ROLE_BAKERY") {
    return (
      <BakeryUsers bakeryId={user.bakery.id} />
    )
  } else if (role === "ROLE_RESIDENT") {
    return (
      <div>Residente</div>
    )
  } else if (role === "ROLE_ADMIN") {
    return (
      <div>Admin</div>
    )
  } else if (role === "ROLE_ROOT") {
    return (
      <div>Root</div>
    )
  } else {
    return null
  }
}

export default PersonPages