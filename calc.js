//INPUT: current tax bracket, expectedfuture tax, expected return, ages, annual contribution, limit,

//After-tax total
function compare(currentTax, expectedTax, expReturn, startYear, endYear, isAnnual, contribution, inflation) {
    currentTax = currentTax / 100
    expectedTax = expectedTax / 100
    expReturn = expReturn / 100
    inflation = inflation / 100
    var years = endYear - startYear;
    if (years < 1) {
        throw "Please enter a valid timeframe";
    }
    var futureTotalRoth = 0;
    var futureTotalTrad = 0;
    var totalCost;
    if (isAnnual) {
        totalCost = years * contribution
        for (i = 0; i < years; i += 1) {
            var postTax = contribution - contribution * currentTax;
            futureTotalRoth += postTax * Math.pow(1 + expReturn, years - i);

            futureTotalTrad += contribution * Math.pow(1 + expReturn, years - i);
        }
        futureTotalTrad -= futureTotalTrad * expectedTax
    } else { //One time contribution
        totalCost = contribution
        var postTax = contribution - contribution * currentTax;
        futureTotalRoth = postTax * Math.pow(1 + expReturn, years);

        futureTotalTrad = contribution * Math.pow(1 + expReturn, years);
        futureTotalTrad -= futureTotalTrad * expectedTax;
    }

    var roiTrad = futureTotalTrad / totalCost * 100
    var roiRoth = futureTotalRoth / totalCost * 100

    //Adjust for PPP (future inflation) assuming 2.3 inflation
    var adjustedRoth = futureTotalRoth / Math.pow(1 + inflation, years)
    var adjustedTrad = futureTotalTrad / Math.pow(1 + inflation, years)
    var adjROIRoth = adjustedRoth / totalCost * 100
    var adjROITrad = adjustedTrad / totalCost * 100


    var output = {futureTrad : futureTotalTrad,
        futureRoth : futureTotalRoth,
        roiTrad : roiTrad
    };
    var jsonData = JSON.stringify(output);
    document.body.innerHTML = jsonData;
}
