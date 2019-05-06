import { normalize } from 'normalizr';

export default function processTMDBResponse(response, schema) {
    if (!schema) {
        return {
            data: response
        };
    }
    if (!response.results) {
        const data = normalize(response, schema);
        return {
            data
        };
    }
    const { results, ...pagination } = response;
    const data = normalize(results, schema);
    return {
        data,
        pagination
    };
}
