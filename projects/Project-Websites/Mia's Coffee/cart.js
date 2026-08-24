/**
 * Author: Eder Martinez
 * Last Edited: 12/24/2024
 * @fileoverview This script will be used to process the requests made by the website. Allowing it to add to cart, delete, reset and checkout
 * it will work by using different functions which are called upon by the html file.
 * Credit to where credit is due, I made this while using JAVASCRIPT AND JQUERRY  by jon Duckett. specifically understanding json, and ajax and the details of javascript.
 */
var $globalList = JSON.parse(sessionStorage.getItem('$globalList'))|| []; //initiates the list from saved storage using Object Notation with the name $globalList

/**
 * Added to cart function ()
 */
function addedtocart()
{
    alert("Item added to cart");
}

//added spanish. It adds the spanish bag to the cart
/**
 * add spanish coffe to the session storage
 */
function addedSpanish() 
{
    $globalList.push("spanish");
    //alert($globalList); //will add the spanish word to the list
    sessionStorage.setItem('$globalList',JSON.stringify($globalList)); // adds the item to the stored json list
    //console.log(sessionStorage); for testing
}


/**
 *added colombian. It adds the colombian bag to the cart 
 */
function addedColombian()
{
    $globalList.push("colombian");
    //alert($globalList); //will add the spanish word to the list
    sessionStorage.setItem('$globalList',JSON.stringify($globalList));
    console.log(sessionStorage);
}

/**
 *added brazilian. It adds the brazilian bag to the cart 
 */
function addedBrazilian()
{
    $globalList.push("brazilian");
    //alert($globalList); //will add the spanish word to the list
    sessionStorage.setItem('$globalList',JSON.stringify($globalList)); //javascript to json!!!!
    console.log(sessionStorage);

}
////////////////////////(mia's cart html)/////////////////////////////
/**
 * first it takes the array and puts it into a hashmap using a loop. We use counters to keep track of how many times we have each item.
 * then wehave a flag that will let us know if there is anything in the cart.
 * it will push the appropiate code and display the number of bags.
 */
function seeCart() 
{
    let hashToSee = new Map(); // hashmap to save info
    //list of names and starting qtt of items (naturaly starting at zero)
    var numSp = 0;
    var numCo = 0;
    var numBr = 0;

    //first we loop through the list 
    for(var i = 0; i < $globalList.length; i++)
    {
        if($globalList[i] === "spanish") // checks if the types of coffee are in
        {
            numSp += 1;
            hashToSee.set('spanish',numSp);
        }
        else if($globalList[i] === "colombian")
        {
            numCo += 1;
            hashToSee.set('colombian',numCo);
        }
        else if($globalList[i] === "brazilian")
        {
            numBr += 1;
            hashToSee.set('brazilian',numBr);
        }
        else// the list is empty
        {
            console.log("Empty cart");
            break;
        }
    }

    //console.log(hashToSee); for debugging

    let totalFlag = false;

    //this part will ensure the right parts load of the cart
    //gets the parts of the documents(div) that will hold the object
    let partA = document.getElementById('cartObject');

    /* the commented out parts are used for testing or code that did not quite work out but it might be useful later on*/

    if(hashToSee.has('spanish'))
    {
        let numSp = hashToSee.get('spanish');//gets number of spanish bags ordered
        partA.innerHTML += `<div class="cartDescript"><img src = "../Mia's Coffee/images/spanishbag.jpg"><h3>Spanish Coffee bags: ${numSp} </h3><p>Mia’s Spanish Coffee Dark Roast is a bold, intensely flavored coffee with a dominant charred taste, thin body, and a shiny, nearly black appearance, priced at 10 Euros.</p><p>Total Cost of Spanish: $${numSp * 10}</p></div>`; // we use ${} as a scape character allowing inseriton of variables
        //we also use back ticks to be able to use our escape
        //partA.innerHTML += `<img src = "../Mia's Coffee/images/spanishbag.jpg">`;
        //partA.innerHTML += `<p> hello this is a description</p></div>`;
        totalFlag = true;

    }
    if(hashToSee.has('colombian'))
    {
        let numSp = hashToSee.get('colombian');
        partA.innerHTML += `<div class="cartDescript"><img src = "../Mia's Coffee/images/colombianbag.jpg"><h3>Colombian Coffee bags: ${numSp} </h3><p>Mia’s Colombian Coffee Medium Roast is a balanced, flavorful coffee with cocoa, nut, and blackberry notes, crafted from 100% Arabica beans grown in the Andes, priced at 10 Euros.</p><p>Total Cost of Colombian: $${numSp * 10}</p></div>`; // we use ${} as a scape character allowing inseriton of variables
        //partA.innerHTML += `<h5>Colombian Coffee bags: ${numSp} </h5>`; // we use ${} as a scape character allowing inseriton of variables
        //let newImg = document.createElement('img');//we create a new tag of img for the html. Redundant at the moment
        //newImg.src = 'images/coffee.jpg'; **redundant at the moment
        //partA.innerHTML += `<img src = "../Mia's Coffee/images/colombianbag.jpg">`;
        //we also use back ticks to be able to use our escape
        totalFlag = true;

    }

    if(hashToSee.has('brazilian'))
        {
            let numSp = hashToSee.get('brazilian');
            partA.innerHTML += `<div class="cartDescript"><img src = "../Mia's Coffee/images/brazilianbag.jpg"><h3>Brazilian Coffee bags: ${numSp} </h3><p> Mia's Brazilian Dark Roast, crafted from premium Minas Gerais beans roasted for over 24 hours, offers a rich, full-bodied coffee with chocolate, caramel, and nutty notes, priced at 10 Euros.</p><p>Total Cost of Brazilian: $${numSp * 10}</p></div>`; // we use ${} as a scape character allowing inseriton of variables
            //partA.innerHTML += `<h5>Brazilian Coffee bags: ${numSp} </h5>`; // we use ${} as a scape character allowing inseriton of variables
            //we also use back ticks to be able to use our escape
            //partA.innerHTML += `<img src = "../Mia's Coffee/images/brazilianbag.jpg">`;
            totalFlag = true;
        }

    if(totalFlag ===true)
        {
            //we are going to get all the individual totals
            let totalSpa = 0;
            if(hashToSee.get('spanish'))
            {
            totalSpa = hashToSee.get('spanish') * 10; //price for spanish
            }
            //console.log(totalSpa);//for testing purpuses
            let totalCol=0;
            if(hashToSee.get('colombian'))
            {
            totalCol = hashToSee.get('colombian') * 10; //price for colombian
            }
            let totalBra=0;
            if(hashToSee.get('brazilian'))
            {
            totalBra = hashToSee.get('brazilian') * 10; //price for brazilian
            }
            let total =0;
            total  = totalSpa + totalCol + totalBra;
            console.log(totalSpa);
            partA.innerHTML += `<div class="cartDescript"><h4>Total: $${total}</h4></div>`
        }

    //if it is empty the following will run to give an empty cart message
    if(hashToSee.size === 0)
    {
        partA.innerHTML += '<div class = "cartDescript"><p> empty cart, go to shop to add items :((</p></div>';
    }

    if(totalFlag == true)// if there is items in the cart 
    {
        partA.innerHTML += `<div id = "checkoutID"> <button onclick="checkOut()" id = "clearCart">Check Out</button></div>`;
    }


}
/**
 * clears cart of all items (mias cart.html)
 */
