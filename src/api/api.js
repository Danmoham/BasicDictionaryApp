import axios from "axios";
const dictionaryApi = axios.create({
    baseURL : "https://api.dictionaryapi.dev/api/v2/entries/en"
})

export const getWord = async (word) =>{
    try {
        const synonyms = []
        const { data } = await dictionaryApi.get(`/${word}`);
        const myDefinitions = []
        const myWord = {word : data[0].word, }
        if (((data[0].meanings[0].definitions).length) < 3){
           myWord.definitions = data[0].meanings[0].definitions
           for (let i = 0; i < data[0].meanings.length;i++){
            data[0].meanings[i].synonyms.forEach(element => {
                let myEl = element.split(" ")
                if (myEl.length === 1){
                synonyms.push(element)
                }
            });
        }
            myWord.synonyms = synonyms
           return myWord
        }else{
            for (let i = 0; i < 3;i++){
                myDefinitions.push(data[0].meanings[0].definitions[i])
            }
            myWord.definitions = myDefinitions

            for (let i = 0; i < data[0].meanings.length;i++){
                data[0].meanings[i].synonyms.forEach(element => {
                    let myEl = element.split(" ")
                    if (myEl.length === 1){
                    synonyms.push(element)
                    }                });
            }
            myWord.synonyms=synonyms
            return myWord
        }
    } catch ({response}) {
        const myMessage = `${response.data.message}`
        return myMessage
    }
}
