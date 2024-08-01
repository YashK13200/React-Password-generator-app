import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [NumberAllowed, setNumberAllowed] = useState(false)
  const [CharAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('');
 
  // useRef Hook
  const passwordRef = useRef(null) 

  // useCallback hook
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (NumberAllowed) { str += "0123456789" }
    if (CharAllowed) { str += "@$#%*-+^!" }
    
    for (let i = 1; i <=length; i++){
      let char = Math.floor(Math.random()*str.length + 1)
    
      pass += str.charAt(char)
    }
   
    setPassword(pass)

  }, [length, NumberAllowed, CharAllowed, setPassword])
  
  const copyPasswordToClip = useCallback(() => {
    // usually we  useRef to add features like here like when we copy the content of it gets highloght it,or 
    // on clicking copy it should change color or something and now we will use thuis useRrf
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
  },[password])


  // useEffect Hook
  // called on the first time of opening the app
  useEffect(() => {
    passwordGenerator()
  },[length,NumberAllowed,CharAllowed,passwordGenerator])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8
       text-orange-500 bg-gray-700 '>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button 
            onClick={copyPasswordToClip}
            className='outline-none bg-blue-600
           text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'> 
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) =>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={NumberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label >Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={CharAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
          
        </div>
   </div>
    </>
  )
}

export default App
