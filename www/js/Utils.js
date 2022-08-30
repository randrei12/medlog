export const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

/**
 * 
 * @param {float} value 
 * @param {integer} noOfDecimals 
 * @returns float
 */
export const roundTo = (value, noOfDecimals = 1) => {
    return Math.round((value + Number.EPSILON) * 10 ** noOfDecimals) / 10 ** noOfDecimals;
}