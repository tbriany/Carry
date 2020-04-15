import React, { createContext } from 'react';

export const ItemDetailsContext = createContext(
)
class ItemDetailsContextProvider extends React.Component {
    state = {
        itemId: 1,
        itemIds: [],
        qty: 0,
        totalQty: 0,
        updateQty: this.updateQty,
    }
  

    updateId = () => {

        const { itemId, itemIds, qty , totalQty} = this.state

        if (itemIds.includes(itemId)) {
           
            this.setState({ 
                totalQty: +totalQty + +qty ,
                qty: 0})
           
        } else {
          
            this.setState({ 
                itemIds: ([...itemIds, itemId]) ,
                totalQty:   qty,
                qty: 0,
            })
            this.setState({  })
           
        }

    }

    updateQty = newQty => {
        this.setState({ qty: newQty })
    }



    render() {
        return (

            <ItemDetailsContext.Provider value={{ ...this.state, updateId: this.updateId, updateQty: this.updateQty }}>
                {this.props.children}
            </ItemDetailsContext.Provider>

        );
    }
}

export default ItemDetailsContextProvider