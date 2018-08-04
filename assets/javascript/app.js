
  
    var topics = [ "Dunks", "Crossovers", "JumpShot", "Basketball Bench", "Michael Jordan", "Bloopers" ];

  

function showGifs(){
  var showgif = $(this).attr("data-image");
    

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=hnrQknVxkV00GDBih13FYJv5MLi1i4ZJ&limit=10&tag=basketball&q="+showgif;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        
        var results = response.data;
        console.log(results);
        $("#image-view").empty();

        for (var i = 0; i < results.length; i++){
            console.log(results.length)
            var gifDiv = $("<div class='image'>");

            var showRating = $("<br><p>").text("Rating: " + results[i].rating.toUpperCase());
            

            var imageDiv = $("<img>");
                
            imageDiv.addClass("gif-image");
            
            imageDiv.attr("src", results[i].images.fixed_height_still.url);
            
            
           
            imageDiv.attr("data-still", results[i].images.fixed_height_still.url);
            
            imageDiv.attr("data-animate", results[i].images.fixed_height.url);
            
            imageDiv.attr("data-state", "still");
            
            gifDiv.append(showRating);
            
            gifDiv.append(imageDiv);

            $("#image-view").append(gifDiv);
        };

        $(".gif-image").on("click", function(){
        
        var state = $(this).attr("data-state");
        

            if (state === "still"){
                $(this).attr("src", $(this).attr("data-animate"));
                console.log($(this).attr("src"));
                
                $(this).attr("data-state", "animate");
                // console.log(this);
                // console.log("hi world")
                 
                
            }else{
                $(this).attr("src", $(this).attr("data-still"));
                console.log($(this).attr("src"));

                $(this).attr("data-state", "still");
                // console.log(this);
                // console.log("Yes it works")
                }
        });
    });
};









function gifButtons() {
        
        $("#button-view").empty();

        for (var i = 0; i < topics.length; i++){
            var btn = $("<button>");

            btn.addClass("gif");
            btn.attr("data-image", topics[i]);

            btn.text(topics[i]);
            

            $("#button-view").append(btn);
        }};

    

    $("#add-gif").on("click", function(event){
        event.preventDefault();

        var newImage = $("#gif-input").val().trim();
        $("#gif-input").val(" ");
        topics.push(newImage);

        gifButtons();
    })

    

    
    $(document).on("click", ".gif", showGifs);

    gifButtons();
    
    
   