export function trimOverview(overview) {
    // TODO: better export a const? and make function receive limit as param?
    const CHARS_TO_BE_REMOVED = ['.', ',', ':', '-', '/'];
    const OVERVIEW_CHAR_LIMIT_FOR_CARD = 220;

    if (overview.length <= OVERVIEW_CHAR_LIMIT_FOR_CARD) {
        return overview;
    }

    const overviewUpToLimit = overview.substring(0, OVERVIEW_CHAR_LIMIT_FOR_CARD);
    const overviewBeforeLastSpace = overview.substring(0, overviewUpToLimit.lastIndexOf(' ')).trim();

    if (isLastCharacterOfStrOneOf(overviewBeforeLastSpace, CHARS_TO_BE_REMOVED)) {
        return stripLastChar(overviewBeforeLastSpace) + '...';
    }

    return overviewBeforeLastSpace + '...';
}

function isLastCharacterOfStrOneOf(str, characters) {
    const lastChar = str.substring(str.length - 1);
    return characters.includes(lastChar);
}

function stripLastChar(str) {
    return str.substring(0, str.length - 1);
}
