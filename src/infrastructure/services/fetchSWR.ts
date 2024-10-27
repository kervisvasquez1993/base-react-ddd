import useSWR, { SWRConfiguration } from "swr";
const fetcher = (url: string, token?: string) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    return fetch(url, { headers }).then((res) => res.json());
};
export const fetchSWR = (
    url: string,
    config: SWRConfiguration = {},
    token?: string
) => {
    const { data, error, mutate } = useSWR(
        import.meta.env.VITE_API_BACKEND + url,
        (url) => fetcher(url, token),
        config
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};
