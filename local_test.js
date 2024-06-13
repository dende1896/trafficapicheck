const axios = require('axios');

async function test() {
    const apiKey = 'gvRSPonF26byQAweIqUpSo7gwafiJg0AwIWF3IZAT60';  // Ersetze dies durch deinen tatsächlichen API-Schlüssel
    const bbox = '9.7320,52.3745,9.7420,52.3845';
    const locationReferencing = 'shape';
    const responseattributes = 'sh,fc';
    const jamFactorThreshold = 4;

    const url = 'https://data.traffic.hereapi.com/v7/flow';
    const params = {
        apiKey,
        bbox,
        locationReferencing,
        responseattributes
    };

    try {
        const response = await axios.get(url, { params });
        const data = response.data;

        const filteredResults = data.results.filter(result =>
            result.currentFlow && result.currentFlow.jamFactor >= jamFactorThreshold
        );

        console.log(filteredResults);
    } catch (error) {
        console.error('Error fetching data from HERE API:', error);
    }
}

test();
