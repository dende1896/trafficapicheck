const axios = require('axios');

module.exports = async (req, res) => {
    const apiKey = req.query.apiKey;
    const bbox = req.query.bbox;
    const locationReferencing = req.query.locationReferencing || 'shape';
    const responseattributes = req.query.responseattributes || 'sh,fc';
    const jamFactorThreshold = parseInt(req.query.jamFactor, 10) || 4;

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

        res.status(200).json(filteredResults);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
