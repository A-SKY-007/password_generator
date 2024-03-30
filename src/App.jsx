import { useState ,useCallback, useEffect ,useRef} from 'react'
import './App.css'

function App() {

  const [length,setlength] = useState(8)
  const [numberAllowed ,setnumberAllowed] =useState(false)
  const [characterAllowed, setcharacterAllowed]=useState(false)
  const [password, setpassword]=useState("")
  const passwordref=useRef(null)

  let Generator= useCallback(()=> {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str+="0123456789"
    }
    if (characterAllowed) {
      str+="@#$%^&_+=";
    }

    for (let i = 1; i <= length; i++){   
      let ch=Math.floor(Math.random()* str.length+1)

      pass+=str.charAt(ch)
      setpassword(pass)
    }
  },[length,numberAllowed,characterAllowed,setpassword])

  useEffect(()=>{
    Generator()
  },[length,numberAllowed,characterAllowed,setpassword])

  let copytoclipboard = useCallback(()=>{
    passwordref.current.select()
    window.navigator.clipboard.writeText(password)
  },[password])  
  return (
    <>
      <h1>Password Generator</h1>
      <nav>
        <input id='password'placeholder='password' readOnly value={password} ref={passwordref}/>
        <button id='copy' onClick={copytoclipboard}>Copy</button>
        <br /><br />
        <input type="range" 
        min={8} max={50} id="ranger" 
        value={length} 
        onChange={(e)=>{setlength(e.target.value)}}/><label htmlFor="">Range :{length}</label>
        <input type="checkbox" id="number"
        defaultChecked={numberAllowed}
        onChange={()=>{setnumberAllowed((prev)=>!prev)}}/><label>Number</label>
        <input type="checkbox" id="character"
        defaultChecked={characterAllowed}
        onChange={()=>{setcharacterAllowed((prev)=>!prev)}}/><label>Character</label>
        <button id='refresh'onClick={Generator}><img src="src\assets\icons8-refresh-20.png" alt='teri tho'/></button>
      </nav>
    </>
  )
}

export default App
