import { useState, useEffect } from 'react'
import { db } from './config/firebase';
import { collection, onSnapshot, getDocs, addDoc } from "firebase/firestore";
import './App.css'

function App() {

  const [datosTabla, setDatosTabla] = useState([]);

  const [formulario, setFormulario] = useState({
    nombre: "",
    cuantos: "",
    fecha: ""
  });

  // Cargar datos de manera manual(bajo demanda) por el programador
  const cargarDatos = async () => {
    console.log("Entro a cargar datos");
    const datos = await getDocs(collection(db, "reservaciones"));
    let datosFormateados = datos.docs.map((doc) => {
      return doc.data();
    });
    setDatosTabla(datosFormateados);
    console.log(datosFormateados);
  }

  // Cargar datos en tiempo real
  // const cargarDatos = async () => {
  //   console.log("Entro a cargar datos");
  //   onSnapshot(collection(db, "reservaciones"), (querySnapshot)=> {
  //     let datosFormateados = querySnapshot.docs.map((doc) => {
  //       return doc.data();
  //     });
  //     setDatosTabla(datosFormateados);
  //   });
  // }

  useEffect(() => {
    cargarDatos()
  }, []);

  const handleInputChange = (event) => {
    setFormulario({
      ...formulario,
      [event.target.name]: event.target.value
    });
  }

  const guardarReservacion = async (event)=> {
    event.preventDefault();
    console.log(formulario);
    // Agregar en firebase
    await addDoc(collection(db, "reservaciones"), formulario);
    // solo llamar cargar datos cuando es carga "manual"
    cargarDatos();
  }

  return (
    <div className='container'>
      <h1 className='text-primary'>Reservas restaurante de Jesus</h1>
      <form onSubmit={guardarReservacion}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" name='nombre' onChange={handleInputChange}/>
          <div className="form-text text-danger fw-bold">Esta persona debera presentarse el dia de la reservacion</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input type="date" className="form-control" name='fecha' onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Cuantos</label>
          <input type="text" className="form-control" name='cuantos' onChange={handleInputChange}/>
        </div>

        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
      <table className="table mt-5 table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Fecha</th>
            <th scope="col">Cuantos</th>
          </tr>
        </thead>
        <tbody>
          {
            datosTabla.map((row, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{row.nombre}</td>
                  <td>{row.fecha}</td>
                  <td>{row.cuantos}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
