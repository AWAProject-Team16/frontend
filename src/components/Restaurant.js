import React, { useState, useEffect } from 'react';
import styles from '../css/Restaurant.module.css';
import { useParams } from 'react-router-dom';
import RestaurantDetail from './RestaurantDetail';
import axios from 'axios';
// const result = window.location.pathname.split('/')[2]

export default function Restaurant({isManagerView}) {
  var API_ADDRESS = process.env.REACT_APP_API_ADDRESS
  var result = useParams()
  var path = result.idOfRestaurant

  const [obj, setObj] = useState([])
  useEffect(() => {
    function fetchOne(x) {
      axios.get(`${API_ADDRESS}/restaurants/id/${x}`)
      .then((res) => {
        setObj(res.data[0])
      })
      .catch(err => console.log(err))
    }
    fetchOne(path)
  }, [path, API_ADDRESS])

  const [objCategories, setObjCategories] = useState([])
  useEffect(() => {
    function fetchData(x) {
      axios.get(`${API_ADDRESS}/categories/restaurant/${x}`)
      .then((res) => {
        setObjCategories(res.data.Categories)
      })
      .catch(err => console.log(err))
    }
    fetchData(path)
  }, [path, API_ADDRESS])

  const [objProducts, setObjProducts] = useState([])
  useEffect(() => {
    async function fetchData(x) {
      // const response = await MyAPI.getData(someId);
      try {
        let res = await axios.get(`${API_ADDRESS}/products/restaurant/${x}`)
        setObjProducts(res.data.Products)
        // return res.data.Products
      }
      catch(err) {
        // alert(err)
        console.log(err)
      }
    }
    fetchData(path);
  }, [path, API_ADDRESS])

  // const obj = props.restaurants.find(item => item.idrestaurants === parseInt(result.idOfRestaurant));
  // if(obj == null) {
  if(obj.idrestaurants == null) {
    return <div><h1 style={{textAlign: 'center'}}>No matching restaurant</h1></div>
  }
  
  // console.log(props.categories)
  // const objCategories = props.categories.find(item => item.idrestaurants === obj.idrestaurants);
  // const objCategories = props.categories.filter(item => item.idrestaurants === obj.idrestaurants)  // fine
  // console.log(objCategories)
  
  // const objProducts = props.products.filter(item => item.idrestaurants === obj.idrestaurants)  // !!!
  
  return (
    <div>
      <div className= {styles.header}>
        <img alt="true" className= {styles.image} src={`/images/event.png`} />
      </div>
      <div className= {styles.container}>
        <div className= {styles.categories}>
          {
            objCategories.map(item =>
              // <Link to={ item.idcategories } key={item.idcategories}>
              //   <div className={ styles.categoryListElement }> { item.name } </div>
              // </Link>
              <div className={ styles.categoryListElement } key={item.idcategories}> 
                <a href={ '#' + item.idcategories }>{ item.category_name }</a>
              </div>
          )}
        </div>
        <div className= {styles.products}>
          {/* {
            objProducts.map(item =>
              <div className={ styles.productListElement } key={ item.idproducts }> { item.name } </div>)
          } */}
          {
            objCategories.map(item =>
              <RestaurantDetail
                key={ item.idcategories }
                idrestaurants={ parseInt(result.idOfRestaurant) }
                categories ={ objCategories }
                category={ item }
                products={ objProducts }
                isManagerView={isManagerView}
              />) 
          }
        </div>
        <div className= {styles.info}>
          <h4>Restaurant information</h4>
          <h5>{ obj.name }</h5>
          <h5>Address</h5>
          <div>{ obj.address }</div>
          <h5>Phone no.</h5>
          <div>{ obj.phonenumber }</div>
          <h5>Opening times</h5>
          <div>{ obj.operating_hours }</div>
          <h5>About restaurant</h5>
          <div>{ obj.restaurant_description }</div>
        </div>
      </div>
    </div>
  )
}
