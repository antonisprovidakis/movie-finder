import { normalize } from 'normalizr';

export default function processTMDBResponse(response, schema) {
    if (!schema) {
        return {
            data: response
        };
    }
    if (!response.results) {
        return {
            data: normalize(response, schema)
        };
    }
    const { results, ...pagination } = response;
    return {
        data: normalize(results, schema),
        pagination
    };
}
