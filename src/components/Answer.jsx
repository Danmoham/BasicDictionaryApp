import { useNavigate } from "react-router-dom"
import { getWord } from "../api/api"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
export const Answer = ({setFinalWord,finalWord}) =>{
    const [isLoading,setisLoading] = useState(false)
    const [isError,setIsError] = useState(false)
    function setNewWord(event){
        event.preventDefault()
        let currentWord = event.target.value
        console.log(currentWord)
        setisLoading(true)
        getWord(currentWord).then((res) =>{
            if(res === `Sorry pal, we couldn't find definitions for the word you were looking for.`){
                console.log(res)
                setisLoading(false)
                setIsError(true)
            }else{
                setFinalWord(res)
                setisLoading(false)
                navigate('/answer')
            }
    })

    }


    const navigate = useNavigate()
    if (isLoading){
        return <h2 class="answer">Loading...</h2>
    }else if(isError){
       return ( <div class="answer">
        <p>The definition for this is not currently available, please go back</p>
        <div>
    <button class="go-again" onClick={(event) =>{
        navigate("/")
    }}>Go Back</button>
    </div>
</div>)
    }else if (finalWord.synonyms.length === 0){
    return (<div class="answer">
        <h2 class="mainWord">{finalWord.word}</h2>
        <div>
        <h3>Most Common Defintions</h3>
        <ol>
        {finalWord.definitions.map((eachitem,index) =>{
            return (<li
    key={eachitem.definition}>{index+1}) {eachitem.definition}</li>)
        })}
        </ol>
        </div>
   <p><b>There are no similar words available</b></p>

<div>
    <button onClick={(event) =>{
        navigate("/")
    }}>Go Again!</button>
    </div>
    </div>)
    }else{
        return(<div class="answer">
            <div>
             <h2 class="mainWord">{finalWord.word}</h2>
        <h3>Most Common Defintions</h3>
        <ol>
        {finalWord.definitions.map((eachitem,index) =>{
            return (<li
    key={eachitem.definition}>{index+1}) {eachitem.definition}</li>)
        })}
        </ol>
        </div>
        <h3>Similar Words</h3>
        <div id="change-buttons">
        {finalWord.synonyms.map((eachitem) =>{
           return <button value={eachitem} onClick={setNewWord}key={eachitem}>{eachitem}</button>
        })}
        </div>
        <div>
        <button class="go-again" onClick={((e) =>{
          navigate("/")  
        })}>
Go Again!</button>
    </div>
        </div>)
    }
}