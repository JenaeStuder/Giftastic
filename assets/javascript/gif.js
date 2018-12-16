// pick a gif theme
// get a gify API key
// prepend 10 new gifs to the previous ones 

var themes = ["Make-Up", "Girls", "Hair", "Dancing", "Nails", "Shopping", "Regina George", "Amy Schumer", "Hey Girl", "Elle Woods"];


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


function gif(){
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
$("#submit").on("click", function (event) {
    event.preventDefault();
    var userInput = $("#userInput").val().trim();
    themes.push(userInput);
    $("#userInput").val('');
    newButton();
    gif();

});




// $(document).on("click", "#userInput", function(){
//     var userInput = $(this).attr("data-name");
// });

