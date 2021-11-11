import React from 'react'
import styles from './../css/ShoppingCartProduct.module.css'

const ShoppingCartProduct = props => {
    const cost = props.cost;
    const qty = props.qty;
    let TotalCost = cost * qty;
    TotalCost = parseFloat(TotalCost.toFixed(2));
    return <div className = {styles.ShoppingCartProduct}>
        <button className={styles.Productqty} onClick={ () => props.IncreaseAmount(props.id, props.cost)}>
            +
        </button>
        <div className={styles.Productqty}>
            { props.qty }x
        </div>
        <button className={styles.Qtybutton} onClick={ () => props.DecreaseAmount(props.id, props.cost)}>
            -
        </button>
        <div className= {styles.ProductName}>
            { props.value }
        </div>
        <div className= {styles.ProductCost}>
            { TotalCost } €
        </div>
        <button className={styles.Removebutton} onClick={ () => props.DeleteProduct(props.id, props.qty, props.cost)}>
            X
        </button>
    </div>
}

export default ShoppingCartProduct
