export function createImageSrc({ path, type, size = 'original' }) {
    let imageSrc;

    try {
        imageSrc = buildImageUrl({ path, type, size });
    } catch (error) {
        console.error('An error occured while trying to create image src. Used the default base64 image src, instead.', error);
        imageSrc = defaultImageBase64Data;
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

    const imageTypes = parseImageTypesFromConfig(imageConfig);

    if (!imageTypes.includes(type)) {
        throw new Error(`"${type}" image type is not supported. Use one of ${imageTypes}`);
    }

    const supportedSizes = imageConfig[`${type}_sizes`];

    if (!supportedSizes.includes(size)) {
        throw new Error(`"${size}" image size is not supported. Use one of ${supportedSizes}`);
    }

    return `${imageConfig.secure_base_url}${size}${path}`;
}

function parseImageTypesFromConfig(imageConfig) {
    return Object.keys(imageConfig)
        .filter(key => key.endsWith('_sizes'))
        .map(typeKey => typeKey.split('_')[0]);
}

const imageConfig = Object.freeze({
    base_url: "http://image.tmdb.org/t/p/",
    secure_base_url: "https://image.tmdb.org/t/p/",
    backdrop_sizes: [
        "w300",
        "w780",
        "w1280",
        "original"
    ],
    logo_sizes: [
        "w45",
        "w92",
        "w154",
        "w185",
        "w300",
        "w500",
        "original"
    ],
    poster_sizes: [
        "w92",
        "w154",
        "w185",
        "w342",
        "w500",
        "w780",
        "original"
    ],
    profile_sizes: [
        "w45",
        "w185",
        "h632",
        "original"
    ],
    still_sizes: [
        "w92",
        "w185",
        "w300",
        "original"
    ]
});

// this image is used if image path is not found for a resource
const defaultImageBase64Data =
    `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAA
    LuCAQAAADyeixhAAAGSElEQVR42u3TAQ0AAAjDMO5fImKOD9JKWLJ
    sB3guRgejA0YHjA4YHTA6YHTA6IDRweiA0QGjA0YHjA4YHTA6YHQw
    OmB0wOiA0QGjA0YHjA4YHYxudDA6YHTA6IDRAaMDRgeMDhgdjA4YH
    TA6YHTA6IDRAaMDRgejA0YHjA4YHTA6YHTA6IDRwegigNEBowNGB4
    wOGB0wOmB0wOhgdMDogNEBowNGB4wOGB0wOhgdMDpgdMDogNEBowN
    GB4wORgeMDhgdMDpgdMDogNEBowNGB6MDRgeMDhgdMDpgdMDogNHB
    6IDRAaMDRgeMDhgdMDpgdDA6YHTA6IDRAaMDRgeMDhgdMDoYHTA6Y
    HTA6IDRAaMDRgeMDkYHjA4YHTA6YHTA6IDRAaOD0QGjA0YHjA4YHT
    A6YHTA6IDRweiA0QGjA0YHjA4YHTA6YHQwOmB0wOiA0QGjA0YHjA4
    YHYwOGB0wOmB0wOiA0QGjA0YHjA5GB4wOGB0wOmB0wOiA0QGjg9EB
    owNGB4wOGB0wOmB0wOhgdMDogNEBowNGB4wOGB0wOmB0MDpgdMDog
    NEBowNGB4wOGB2MDhgdMDpgdMDogNEBowNGB6MDRgeMDhgdMDpgdM
    DogNEBo4PRAaMDRgeMDhgdMDpgdMDoYHTA6IDRAaMDRgeMDhgdMDo
    YHTA6YHTA6IDRAaMDRgeMDhgdjA4YHTA6YHTA6IDRAaMDRgejA0YH
    jA4YHTA6YHTA6IDRweiA0QGjA0YHjA4YHTA6YHQwutHB6IDRAaMDR
    geMDhgdMDpgdDA6YHTA6IDRAaMDRgeMDhgdjA4YHTA6YHTA6IDRAa
    MDRgejGx2MDhgdMDpgdMDogNEBowNGB6MDRgeMDhgdMDpgdMDogNH
    B6IDRAaMDRgeMDhgdMDpgdDC6CGB0wOiA0QGjA0YHjA4YHTA6GB0w
    OmB0wOiA0QGjA0YHjA5GB4wOGB0wOmB0wOiA0QGjg9EBowNGB4wOG
    B0wOmB0wOiA0cHogNEBowNGB4wOGB0wOmB0MDpgdMDogNEBowNGB4
    wOGB2MDhgdMDpgdMDogNEBowNGB4wORgeMDhgdMDpgdMDogNEBo4P
    RAaMDRgeMDhgdMDpgdMDoYHTA6IDRAaMDRgeMDhgdMDpgdDA6YHTA
    6IDRAaMDRgeMDhgdjA4YHTA6YHTA6IDRAaMDRgejA0YHjA4YHTA6Y
    HTA6IDRAaOD0QGjA0YHjA4YHTA6YHTA6GB0wOiA0QGjA0YHjA4YHT
    A6GB0wOmB0wOiA0QGjA0YHjA4YHYwOGB0wOmB0wOiA0QGjA0YHowN
    GB4wOGB0wOmB0wOiA0cHogNEBowNGB4wOGB0wOmB0wOhgdMDogNEB
    owNGB4wOGB0wOhgdMDpgdMDogNEBowNGB4wORgeMDhgdMDpgdMDog
    NEBowNGB6MDRgeMDhgdMDpgdMDogNHB6IDRAaMDRgeMDhgdMDpgdD
    A6YHTA6IDRAaMDRgeMDhgdjG50MDpgdMDogNEBowNGB4wOGB2MDhg
    dMDpgdMDogNEBowNGB6MDRgeMDhgdMDpgdMDogNHB6EYHowNGB4wO
    GB0wOmB0wOiA0cHogNEBowNGB4wOGB0wOmB0MDpgdMDogNEBowNGB
    4wOGB2MLgIYHTA6YHTA6IDRAaMDRgeMDkYHjA4YHTA6YHTA6IDRAa
    OD0QGjA0YHjA4YHTA6YHTA6GB0wOiA0QGjA0YHjA4YHTA6YHQwOmB
    0wOiA0QGjA0YHjA4YHYwOGB0wOmB0wOiA0QGjA0YHowNGB4wOGB0w
    OmB0wOiA0QGjg9EBowNGB4wOGB0wOmB0wOhgdMDogNEBowNGB4wOG
    B0wOhgdMDpgdMDogNEBowNGB4wOGB2MDhgdMDpgdMDogNEBowNGB6
    MDRgeMDhgdMDpgdMDogNHB6IDRAaMDRgeMDhgdMDpgdMDoYHTA6ID
    RAaMDRgeMDhgdMDoYHTA6YHTA6IDRAaMDRgeMDkYHjA4YHTA6YHTA
    6IDRAaMDRgejA0YHjA4YHTA6YHTA6IDRweiA0QGjA0YHjA4YHTA6Y
    HQwOmB0wOiA0QGjA0YHjA4YHTA6GB0wOmB0wOiA0QGjA0YHjA5GB4
    wOGB0wOmB0wOiA0QGjg9EBowNGB4wOGB0wOmB0wOjAAeZ/b+ZQlT5
    wAAAAAElFTkSuQmCC`;
