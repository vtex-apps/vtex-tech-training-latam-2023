import { useEffect, useState } from 'react'
import { Item } from 'vtex.product-context/react/ProductTypes'

const usePrice = (selectedItem: Item | null | undefined) => {
  const [price, setPrice] = useState<number | null>(null)

  useEffect(() => {
    if (!selectedItem?.sellers?.length) {
      return
    }

    const seller = selectedItem?.sellers?.find(
      ({ sellerDefault }: any) => sellerDefault
    )

    if (!seller) {
      return
    }

    const { SellingPrice, Price, ListPrice } = seller?.commertialOffer
    const priceFromProduct = SellingPrice ?? Price ?? ListPrice

    setPrice(priceFromProduct)
  }, [selectedItem])

  return price
}

export default usePrice
