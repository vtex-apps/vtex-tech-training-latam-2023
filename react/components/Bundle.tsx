import React, { useEffect, useState } from 'react'

import { useProduct } from 'vtex.product-context'
import { useQuery } from 'react-apollo'
import { Button } from 'vtex.styleguide'
import { Wrapper} from 'vtex.add-to-cart-button'
import { useCssHandles } from 'vtex.css-handles'

import ACCESSESORIES from '../graphql/getAccssesories.graphql'

const CSS_HANDLES = [
    'ButtonBundle',
] as const

interface Accessories {
    productName: string
    items: itemID[]
}

interface itemID {
    itemId: string
}

interface ItemsArray {
    id: string | undefined
    quantity: number | undefined
    seller: string
}

function Bundle() {
    const productContextValue = useProduct()
    const [ items, setItems] = useState<ItemsArray[]>()
    const {loading, data} = useQuery(ACCESSESORIES,{
        variables: {
            productId: "88"
        }
    })

    const { handles } = useCssHandles(CSS_HANDLES)


    useEffect(() => {
        if(loading) return

        console.log('productContextValue', productContextValue)
        console.log('dataa', data)

        const initialItem: ItemsArray[] = [
            {
                id: productContextValue?.selectedItem?.itemId,
                quantity: productContextValue?.selectedQuantity,
                seller: "1"
            }
        ]

        setItems(initialItem)

    },[loading, data])

    useEffect(() => {

        console.log('itemms', items)
    }, [items])

    function addItem (itemId: string) {
        const newIem = [
            {
                id: itemId,
                quantity: 1,
                seller: "1"
            }
        ]

        setItems(items?.concat(newIem))
    }
    

    return (
        <>
            <p>Complementa tu</p>
            <h3>{productContextValue?.selectedItem?.name}</h3>
            <p>con:</p>
            {!loading && data?.productRecommendations.length > 0 
                    ? data?.productRecommendations.map( 
                        (item: Accessories) => (
                            <div className={`${handles.ButtonBundle}`}>
                                <Button 
                                    variation="secondary"
                                    onClick={() => addItem(item.items[0].itemId)}
                                >{item.productName}</Button>
                            </div>
                    ))
                    : ""
            }
            <Wrapper
                skuItems={items}
            />
        </>
    )
}

export default Bundle
