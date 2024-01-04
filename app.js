//Declaring variable for API
const MOCKAPI_URL = "https://658125763dfdd1b11c427f36.mockapi.io"

//Setting up the the function that interacts with the DOM
$(document).ready(function() {

    //AJAX function in order to get the teams from the database
   const getTeams = () => {
    return $.get(`${MOCKAPI_URL}/teams`)
   }

//Function to create the team and post it to the database
const createTeam = (e) => {
    e.preventDefault();

    const team = {
        name: $('#teamName').val(),
        conference: $(`input[name='conference']:checked`).val(),
        coach: $('#coach').val(),
    }

    $.ajax({
        type: 'POST',
        url: `${MOCKAPI_URL}/teams`,
        data: team,
        dataType: 'json',
        success: getTeams().done(showTeams),
    })

    $('#teamName').val('');
    $(`input[name='conference']`).prop('checked', false);
    $('#coach').val('');
}

//Function to delete teams
const deleteTeam = (id) => {
    $.ajax({
        type: 'DELETE',
        url: `${MOCKAPI_URL}/teams/${id}`,
        success: getTeams().done(showTeams),
    })
}

//function to update teams in the database
const editTeam = (id, editTeams) => {   
    
                $.ajax({
                    type: 'PUT', 
                    url: `${MOCKAPI_URL}/teams/${id}`,
                    data: editTeams,
                    dataType: 'json',
                    success: getTeams().done(showTeams)

})
            }

//Function to show teams on the page
const showTeams = () => {
   getTeams().then((teams) => {
    $('#body').empty();
    for (let team of teams) {
        $('#body').append(`
        <tr>
            <td>${team.name}</td>
            <td>${team.conference}</td>
            <td>${team.coach}</td>
            <td><button class="btn btn-danger" id="del${team.id}">Delete</button></td>
            <td><button class="btn btn-primary edit" id="${team.id}" data-bs-toggle="modal" data-bs-target="#edtModal">Edit</button></td>
        `)

        
       //Creating the delete and edit button in order to interact directly with functions 
        $(`#del${team.id}`).click(() => deleteTeam(team.id));
        $(`.edit`).click((event) => {
            const id = $((event.currentTarget)).attr('id');
            console.log(id);
            $('#edtSub').one('click', (e) => {
                e.preventDefault();

                const editTeams = {
                    id: id,
                    name: $('#edtTeamName').val(),
                    conference: $(`input[name='edtConference']:checked`).val(),
                    coach: $('#edtCoach').val(),
                };

                editTeam(id, editTeams);
            });  
        });

 
    }
   })
}





$('#sub').click(createTeam);

//calling the function to show teams on the page
showTeams();

})


