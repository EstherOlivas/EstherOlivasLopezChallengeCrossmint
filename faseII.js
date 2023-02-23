const apiWrap = require('./apiWraper');

async function main() {
    const goal = await apiWrap.getGoal();

    for (const row in goal) {
        for (const col in goal[row]) {
            const objectName = goal[row][col];
            switch (objectName) {
                case 'POLYANET':
                    await apiWrap.createPolyanets(row, col);
                    break;
                case 'RIGHT_COMETH':
                    await apiWrap.createCometh(row, col, 'right');
                    break;
                case 'LEFT_COMETH':
                    await apiWrap.createCometh(row, col, 'left');
                    break;
                case 'UP_COMETH':
                    await apiWrap.createCometh(row, col, 'up');
                    break;
                case 'DOWN_COMETH':
                    await apiWrap.createCometh(row, col, 'down');
                    break;
                case 'WHITE_SOLOON':
                    await apiWrap.createSoloons(row, col, 'white');
                    break;
                case 'BLUE_SOLOON':
                    await apiWrap.createSoloons(row, col, 'blue');
                    break;
                case 'RED_SOLOON':
                    await apiWrap.createSoloons(row, col, 'red');
                    break;
                case 'PURPLE_SOLOON':
                    await apiWrap.createSoloons(row, col, 'purple');
                    break;
            }
        }
    }
}

main();