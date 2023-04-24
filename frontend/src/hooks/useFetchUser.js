import {useState, useEffect} from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';


function useFetchUser() {
    const [_data, setData] = useState([]);
    const [_loading, setLoading] = useState(true);
    const [_error, setError] = useState();
    const [token] = useCookies(['mr-token']);

    useEffect( ()=> {
      async function fetchData() {
        setLoading(true);
        setError();
        const _data = await API.getUser(token['mr-token'])
                            .catch( err => setError(err))
        setData(_data)
        setLoading(false);
      }
      fetchData();
    }, []);
    return [_data, _loading, _error]
}

export {useFetchUser};