export default function extractPageFromReactRouterLocation(reactRouterLocation) {
    const params = new URLSearchParams(reactRouterLocation.search);
    const page = params.get('page') || 1; // TODO: 0 < page < 1000
    return Number(page);
}
