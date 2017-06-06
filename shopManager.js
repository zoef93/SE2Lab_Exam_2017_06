//list of items stored in warehouse of e-commerce
var warehouse = [
    {
		ID: 1,
        price: 11,
        quantity: 20,
		boxSize: "S",
		place: [2,3]
	},
    {
		ID: 2,
        price: 1100,
        quantity: 1,
		boxSize: "m",
		place: [10,0]
	},
    {
		ID: 3,
        price: 13,
        quantity: 50,
		boxSize: "S",
		place: [4,7]
	},
    {
		ID: 4,
        price: 320,
        quantity: 4,
		boxSize: "L",
		place: [10,3]
	},
    {
		ID: 5,
        price: 25,
        quantity: 73,
		boxSize: "L",
		place: [7,1]
	},
];


/** 
 * @brief getter of warehouse
 * @return the warehouse
 */
var getWarehouse = function getWarehouse(){
    return warehouse;
}


/** 
 * @brief it searches one elements in warehouse
 * @param itemID
 * @return the element searched, null otherwise
 */
var searchItem = function searchItems(itemID)
{
    //search for the elements
    var position = searchPos(itemID);
    
    if (position == null)
        return position
    else
        return warehouse[position];
}

/** 
 * @brief it searches one elements in warehouse
 * @param itemID
 * @return the position of the element searched, null otherwise
 */
var searchPos = function searchPos(itemID)
{
    //search for the elements
    for (i=0; i < warehouse.length; i++)
	{
		if (warehouse[i].ID == itemID)
		{
			return i;
		}
    }
    
    //if this point is reached the element is not found
    return null;
}



/**
 * @brief This function decrease the quantity of an element, given its ID
 * @param itemID
 * @return the item if it is sold, null if the item does not exist or the quantity is 0
 */
var sellItem = function sellItem(itemID)
{
    //search for the element
    var position = searchPos(itemID);
    
    if (position!=null && warehouse[position].quantity!=0)
        {
            warehouse[position].quantity=warehouse[position].quantity-1;
            return warehouse[position];
        }
    else
        return null;
}

/**
 * @brief This function increase the quantity of an element, given its ID. The maximum capacity is 100. 
 * @param itemID
 * @return the item if it is restocket, null if the item does not exist or the new capacity is highier than 100
 */
var restockItem = function restockItem(item)
{
    //search for the element
    var position = searchPos(item.ID);
    
    if (position!=null && (warehouse[position].quantity+item.quantity)<=100)
        {
            warehouse[position].quantity=warehouse[position].quantity+item.quantity;
            return warehouse[position];
        }
    else
        return null;
}


//export functions
exports.getWarehouse = getWarehouse; 
exports.searchItem = searchItem; 
exports.sellItem = sellItem; 
exports.restockItem = restockItem; 