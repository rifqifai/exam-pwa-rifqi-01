/**
 * function to generate config product
 * @param Object query
 * @param Object configuration
 * @returns object
 */
const generateConfig = (query, config, elastic) => {
    const resolveConfig = config;
    // eslint-disable-next-line no-restricted-syntax
    for (const q in query) {
        if (q === 'q') {
            resolveConfig.search = query[q];
        } else if (q === 'sort' && query[q] !== '') {
            resolveConfig.sort = JSON.parse(query[q]);
        } else if (q === 'priceRange') {
            const price = query[q].split(',');
            // eslint-disable-next-line radix
            if (parseInt(price[1]) !== 0) {
                resolveConfig.filter.push({
                    type: 'price',
                    from: price[0],
                    to: price[1],
                });
            }
        } else if (q !== 'cat') {
            resolveConfig.filter.push({
                type: q,
                value: elastic ? query[q].split(',') : query[q],
            });
        }
    }
    return resolveConfig;
};

export default generateConfig;
