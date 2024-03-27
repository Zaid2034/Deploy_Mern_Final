function generateShoppingItemData(faker) {
    const itemsInList=[];
    for(let i=0;i<100;i++){
        itemsInList.push({
            id:i+1,
            name:faker.commerce.productName(),
            mark:false
        })
    }
    return itemsInList;
}
module.exports={generateShoppingItemData}