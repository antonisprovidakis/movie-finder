import {
    defaultBackdropImageBase64Data,
    defaultPosterImageBase64Data,
    imageTypes,
    imageConfig
} from '../constants/image';

export default function createImageSrc({ path, type, size = 'original' }) {
    let imageSrc;

    try {
        imageSrc = buildImageUrl({ path, type, size });
    } catch (error) {
        console.error('An error occured while creating image src. Fallback to default base64 image.', error);

        switch (type) {
            case 'backdrop':
                imageSrc = defaultBackdropImageBase64Data;
                break;
            case 'poster':
            default:
                imageSrc = defaultPosterImageBase64Data;
                break;
        }
    }

    return imageSrc;
}

function buildImageUrl({ path, type, size }) {
    if (path === null || path === undefined) {
        throw new Error('"path" cannot be null or undefined');
    }

    if (typeof path !== 'string') {
        throw new Error('"path" must be a string.');
    }

    if (path.length === 0 || !path.startsWith('/')) {
        throw new Error(`"${path}": Check the path`);
    }

    if (!imageTypes.includes(type)) {
        throw new Error(`"${type}" image type is not supported. Use one of ${imageTypes}`);
    }

    const supportedSizes = imageConfig[`${type}_sizes`];

    if (!supportedSizes.includes(size)) {
        throw new Error(`"${size}" image size is not supported. Use one of ${supportedSizes}`);
    }

    return `${imageConfig.secure_base_url}${size}${path}`;
}
