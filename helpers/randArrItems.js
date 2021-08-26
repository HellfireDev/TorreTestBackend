
//Picks n random items from a given array (O(n^2))
const randArrItems = (array, n) => {

    let itemsCollection = [];

    for (let i = 0; i < n; i++) {
        let index = Math.floor((array.length - 1) * (Math.random()));
        itemsCollection = [...itemsCollection, array[index]]
    }

    return itemsCollection;

}

module.exports = { randArrItems };