import React, { Fragment, useState, useEffect } from 'react';
import Formulario from '../src/components/Formulario';
import Cancion from '../src/components/Cancion';
import Info from '../src/components/Info';
import axios from 'axios';

function App() {

  const [busquedaLetra, setBusquedaLetra] = useState({});
  const { artista, cancion } = busquedaLetra;
  const [letra, setLetra] = useState('');
  const [info, setInfo] = useState({})


  useEffect(() => {

    if (Object.keys(busquedaLetra).length === 0) return;

    const consultarApiLetra = async () => {
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`

      //Promise para que ambas consultas inicien al mismo tiempo
      const [letra, informacion] = await Promise.all([
        axios(url),
        axios(url2)
      ]);

      setLetra(letra.data.lyrics);
      setInfo(informacion.data.artists[0]);

      // setLetra(resultado.data.lyrics);

    }

    consultarApiLetra();

  }, [busquedaLetra, info])

  return (
    <Fragment >
      <Formulario
        setBusquedaLetra={setBusquedaLetra}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info
            info={info}/>
          </div>
          <div className="col-md-6">
            <Cancion
              letra={letra}
            />
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default App;
