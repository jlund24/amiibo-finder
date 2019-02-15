$(document).ready(function() {
    
    function buildCharacterCards(data)
    {
        html = "";
        for (let i = 0; i < data.length; i++)
        {
            html += "<div class='amiibo-character-card' id='amiibo-character-card-" + i + "'>";
            html += "<img class='amiibo-character-image' src='" + data[i].image + "'/>" 
            html += "<div class='amiibo-character-name'>" + data[i].name + "</div>";
            html += "<div class='amiibo-character-title'>" + data[i].character + "</div>";
            html += "<div class='amiibo-character-amiibo-series'>" + data[i].amiiboSeries + "</div>";
            html += "<div class='amiibo-character-game-series'>" + data[i].gameSeries + "</div>";
            html += "<div class='amiibo-character-release-dates'>";
                html += "<div class='release-date-us'>";
                    html += "<img src='../images/us-flag.png'/>"
                html += "</div>"; //end release-date-us
            html += "</div>"; //end amiibo-character-release dates
            html += "</div>"; //end amiibo-card
        }
        return html;
        
    }
    
    function onResponse(json)
    {
        console.log(json);
        results = "";
        
        results += buildCharacterCards(json.amiibo);
        
        document.getElementById("results").innerHTML = results;

    }
    document.getElementById("account-submit").addEventListener("click", function(event)
    {
        event.preventDefault();
        const value = document.getElementById("account-input").value;
        console.log(value);
        const url = "http://www.amiiboapi.com/api/amiibo/?character=" + value;
        fetch(url).then(function(response) {
            return response.json();
            }).then(onResponse);
    });
});