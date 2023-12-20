const MOCKAPI_TEAMS = "https://658125763dfdd1b11c427f36.mockapi.io/teams"

$("sub").click(() => {
$.post(MOCKAPI_SRV,
    {
        name: $("teamName").value,
        conference: $("conference").value,
        coach: $("coach").value  
    })
})



