import { camelize } from 'humps';

export default function camelizeCategory(categorySlug) {
    return camelize(categorySlug);
}
