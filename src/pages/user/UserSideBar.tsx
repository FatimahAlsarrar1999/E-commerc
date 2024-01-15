import React from 'react'

import { Link } from 'react-router-dom'

const UserSideBar = () => {
  return (
    <div className="side-bar">
      <h3>Hello User</h3>
      <ul>
        <li>
          <Link to="/component">Profile</Link>
        </li>
      </ul>
    </div>
  )
}

export default UserSideBar
