import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";

const useRequestData = (url, initialState) => {
  const [data, setData] = useState(initialState);
  const history = useHistory();

  
  useEffect(() => {

    const fetchData = () => {
        axios
        .get(url)
        .then( response => {
            setData(response.data.trips);
        })
        .catch( err => {
            alert("Ops, algo deu errado: " + err.message)
        })
    };

    fetchData();
    
  }, [history])

  return data;

};

export default useRequestData;
