import { useState } from 'react';
import axios from 'axios';

const initialRequestInfo = {
    error: null,
    data: null,
    loading: false,
}

export default function useApi(config) {
    const [requestInfo, setRequestInfo] = useState(initialRequestInfo);

    async function call(localConfig) {
        setRequestInfo({
            ...initialRequestInfo,
            loading: true,
        });

        let response = null;
        try {
            response = await axios({
                baseURL: 'http://localhost:5000',
                ...config,
                ...localConfig,
            });
            setRequestInfo({
                ...initialRequestInfo,
                loading: false,
                data: response.data,
            });
        } catch (error) {
            setRequestInfo({
                ...initialRequestInfo,
                error,
                // error: error, 
                //quando se tem uma variável definida
                // em uma passagem de parâmetros [catch (error)], é possível
                // omitir o valor de atribuição, expressando apenas o nome
                // da variável no objeto
            })
        }


        if(config.onCompleted) {
            config.onCompleted(response);
        }
    }
    return [
        call,
        requestInfo
    ]
}