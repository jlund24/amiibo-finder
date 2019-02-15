$(document).ready(function() {
    
    const allRequest = "http://www.amiiboapi.com/api/amiibo/";
    console.log("loaded");
    fetch(allRequest).then(function(response) {
        return response.json();
        }).then(onResponse);
    
    function modifyDateString(dateString)
    {
        if (dateString == null)
        {
            return "unknown";
        }
        var year = dateString.substr(0,4);
        dateString = dateString.slice(5);
        dateString += "-" + year;
        return dateString;
        
    }
    function buildCharacterCards(data)
    {
        html = "";
        for (let i = 0; i < data.length; i++)
        {
            
            html += "<div class='amiibo-character-card' >";
                html += '<a class="amiibo-character-card-a" data-toggle="collapse" href="#amiibo-character-card-' + i +'" role="button" aria-expanded="false" aria-controls="collapseExample">';
                    html += "<div>";
                    html += "<img class='amiibo-character-image' src='" + data[i].image + "'/>";
                    html += "</div>";
                    html += "<div class='brief-info'>"; 
                        html += "<div class='amiibo-character-name'>" + data[i].name + "</div>";
                        // html += "<div class='amiibo-character-title'>" + data[i].character + "</div>";
                    html += "</div>"; //end brief info div
                    html += '<div class="collapse" id="amiibo-character-card-' + i + '">';
                    html += '<div class="card card-body additional-info">';
                        // html += "<div class='additional-info-title'>Additional Info</div>";
                        html += "<div class='amiibo-character-amiibo-series'><span class='amiibo-series-title'>Amiibo Series:</span>" + data[i].amiiboSeries + "</div>";
                        html += "<div class='amiibo-character-game-series'><span class='amiibo-series-title'>Game Series:</span>" + data[i].gameSeries + "</div>";
                        html += "<div class='amiibo-character-release-dates'>";
                            html += "<div class='release-dates-title'>Release Dates</div>";
                            html += "<div class='row'>";
                                html += "<div class='release-date-container'>";
                                    html += "<div class='release-date-title'>NA:</div>";
                                    html += "<div class='release-date-date'>" + modifyDateString(data[i].release.na) + "</div>";
                                html += "</div>"; //end release-date-na
                                html += "<div class='release-date-container'>";
                                    html += "<div class='release-date-title'>EU:</div>";
                                    html += "<div class='release-date-date'>" + modifyDateString(data[i].release.eu) + "</div>";
                                html += "</div>"; //end release-date-eu
                            html += "</div>"; //end row
                            html += "<div class='row'>";
                                html += "<div class='release-date-container'>";
                                    html += "<div class='release-date-title'>AU:</div>";
                                    html += "<div class='release-date-date'>" + modifyDateString(data[i].release.au) + "</div>";
                                html += "</div>"; //end release-date-au
                                html += "<div class='release-date-container'>";
                                    html += "<div class='release-date-title'>JP:</div>";
                                    html += "<div class='release-date-date'>" + modifyDateString(data[i].release.jp) + "</div>";
                                html += "</div>"; //end release-date-jp
                            html += "</div>"; //end row
                        html += "</div>"; //end amiibo-character-release dates
                    html += "</div>"; //end card card-body
                    html += "</div>"; //end collapse
                html += "</a>"; //end collapse target
            
            
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
        const characterRequest = "http://www.amiiboapi.com/api/amiibo/?character=" + value;
        fetch(characterRequest).then(function(response) {
            return response.json();
            }).then(onResponse);
    });
});