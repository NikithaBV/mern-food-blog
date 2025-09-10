import React, { useState } from "react";
import pizza from '../assets/pizza.jpg';
import RecipeItems from "../components/RecipeItems";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import InputForm from "../components/InputForm";
export default function Home(){
    const navigate = useNavigate()
    const [isOpen,setIsOpen]= useState(false)
    const addRecipe=()=>{
        let token= localStorage.getItem("token")
        if(token){
            navigate("/addRecipe")
        }
        else {
            setIsOpen(true)
        }
    }

  return(
    <>
    <section className='home'>
        <div className='left'>
            <h1>Food Recipe</h1>
            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos distinctio dolores recusandae quae sunt repudiandae ex unde nam accusamus perspiciatis ea consequuntur laudantium praesentium, neque quo exercitationem obcaecati nisi in!</h5>
            <button onClick={addRecipe}>Share your recipe</button>
        </div>
        <div className="right">
            <img src={pizza} width="320px" height="320px"></img>
        </div>
    </section>
    <div className="bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,32L26.7,53.3C53.3,75,107,117,160,160C213.3,203,267,245,320,234.7C373.3,224,427,160,480,165.3C533.3,171,587,245,640,245.3C693.3,245,747,171,800,128C853.3,85,907,75,960,90.7C1013.3,107,1067,149,1120,170.7C1173.3,192,1227,192,1280,208C1333.3,224,1387,256,1413,272L1440,288L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>

    </div>
 { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
    {/* fetch data from db */}
    <div className='recipe'>
        <RecipeItems/>
    </div>
    </>
  )
}