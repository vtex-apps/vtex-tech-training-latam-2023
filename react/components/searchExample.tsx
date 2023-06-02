import React, { useEffect } from 'react'

import {
  useSearchPageState,
  useSearchPage,
  useSearchPageStateDispatch,
} from 'vtex.search-page-context/SearchPageContext'

import { Button } from 'vtex.styleguide'

import { useQuery } from 'react-apollo'

import PRODUCT_DATA from '../graphql/getProduct.graphql'

function SearchContext() {
  const searchPageState = useSearchPageState()
  const searchPage = useSearchPage()
  const { selectedFacets } = useSearchPage()
  const dispatch = useSearchPageStateDispatch()

  const { loading, data } = useQuery(PRODUCT_DATA, {
    variables: {
      productId: '5',
    },
  })

  useEffect(() => {
    if (loading) return

    console.log('dataa', data)
  }, [loading, data])

  console.log('searchPageState', searchPageState)
  console.log('searchPage', searchPage)

  return (
    <div>
      {selectedFacets.length > 0 ? (
        <>
          <h1 className=" w-100 tc blue">Brand</h1>
          <h2>{data?.product.productName}</h2>
          <h3>{data?.product.brand}</h3>
        </>
      ) : (
        ''
      )}
      <p>Hey</p>
      <Button
        variation="primary"
        onClick={() => {
          dispatch({
            type: 'SWITCH_GALLERY_LAYOUT',
            args: { selectedGalleryLayout: 'grid' },
          })
        }}
      >
        Primary
      </Button>
    </div>
  )
}

export default SearchContext
