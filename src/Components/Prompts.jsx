import { useState } from "react"
import Loading from "./Loading"

const Prompts = () => {

  const [promptList, setPromptList] = useState([])
  const [keywords, setKeywords] = useState("")
  const [loadingStatus, setLoadStatus] = useState('not_loading')

  const getPrompt = async () => {
    setLoadStatus('loading');
    const res = await fetch('https://promptgenapi-production.up.railway.app/generatePrompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        "keywords": keywords
      })
    })

    const data = await res.json();
    const str = await data.content + ''
    const arr = await str.split(/\r?\n/);
    console.log(arr);
    setPromptList(arr)
    setLoadStatus('not_loading')
  }


  return (
    <div>
      <h3>Enter keywords seperated with commas</h3>
      <input type="text" placeholder="Enter keywords" onChange={(e) => setKeywords(e.target.value)} />
      <button onClick={() => getPrompt()}>Generate prompt</button>
      {loadingStatus === 'loading' ? <Loading /> : <List promptList={promptList} />}
    </div>
  )
}

const List = ({promptList}) => {
  return (
    <div>
      <div>
        {promptList.map((pr, id) => {
          if (pr === "") return;
          return <PromptComponent key={id} promptText={pr} />
        })}
      </div>
    </div>
  )
}

const PromptComponent = ({ promptText }) => {

  const [imgurl, setImgurl] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(promptText)
  }

  const generateImage = async () => {
    console.log(promptText)
    const res = await fetch('http://localhost:3000/generateImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        "prompt": promptText
      })
    })

    const data = await res.json();
    setImgurl(data.output[0]);
    console.log(data.output[0])

  }

  return (
    <div>
      <p>{promptText}</p>
      <button onClick={() => copyToClipboard()}>Copy to clipboard</button>
      <button onClick={() => generateImage()}>Generate image</button>
      <img src={imgurl} />
    </div>
  )
}

export default Prompts