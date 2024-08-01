import React from 'react'
import CategoryList from '../Componets/CategoryList'
import Banner from '../Componets/Banner'
import ProductsCardRow from '../Componets/ProductsCardRow'
import ProductCardColoum from '../Componets/ProductCardColoum'




const Home = () => {
  return (
    <div>
      <CategoryList/>
      <Banner />
      <ProductsCardRow category={"camera"} heading={"Treding Cameras Right Now"}/>
      <ProductsCardRow category={"watches"} heading={"Top Watches Right Now"}/>
      <ProductCardColoum category={"televisions"} heading={"Popular TVs Selling"} />
      <ProductCardColoum category={"earphones"} heading={"Wired Earphones"}/>
      <ProductCardColoum category={"speakers"} heading={"Bluetooth Speakers"}/>
      <ProductCardColoum category={"trimmers"} heading={"Trimmers"}/>
      <ProductCardColoum category={"Mouse"} heading={"Mouse"}/>
      <ProductCardColoum category={"airpodes"} heading={"Top's Airpodes"}/>

      </div>
  )
}

export default Home