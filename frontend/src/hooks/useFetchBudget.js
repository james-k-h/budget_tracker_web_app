import {useState, useEffect} from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';

function useFetchBudget() {
    const [__data, setData] = useState([]);
    const [__loading, setLoading] = useState(true);
    const [__error, setError] = useState();
    const [token] = useCookies(['mr-token']);

    useEffect( ()=> {
      async function fetchData() {
        setLoading(true);
        setError();
        const data = await API.getBudget(token['mr-token'])
                            .catch( err => setError(err))
        setData(data)
        setLoading(false);
      }
      fetchData();
    }, []);
    return [__data, __loading, __error]
}

export {useFetchBudget};