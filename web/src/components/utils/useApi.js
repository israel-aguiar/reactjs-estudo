import { useState } from 'react';
import axios from 'axios';
import useDebouncedPromise from './useDebauncedPromise';

const initialRequestInfo = {
    error: null,
    data: null,
    loading: false,
}

export default function useApi(config) {
    const [requestInfo, setRequestInfo] = useState(initialRequestInfo);
    const debouncedAxios = useDebouncedPromise(axios, config.debounceDelay);

    async function call(localConfig) {
        setRequestInfo({
            ...initialRequestInfo,
            loading: true,
        });

        let response = null;

        const finalConfig = {
            baseURL: 'http://localhost:5000',
            ...config,
            ...localConfig,
        };

        const fn = finalConfig.debounced ? debouncedAxios : axios;
        try {
            response = await fn(finalConfig);
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

        return response;
    }
    return [
        call,
        requestInfo
    ]
}