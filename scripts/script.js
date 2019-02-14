$(document).ready(function() {
    
    function onResponse(json)
    {
        console.log(json);
    }
    document.getElementById("account-submit").addEventListener("click", function(event)
    {
        event.preventDefault();
        const value = document.getElementById("account-input").value;
        console.log(value);
        const url = "http://haveibeenpwned.com/api/v2/breachedaccount/" + value;
        fetch(url).then(onResponse())
    });
});