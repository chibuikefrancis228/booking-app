import React, { useEffect, useState } from "react";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const  [bdatas, setbdata] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/hotels?featured=true&limit=4")
    .then(res => res.json())
    .then(data => {
      setbdata(data)
      console.log(data)
  }
  )
  
  },[])
  
  return (
    <div className="fp">
          {(typeof bdatas ==='undefined') ?(
      <p>Loading please wait</p>
    ) : (
      <>
        {
          bdatas.map((item)=>(
      <div className="fpItem" key={item._id}>
        <img
          src={item.photos}
          alt=""
          className="fpImg"
        />
        <span className="fpName">item.name</span>
        <span className="fpCity">{item.city}</span>
        <span className="fpPrice">item.cheapestPrice</span>
        {item.rating && <div className="fpRating">
          <button>{item.rating}</button>
          <span>Excellent</span>
        </div>}
      </div>
          ))}
      </>
          )}
    </div>
  );
};

export default FeaturedProperties;
