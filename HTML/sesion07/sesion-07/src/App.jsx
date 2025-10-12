import { useState } from 'react';
import './App.css';
import { Boton } from './components/Boton';




// COMENTARIO

function App() {

  const [peticion, setPeticion] = useState(true);
  const handlerOnclick = ()=>{
    if(peticion){
      setPeticion(false);
    }
    else{
      setPeticion(true);
    }
  }


  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Hola Mundo</h1>
    {/* comentario con crtl + k + c*/}
    {
      peticion&& <Boton></Boton>
    }

    {/* al poner Boton no funciona ya que estamos usando un prop y Boton no esta preparado para recibirlo */}

    <button onClick={handlerOnclick}>
      {peticion ? 'Eliminar Boton' : 'Mostrar Boton'}
    </button>

    </>
  )
}

export default App
