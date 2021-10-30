import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  dataPullSelector,
  modsPullSelector,
  loadingSelector,
  dataModSelector,
  getDataMods,
  setDataMod,
} from '../store/slices/processDataSlice';
import './styles/processData.css'

export default function ProcessDataView() {
  const data = useSelector(dataPullSelector);
  const mods = useSelector(modsPullSelector);
  const loading = useSelector(loadingSelector);
  const dataMod = useSelector(dataModSelector);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getDataMods());
  }, [dispatch]);
  
  return (
    <div className="info-block border">
      {/*<button onClick={dispatch(getMods())}>Get Mods</button>*/}
      <div className="mods border">
        { mods.map(mod =>
          <div
            className={ `btn ${(mod === dataMod) ? 'selected' : ''}` }
            onClick={() => dispatch(setDataMod(mod))}
            key={mod}
          >
            {mod}
          </div>)
        }
        { (loading) ? <div className="loading">{}</div> : ''}
      </div>
      <div className="stats border">
        {
          Object.keys(data).map(key => (
            <div
              key={key}
            >
              <span>{key}: </span> {data[key]}
            </div>
          ))
        }
      </div>
    </div>
  )
}
