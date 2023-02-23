const apiWrap = require('./apiWraper');

async function main() {
    const goal = await apiWrap.getGoal();

    for (const row in goal) {
        for (const col in goal[row]) {
            const objectName = goal[row][col];
            if (objectName === 'POLYANET') {
                await apiWrap.createPolyanets(row, col);
            }
        }
    }
}

main();