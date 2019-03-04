export function routeNameToTitle(routeName, charToSplit = '-') {
    const lowercasedWords = routeName.split(charToSplit);

    const capitalizedWords = lowercasedWords.reduce(
        (acc, word) => {
            acc.push(word.charAt(0).toUpperCase() + word.substr(1))
            return acc;
        },
        []
    );

    return capitalizedWords.join(' ');
}
