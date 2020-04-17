import React, { createContext } from 'react';

export const ItemDetailsContext = createContext(
)
class ItemDetailsContextProvider extends React.Component {
    state = {
        itemId: 1,
        itemIds: [],
        qty: 0,
        totalQty: 0
    }
    updateId = () => { //functions that updates the amount of qunatity per item and which items id the user wants
        const { itemId, itemIds, qty, totalQty } = this.state
        if (itemIds.includes(itemId)) {  //includes is currently a problem
            this.setState({
                totalQty: +totalQty + +qty,
                qty: 0
            })

        } else {
            this.setState({
                itemIds: ([...itemIds, itemId]),
                totalQty: qty,
                qty: 0,
            })
            this.setState({})
        }
    }

    updateQty = (newQty) => {
        this.setState({ qty: newQty })
    } //function the updates the quantity 

    render() {
        return (
            // Provider accepts a value containting state and functions. This allows the components access to the state but it must be descendants of the provider.
            <ItemDetailsContext.Provider value={{ ...this.state, updateId: this.updateId, updateQty: this.updateQty }}>
                {this.props.children} 
            </ItemDetailsContext.Provider>
        );
    }
}

export default ItemDetailsContextProvider