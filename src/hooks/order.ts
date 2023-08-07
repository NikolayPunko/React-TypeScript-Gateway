import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";

export function useOrders() {


    const [orders, setOrders] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function fetchOrders() {
        try {
            setError('');
            setLoading(true);
            const response = await axios.get<any>('https://fakestoreapi.com/products?limit=5');
            setOrders(response.data);
            setLoading(false);
        } catch (e: unknown) {
            const error = e as AxiosError;
            setLoading(false);
            setError(error.message)

        }
    }

    useEffect(() => {
        fetchOrders()
    }, []);

    return { orders, loading, error}
}