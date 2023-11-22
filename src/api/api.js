import axios from "axios";
const dictionaryApi = axios.create({
    baseURL : "https://api.dictionaryapi.dev/api/v2/entries/en"
})

export const getWord = async (word) =>{
    try {
        const { data } = await dictionaryApi.get(`/${word}`);
        const myDefinitions = []
        const myWord = {word : data[0].word, synonyms : data[0].meanings[0].synonyms}
        if (((data[0].meanings[0].definitions).length) < 3){
           myWord.definitions = data[0].meanings[0].definitions
           console.log(myWord)
           return myWord
        }else{
            for (let i = 0; i < 3;i++){
                myDefinitions.push(data[0].meanings[0].definitions[i])
            }
            myWord.definitions = myDefinitions
            console.log(data[0].meanings[0].synonyms)
            console.log(myWord)
            return myWord
        }
    } catch ({response}) {
        const myMessage = `${response.data.message}`
        return myMessage
    }
}
getWord("word")