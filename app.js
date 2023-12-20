const MOCKAPI_TEAMS = "https://658125763dfdd1b11c427f36.mockapi.io/teams"

$("sub").on('click', () => {
$.post(MOCKAPI_TEAMS,
    {
        name: $("#teamName").val(),
        conference: $("#conference").val(),
        coach: $("#coach").val()  
    }, 
    populateTable)
})

function populateTable() {
    $('#')
}