function clearCart() 
{
    sessionStorage.removeItem('$globalList');
    alert('Cart is now empty');
    //console.log(sessionStorage);
    location.reload();
}

//We must be careful to only clear cart if it passes all the checks
function checkIfClear()
{

}

// this function is used to switch pages to a checkout page (mias cart .html)
/**
 * takes the user to the secret checkout page hehehe
 */
function checkOut() 
{
    window.location.href = "miascheckout.html"; // to switch to the checkout page using the button
}

//////////////mia's checkout//////////
//since we already have the items in a global list all we must do is read them, load the appropiate text and then display the total
/**
 * first it takes the array and puts it into a hashmap using a loop. We use counters to keep track of how many times we have each item.
 * then wehave a flag that will let us know if there is anything in the cart.
 * it will push the appropiate code and display the number of bags in the checkout page
 */
function checkoutFinalTotal()
{
   let hashFinal = new Map()
   //total of items
   var numSp = 0;
   var numCo = 0;
   var numBr = 0;

   //cycle through to add each item to a list
   for(var i = 0; i < $globalList.length; i++)
    {
        if($globalList[i] === "spanish") // checks if the types of coffee are in
        {
            numSp += 1;
            hashFinal.set('spanish',numSp);
        }
        else if($globalList[i] === "colombian")
        {
            numCo += 1;
            hashFinal.set('colombian',numCo);
        }
        else if($globalList[i] === "brazilian")
        {
            numBr += 1;
            hashFinal.set('brazilian',numBr);
        }
        else
        {
            alert("An error has occurred");
            break;
        }
    }
    
    let finalCheckout = document.getElementById("checkoutList");// we will use it to manipulate that area of the html

    if(hashFinal.has('spanish'))
    {
        finalCheckout.innerHTML += `<div class = "checkoutItems"><p> Spanish Coffee ${numSp}</p></div>`;
    }
    if(hashFinal.has('colombian'))
    {
        finalCheckout.innerHTML += `<div class = "checkoutItems"><p> Colombian Coffee ${numCo}</p></div>`;
    }
    if(hashFinal.has('brazilian'))
    {
        finalCheckout.innerHTML += `<div class = "checkoutItems"><p> Brazilian Coffee ${numBr}</p></div>`;
    }

    //again we must find the total 
    let totalSpa = 0;
    if(hashFinal.get('spanish'))
    {
    totalSpa = hashFinal.get('spanish') * 10; //price for spanish
    }
    //console.log(totalSpa);//for testing purpuses
    let totalCol=0;
    if(hashFinal.get('colombian'))
    {
    totalCol = hashFinal.get('colombian') * 10; //price for colombian
    }
    let totalBra=0;
    if(hashFinal.get('brazilian'))
    {
    totalBra = hashFinal.get('brazilian') * 10; //price for brazilian
    }
    let total =0;
    total  = totalSpa + totalCol + totalBra;
    console.log(total);
    finalCheckout.innerHTML += `<div class="checkoutItems"><h4>Total: $${total}</h4></div>`


}

/**
 * if the user needs to change something this will move to miascart.html again.
 */
function returnToCart()
{
    window.location.href = "miascart.html";
}

/**
 * writes final order to txt file without an enter so we can write our php
 * //WE MUST CATCH IT ON THE OTHER SIDE USING PHP CODE!!!!!!!!!!!!!
 *  * obsolete method can delete!!

 */
function writeToTxt()
{
    var xhr = new XMLHttpRequest();//creates an object and stores it as a variable
    xhr.open('POST', "submit.php",true);
    xhr.send(JSON.stringify($globalList)); // php is able to deal with the json array

    xhr.onload = alert("has been sent successfully");
   // alert($globalList);
}
/**
 * lets try this we push the list to a hidden field and a separate php file gets it!!!
 */
function writeTextGood()
{
    part = document.getElementById("dataToPass");
    let stringToPass = JSON.stringify($globalList);
    //alert(stringToPass);
    part.value = stringToPass;
}
