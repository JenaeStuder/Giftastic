//original topics

var themes = ["Make-Up", "Girls", "Hair", "Dancing", "Nails", "Shopping", "Regina George", "Amy Schumer", "Hey Girl", "Elle Woods"];

//creates buttons for the above array.
function newButton() {
    $("#newButton").empty()
    for (let i = 0; i < themes.length; i++) {
        var btn = $("<button>");
        btn.attr("data-girl", themes[i]);
        btn.text(themes[i]);
        $("#newButton").append(btn);
    }
}
newButton()

//function that does almost everything else
function gif() {

    //click function for the button that was created above.
    //It takes the value of the word and passes it through the
    //GIPHY API and generates 10 random images that cooresponds
    //with the word
    $("button").click(function () {
        var girl = $(this).attr("data-girl");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            girl + "&api_key=o8GPWiI5gIoVgwKv6WedRsH2jCfeTn2a&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
//tells us what to do with the results of the API results
//the loop goes through each image and prints the rating
//above the image and it makes sure each image comes through
//originally in a still format.
                var results = response.data;

                for (var ii = 0; ii < results.length; ii++) {
                    var girlDiv = $("<div>");
                    rating = results[ii];
                    var p = $('<p>').text("Rating: " + results[ii].rating);
                    var girlImage = $('<img>');
                    girlImage.attr('src', results[ii].images.fixed_height_still.url);
                    girlImage.attr("data-animate", results[ii].images.fixed_height.url);
                    girlImage.attr("data-still", results[ii].images.fixed_height_still.url);
                    girlImage.attr("data-state", "animate");
                    girlImage.addClass("pic");
                    girlDiv.append(p, girlImage);
                    $('#gifs').prepend(girlDiv);
                }

                //PAUSING THE GIF AND RE-STARTING IT
                //allows the user to pause and start the GIF when
                //they click on the picture.
                $(document).on("click", ".pic", function () {
                    var state = $(this).attr("data-state")
                    if (state == "animate") {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    } else {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");

                    }

                });
            });
    });
};
gif()

//SEARCH BAR
//creates the search bar and the click event that allows it 
//to fire. It takes the input of the user and passes it through the 
//newButton(), adds the new input in a button and then the user can
//click on the new button and it will pass the event through the
//gif() function to be run like the original button on the page.
$("#submit").on("click", function (event) {
    event.preventDefault();
    var userInput = $("#userInput").val().trim();
    themes.push(userInput);
    $("#userInput").val('');
    newButton();
    gif();

});


