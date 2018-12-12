// pick a gif theme
// get a gify API key
// prepend 10 new gifs to the previous ones 

var themes = ["hair", "make-up", "girl", "dancing"];


function newButton() {
    $("#newButton").empty()
    for (let i = 0; i < themes.length; i++) {
        var btn = $("<button>");
        btn.attr("girl_select", themes[i]);
        btn.text(themes[i]);
        $("#newButton").append(btn);
    }
}
console.log("themes")
newButton()



// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=o8GPWiI5gIoVgwKv6WedRsH2jCfeTn2a&limit=5");
// xhr.done(function(data) { console.log("success got data", data); });
$("button").on("click", function () {
    var girl = $(this).attr("data-girl");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        girl + "&api_key=o8GPWiI5gIoVgwKv6WedRsH2jCfeTn2a&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


        for (var ii = 0; ii < results.length; ii++) {
            var results = response.data[ii].images.fixed_height.url
            var girlDiv = $("<div>");
            var p = $('<p>').text("Rating:" + results[ii].rating);
            var girlImage = $('<img>');
            girlImage.attr('src', results);
            girlImage.attr("active", results);
            girlImage.attr("still", results);
            girlImage.attr("state", "active");
            girlDiv.append(p, girlImage);
            $('#gifs').prepend(girlDiv);
        }
    });
})
$("#gif").click(function () {
    var state = $(this).attr("state")

    if (state == "active") {
        $(this).attr('src', $(this).attr('still'));
        $(this).attr('state', 'still');

    } else if (state == "still") {
        $(this).attr('src', $(this).attr('active'));
        $(this).attr('state', 'active');
    }
});

$("#search").click(function () {
    event.preventDefault();
    var userinput = $("#userinput").val().trim();
    themes.push(userinput)
});

