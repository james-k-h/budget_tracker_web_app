import {useState, useEffect} from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';

function useFetchExpense() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [token] = useCookies(['mr-token']);

    useEffect( ()=> {
      async function fetchData() {
        setLoading(true);
        setError();
        const data = await API.getExpense(token['mr-token'])
                            .catch( err => setError(err))
        setData(data)
        setLoading(false);
      }
      fetchData();
    }, []);
    return [data, loading, error]
}

export {useFetchExpense};