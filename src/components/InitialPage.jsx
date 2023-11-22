import { useEffect } from "react"
import { useState } from "react"
import { getWord } from "../api/api"
import { useNavigate } from "react-router-dom"

export const InitialPage = ({setFinalWord}) =>{
    const navigate = useNavigate()
    const [currentWord,setCurrentWord] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [isLoading, setisLoading] = useState(false)
    function CheckingWord(event){
        event.preventDefault()
        setisLoading(true)
        if (!(currentWord.split(" ").join(""))){
            setErrorMessage("please type a word")
            setisLoading(false)
        }else{
            getWord(currentWord).then((res) =>{
                if(res === `Sorry pal, we couldn't find definitions for the word you were looking for.`){
                    console.log(res)
                    setErrorMessage(res)
                    setisLoading(false)
                }else{
                    setFinalWord(res)
                    navigate('/answer')
                }
            })
        }

    }
    if (!isLoading){
    return (<div>
        <form class="form" onSubmit={CheckingWord}>
            <label htmlFor=""><b>Please enter a word</b></label>
            <input placeholder="Word" id="url" value={currentWord} onChange={(event) =>{
                setCurrentWord(event.target.value)
                setErrorMessage("")
            }}>
            </input>
            <button>Submit here</button>
            <p>{errorMessage}</p>
        </form>
        <div id="image">
        <img src="https://cdn.vectorstock.com/i/preview-1x/65/53/dictionary-vector-1296553.jpg"/>
        </div>
    </div>)
    }else{
        return <div id="center-div"><h2>Loading....</h2>
        </div>
    }
}