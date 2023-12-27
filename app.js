const MOCKAPI_URL = "https://658125763dfdd1b11c427f36.mockapi.io"

$(document).ready(function() {

   const getTeams = () => {
    return $.get(`${MOCKAPI_URL}/teams`)
   }



const createTeam = (e) => {
    e.preventDefault()

    const team = {
        name: $('#teamName').val(),
        conference: $(`input[name='conference']:checked`).val(),
        coach: $('#coach').val(),
    }

    $.ajax({
        type: 'POST',
        url: `${MOCKAPI_URL}/teams`,
        data: team,
        dataType: 'application/json',
        success: getTeams().done(showTeams),
    })

    $('#teamName').val('');
    $(`input[name='conference']`).prop('checked', false);
    $('#coach').val('');
}

const deleteTeam = (id) => {
    $.ajax({
        type: 'DELETE',
        url: `${MOCKAPI_URL}/teams/${id}`,
        success: getTeams().done(showTeams),
    })
}

const editTeam = (id) => {
    e.preventDefault();

    $('#edtSub').val(`${team.id}`);
        

                const editTeams = {
                    name: $('#edtTeamName').val(),
                    conference: $(`input[name='edtConference']:checked`).val(),
                    coach: $('#edtCoach').val(),
                }

    
                $.ajax({
                    type: 'PUT', 
                    url: `${MOCKAPI_URL}/teams/${id}`,
                    data: editTeams,
                    dataType: 'application/json',
                    success: getTeams().done(showTeams)
})
            }

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
            <td><button class="btn btn-primary" id="edt${team.id}" data-bs-toggle="modal" data-bs-target="#edtModal">Edit</button></td>

        `)
        $(`#del${team.id}`).click(() => deleteTeam(team.id));
        $(`#edtSub${team.id}`).click(() => editTeam(team.id));

    }
   })
}





$('#sub').click(createTeam);

showTeams();

})


