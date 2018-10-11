
  //This is my starting arrary for the my Category of Basketball
var topics = [ "Dunks", "Crossovers", "JumpShot", "Basketball Bench", "Michael Jordan", "Bloopers" ];

  
 //This function will be used to append all attributes to all images, add the images to the proper div on Html
 
function showGifs(){
  var showgif = $(this).attr("data-image");
    
//This is the Url fro Giphy with an api key so we can access the giphy api database with parameters and also adding to the array to search given button pressed
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=hnrQknVxkV00GDBih13FYJv5MLi1i4ZJ&limit=10&tag=basketball&q="+showgif;
  //this is the call to get a response from giphy api database and all data recieved from giphy will be placed in var response.  
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
      //this variable will hold the the data we will use to get the right image attributes we will use later  
        var results = response.data;
      //this will clear the div for so that when a button is pushed new images will popluate this area 
        $("#image-view").empty();
    //This for loop will iterate through the results of the call and the topics and populate the number of images we wanted and limite we set in the URL
        for (var i = 0; i < results.length; i++){
            //this variable will make a new div and a new class for the images
            var gifDiv = $("<div class='image'>");
            //this variable will hold the rating data we are receiving from giphy and will show it for every picture on the page
            //using the for loop it will iterate through all the pictures and show the rating above them, also setting the test to upper case
            var showRating = $("<br><p>").text("Rating: " + results[i].rating.toUpperCase());
            
            //This div is not making a new tag for img, also starting the process for adding attributes to the img themselves 
            var imageDiv = $("<img>");
             //The following will add a new class to be referenced later, and addting the image
             //we want to use both a still and an animated image.   
            imageDiv.addClass("gif-image");
            
            imageDiv.attr("src", results[i].images.fixed_height_still.url);
           
            imageDiv.attr("data-still", results[i].images.fixed_height_still.url);
            
            imageDiv.attr("data-animate", results[i].images.fixed_height.url);
            
            imageDiv.attr("data-state", "still");
            //this will append the rating to new div we created earlier
            gifDiv.append(showRating);
            //this will append all the attributes and imagaes along with all ratings to from the image
            gifDiv.append(imageDiv);
            //this will now place all attributes and ratings to the area on the html
            $("#image-view").append(gifDiv);
        };
            //This on click function will given functionality to animate when click the image and making it still again when clicked again
        $(".gif-image").on("click", function(){
            //this variable is now holding the data for a still image and we are using the class from earlier to add this functionality to all pictures
        var state = $(this).attr("data-state");
        
            //this if statement makes it so that when clicked the image will animate
            if (state === "still"){
                $(this).attr("src", $(this).attr("data-animate"));
            
                $(this).attr("data-state", "animate");
                
             //this will if clicked again the image will reset to still image   
            }else{
                $(this).attr("src", $(this).attr("data-still"));
                

                $(this).attr("data-state", "still");
                
                }
        });
    });
};


    //this function is now responsible making the button at the top of page
function gifButtons() {
        //this will empty out the button div when page is refresh 
        $("#button-view").empty();
        //this for loop iterates throught the topice array to grab all topis
        //giving all buttons a button functionality, and new class, and data related to data of the image they are assigned
        for (var i = 0; i < topics.length; i++){
            var btn = $("<button>");

            btn.addClass("gif");
            btn.attr("data-image", topics[i]);

            btn.text(topics[i]);
            
        //all buttons will not be added to this area on the html
            $("#button-view").append(btn);
        }};

    
        //This function is resonsible for adding a functionality to the submit button
        //If you wanted to add a new button to search for more images you can
    $("#add-gif").on("click", function(event){
        event.preventDefault();
        //This will grab the the text from the input field added the value from the text and then push that value
        //on to the new button area.
        var newImage = $("#gif-input").val().trim();
        $("#gif-input").val(" ");
        console.log(newImage)
        topics.push(newImage);
        //Calling this function in this event will give I think the functionanlity of alll the other buttons
        gifButtons();
    })

    

    //this is an event handler so the document will be listening for a click on submit or a button
    $(document).on("click", ".gif", showGifs);

    gifButtons();
    
    
   