import {
  defaultBackdropImageBase64Data,
  defaultPosterImageBase64Data,
  imageTypes,
  imageConfig
} from '../constants/image';

export default function createImageSrc({ path, type, size = 'original' }) {
  if (!isValidPath(path)) {
    return getDefaultImage(type);
  }

  if (!isValidType(type, imageTypes)) {
    return getDefaultImage(type);
  }

  const supportedSizes = imageConfig[`${type}_sizes`];
  if (!isValidSize(size, supportedSizes)) {
    return getDefaultImage(type);
  }

  return `${imageConfig.secure_base_url}${size}${path}`;
}

function getDefaultImage(type) {
  console.log('Fallback to default base64 image.');

  switch (type) {
    case 'backdrop':
      return defaultBackdropImageBase64Data;
    case 'poster':
    default:
      return defaultPosterImageBase64Data;
  }
}

function isValidPath(path) {
  if (typeof path !== 'string') {
    console.log('"path" must be a string.');
    return false;
  }

  if (!path.length) {
    console.log('"path" cannot be empty string');
    return false;
  }

  if (!path.startsWith('/')) {
    console.log('"path" must start with a /');
    return false;
  }

  return true;
}
function isValidType(type, supportedTypes) {
  if (!supportedTypes.includes(type)) {
    console.log(
      `"${type}" image type is not supported. Use one of ${supportedTypes}`
    );
    return false;
  }
  return true;
}

function isValidSize(size, supportedSizes) {
  if (!supportedSizes.includes(size)) {
    console.log(
      `"${size}" image size is not supported. Use one of ${supportedSizes}`
    );
    return false;
  }
  return true;
}
