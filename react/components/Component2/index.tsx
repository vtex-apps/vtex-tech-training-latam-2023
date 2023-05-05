import React from 'react'
import { InputButton } from 'vtex.styleguide'

import useProfileContext from '../../context/ProfileContext/useProfileContext'

const Component2 = () => {
  const { state, dispatch } = useProfileContext()

  const handleOnChange = (e: any) => {
    dispatch({
      type: 'SET_NAME',
      args: {
        name: e.target.value,
      },
    })
  }

  return (
    <div className="strong">
      <InputButton
        placeholder="Tu Nombre"
        size="regular"
        label="Danos tu nombre"
        button="Enviar"
        value={state?.name ?? ''}
        onChange={handleOnChange}
      />
    </div>
  )
}

export default Component2
