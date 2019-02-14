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
        const url = "https://haveibeenpwned.com/api/v2/breachedaccount/" + value;
        fetch(url, {mode: "cors", headers : {"User-Agent": "Pwnage-Checker-For-iOS"}}).then(onResponse())
    });
});