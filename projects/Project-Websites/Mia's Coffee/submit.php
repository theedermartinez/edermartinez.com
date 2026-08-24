<?php
/**
 * Author: Eder Martinez
 * Last update: 12/24/24
 * Summary: This is the backend of the website. Adds the objects to invisble informaiton then uses javascript to 
 * php is a losely typed language meaning variables do not have to be declared before using them
 */

//target file to write the objects to
$infoFile = 'toProcess.txt';

//to sanitize: to remove all invalid data or characters.
function cleanData($data)
{
    return htmlspecialchars(trim($data));//clears whatever data is given to the function and returns it
}
/**
 * following single entrace and exit we only return at the end. We assign the information to different variables using the post method
 * then 
 */
function assignData()
{
    $errorFlag = false;
    if($_SERVER["REQUEST_METHOD"]=="POST") //we use the post method to send from a webform to a server. 
    {
        $dataToPass = cleanData($_POST['dataToPass']);
        $name = cleanData($_POST['nameCustomer']); // we use the super variable to call on name customer which was obtained by post
        $last = cleanData($_POST['lastCustomer']); // we use the super variable to call on last customer which was obtained by post
        $email = cleanData($_POST['email']); // we use the super variable to call on email of the  customer which was obtained by post
        //$errorFlag = validateEmail($email);
        $cardNum = cleanData($_POST['cardNum']); // we use the super variable to call on card number customer which was obtained by post
        $expDate = cleanData($_POST['expDate']); // we use the super variable to call on expiration date of the customer which was obtained by post
        $CVV = cleanData($_POST['CVV']); // we use the super variable to call on CVV of the customer which was obtained by post
    }
    
        if(empty($name))
        {
            alertMaker("Name is empty");
            $errorFlag = true;
        }
        if(empty($last))
        {
            alertMaker("Last Name is empty");
            $errorFlag = true;

        }

        if(empty($email))
        {
            alertMaker ("email is empty");
            $errorFlag = true;
        }
        
        if(validateEmail($email))
        {
            //echo "Email is valid! ";
            
        }
        else
        {
            alertMaker( "Invalid Email");
            $errorFlag = true;
        }
        
        if(empty($cardNum))
        {
            alertMaker( "card num is empty");
            $errorFlag = true;
        }
        if(empty($expDate))
        {
            alertMaker( "expiration date is empty");
            $errorFlag = true;

        }
        if(empty($CVV))
        {
            alertMaker("CVV is empty");
            $errorFlag = true;

        }
    
    //echo $errorFlag; //for error testing
    ///now if we have an error we stop the program
    if($errorFlag ==true)
    {
        reloadPage("miascheckout.html");
        alertMaker("An error has occurred. Your information is valid.");
        return $errorFlag;
    }
    else // if we find no errors in our program we write to the txt file 
    {
        $whiteSpc = "\n";//we use this to put a new line at the end of each client
        $cardInfo = [$dataToPass, $name,$last,$email,$cardNum,$expDate,$CVV, $whiteSpc]; // we put the info on an array
        addToTxt($cardInfo); //we write to file using an array
        addTotalCoffeePurchased();
        return $errorFlag; //we return the flag saying we guud
    }


}

/**
 * filter var is builtin fuction in php for validating data it return false if filter fails
 */
function validateEmail($localEmail)
{
    $isItvalid = filter_var($localEmail,FILTER_VALIDATE_EMAIL);//validate filter email is  php bulilt in constant 
    echo  '<script type="text/javascript">alert(" "message"+'.$isItvalid.'")</script>';
    return $isItvalid;
}

/**
 * add to text to a txt file we use implode to add everything to a string then add the string to a file
 */
function addToTxt($arrayTOuse)
{
      //echo "in writting"; //for testing
      global $infoFile; // access the global variable 
      $file = fopen($infoFile,'a');//we open or create the file, else we delete and create a new one. We use a instead of w
      $info = implode(",",$arrayTOuse); //delimeter and array. Creates a string;
      fwrite($file,$info);
      fclose($file);
}

/**
 * Makes allers using the given message 
 */
function alertMaker($msg)
{
    echo  '<script type="text/javascript">alert("'.$msg.'")</script>';//we use a literal string with a string concactination (using periods)
}

/**
 * Reload the page
 */
function reloadPage($page)
{
    echo '<script type = "text/javascript">window.location.href = "'.$page.'"</script>';
}


function addTotalCoffeePurchased()
{   
    //echo "in total coffee";
    $rawData = file_get_contents('php://input');
    $decodedJsonData = json_decode($rawData,true);
    global $infoFile;
    $file = fopen($infoFile,'a');
    $toWrite = json_encode($decodedJsonData);
    fwrite($file,$toWrite);
    fwrite($file,"||");
    fclose($file);
}

function main()
{
    $errorFlag = assignData();

    if($errorFlag == true)
    {
        echo "errors found \n Try Reloading the page!!! Use the backbutton ";
        header('Location: miascheckout.html');
    }
    else
    {
        echo "Form is valid. Changes have been saved, Redirecting back home!!!";
        header('Location: miassuccess.html');

    }
//LETS CALL OUT MESSAGE AND ADD IT TO A TXT FILE

}

main();