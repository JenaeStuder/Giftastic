// pick a gif theme
// get a gify API key
// prepend 10 new gifs to the previous ones 

var themes = ["make-up", "girl", "hair", "dancing", "nails", "shopping", "Regina George","Amy Schumer"];


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
//SEARCH BAR
$("#search").click(function () {
    event.preventDefault();
    var userInput = $("#serch").val();
    themes.push(userInput)

newButton()
    console.log(userInput);
});


// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=o8GPWiI5gIoVgwKv6WedRsH2jCfeTn2a&limit=5");
// xhr.done(function(data) { console.log("success got data", data); });
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

            var results = response.data;

            for (var ii = 0; ii < results.length; ii++) {
                var girlDiv = $("<div>");
                var rating = results[ii];
                var p = $('<p>').text("Rating: " + results[ii].rating);
                var girlImage = $('<img>');
                girlImage.attr('src', results[ii].images.fixed_height.url);
                girlImage.attr("data-animate", results[ii].images.fixed_height.url);
                girlImage.attr("data-still", results[ii].images.fixed_height_still.url);
                girlImage.attr("data-state", "animate");
                girlImage.addClass("pic");
                girlDiv.append(p, girlImage);
                $('#gifs').prepend(girlDiv);
            }
            
            //PAUSING THE GIF AND RESTRTING IT
            $(document).on("click", ".pic", function () {
                var state = $(this).attr("data-state")
                console.log(state);
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");

                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
                
            });
        });


});

// $(document).on("click", "#userInput", function(){
//     var userInput = $(this).attr("data-name");
// });

