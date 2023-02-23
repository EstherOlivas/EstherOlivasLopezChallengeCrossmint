const axios = require('axios');

const basePath = 'https://challenge.crossmint.io/api';
const candidateId = '3914c806-a0b8-4f94-bf97-bf249222e274';

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

const errorHandler = async (error) => {
    console.log(error);
}

const axiosPostClient = async (path, data, maxRetry = 5 ) => {
    if(maxRetry <= 0){
        throw Error("Exceeded the max of retries");
    }

    const result = await axios.post(path, data).catch(error => error.response);

    if (result.status == 429) {
        console.log(`retrying ${JSON.stringify(data)}`);
        await delay(2000);
        await axiosPostClient(path, data, maxRetry-1);
    }
}

const getGoal = async (row, col) => {
    const result = await axios.get(`${basePath}/map/${candidateId}/goal`, {
        row: row,
        column: col,
        candidateId: candidateId
    });

    return result.data.goal;
};

const createPolyanets = async (row, col) => {
    await axiosPostClient(`${basePath}/polyanets`, {
        row: row,
        column: col,
        candidateId: candidateId
    }).catch(errorHandler);
};

const deletePolyanets = async (row, col) => {
    await axios({
        method: 'delete',
        url: `${basePath}/polyanets`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            row: row,
            column: col,
            candidateId: candidateId
        }
    }).catch(errorHandler);;
};

const createSoloons = async (row, col, color) => {
    await axiosPostClient(`${basePath}/soloons`, {
        row: row,
        column: col,
        color: color,
        candidateId: candidateId
    }).catch(errorHandler);
};

const deleteSoloons = async (row, col) => {
    await axios({
        method: 'delete',
        url: `${basePath}/soloons`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            row: row,
            column: col,
            candidateId: candidateId
        }
    }).catch(errorHandler);;
};

const createCometh = async (row, col, direction) => {
    await axiosPostClient(`${basePath}/comeths`, {
        row: row,
        column: col,
        direction: direction,
        candidateId: candidateId
    }).catch(errorHandler);
};

const deleteCometh = async (row, col) => {

    await axios({
        method: 'delete',
        url: `${basePath}/comeths`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            row: row,
            column: col,
            candidateId: candidateId
        }
    }).catch(errorHandler);;
};


module.exports = {
    getGoal,
    createPolyanets,
    deletePolyanets,
    createSoloons,
    deleteSoloons,
    createCometh,
    deleteCometh,
    delay
};