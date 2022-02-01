$(document).ready(function() {
    
    const allRequest = "https://www.amiiboapi.com/api/amiibo/";
    
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
        if (data == null)
        {
            return html;
        }

        for (let i = 0; i < data.length; i++)
        {
            var id = Math.floor(Math.random() * 1000) + 1;
            html += "<div class='amiibo-character-card' >";
                html += '<a class="amiibo-character-card-a" data-toggle="collapse" href="#amiibo-character-card-' + id + data[i].head +'" role="button" aria-expanded="false" aria-controls="collapseExample">';
                    html += "<div>";
                    html += "<img class='amiibo-character-image' src='" + data[i].image + "'/>";
                    html += "</div>";
                    html += "<div class='brief-info'>"; 
                        html += "<div class='amiibo-character-name' onclick='searchCharacters()'>" + data[i].name + "</div>";
                        // html += "<div class='amiibo-character-title'>" + data[i].character + "</div>";
                    html += "</div>"; //end brief info div
                    html += '<div class="collapse" id="amiibo-character-card-' + id + data[i].head + '">';
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
        // document.getElementById("results").innerHTML = "";
        results = "";
        
        results += buildCharacterCards(json.amiibo);
        
        // if (results === "")
        // {
        //     results = "<div class='no-results'>No amiibo found :(</div>";
        // }
        document.getElementById("results").innerHTML += results;
    }

    async function searchCharacters(query)
    {
        const characterRequest = "https://www.amiiboapi.com/api/amiibo/?character=" + query;
        fetch(characterRequest).then(function(response) {
            return response.json();
            }).then(onResponse);
    }

    async function searchGameSeries(query)
    {
        const gameSeriesRequest = "https://www.amiiboapi.com/api/amiibo/?gameseries=" + query;
        fetch(gameSeriesRequest).then(function(response) {
            return response.json();
            }).then(onResponse);
    }

    async function searchAmiiboSeries(query)
    {
        const amiiboSeriesRequest = "https://www.amiiboapi.com/api/amiibo/?amiiboSeries=" + query;
        fetch(amiiboSeriesRequest).then(function(response) {
            return response.json();
            }).then(onResponse);
    }

    function searchAll(query)
    {
        const characterRequest = "https://www.amiiboapi.com/api/amiibo/?character=" + query;
        const gameSeriesRequest = "https://www.amiiboapi.com/api/amiibo/?gameseries=" + query;
        const amiiboSeriesRequest = "https://www.amiiboapi.com/api/amiibo/?amiiboSeries=" + query;

        fetch(characterRequest).then(function(response) {
            var amiiboList = []
            console.log(response.json().amiibo);
            if (response.json().hasOwnProperty("amiibo"))
            {
                amiiboList.push(response.json().amiibo);
            }
            console.log(amiiboList);
            return amiiboList;
        }).then(function (amiiboList) {
            fetch(gameSeriesRequest).then(function(response1) {
            if (response1.json().hasOwnProperty("amiibo"))
            {
                amiiboList.push(response1.json().amiibo);
            }
            console.log(amiiboList);
            return amiiboList
        });
        });
    }

    document.getElementById("account-submit").addEventListener("click", function(event)
    {
        event.preventDefault();
        const value = document.getElementById("account-input").value;
        console.log(value);

        document.getElementById("results").innerHTML = "";
        searchCharacters(value).then(searchGameSeries(value)).then(searchAmiiboSeries(value));
        // searchGameSeries(value);
        // searchAmiiboSeries(value);

        //searchAll(value);

        // const characterRequest = "https://www.amiiboapi.com/api/amiibo/?character=" + value;
        // fetch(characterRequest).then(function(response) {
        //     return response.json();
        //     }).then(onResponse);
         
    });
});
