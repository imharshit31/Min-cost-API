const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

function calc(x) {
    return Math.floor((x + 4) / 5) * 8 + 2;

    // Calculates the cost of shifting x kgs to 1 unit
}   

function calculateMinimumCost(order) {

    const weightTable = {
        "A": 3, "B": 2, "C": 8, "D": 12, "E": 25, "F": 15, "G": 0.5, "H": 1, "I": 2
    };

    var c1 = 0 ,c2 = 0, c3=0;

    for (const product in order) {
        if(product == 'A' || product == 'B' || product == 'C') c1 += order[product] * weightTable[product];
        else if(product == 'D' || product == 'E' || product == 'F') c2 += order[product] * weightTable[product];
        else c3 += order[product] * weightTable[product];
    }

    var flag = false, cost = 0;

    if(c1 > 0){
        cost += 3 * calc(c1);
        flag = true;
    }
    if(c2 > 0){
        if(flag){
            cost += 25
            flag = false;
        }
        cost += 2.5 * calc(c2);
        flag = true;
    }
    if(c3 > 0){
        if(flag){
            cost += 20;
            flag = false;
        }
        cost += 2 * calc(c3);
        flag = true;
    }

    return cost;
}

app.post('/calculateMinimumCost', (req, res) => {
    const order = req.body;
    const minimumCost = calculateMinimumCost(order);
    res.send({ minimumCost });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
