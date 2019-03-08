const genderTypes = Object.freeze([
    'Not specified',
    'Female',
    'Male'
]);

export function getGenderNameFromId(id = 0) {
    return genderTypes[id] || genderTypes[0];
}
