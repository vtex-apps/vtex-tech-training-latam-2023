import React, { FC } from 'react'

import { ProfileContextProvider } from '../../context/ProfileContext'

const MyComponent: FC = ({ children }) => {
  return (
    <ProfileContextProvider>
      <div className="flex flex-column green">{children}</div>
    </ProfileContextProvider>
  )
}

export default MyComponent
