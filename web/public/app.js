$('#navbar').load('navbar.html');
$('#footer').load('footer.html');


const users = JSON.parse(localStorage.getItem('users')) || [];

$.get('http://localhost:3001/devices')
    .then(response => {
        response.forEach(device => {
            $('#devices tbody').append(`
 <tr>
 <td>${device.user}</td>
 <td>${device.name}</td>
 </tr>`
            );
        });
    })
    .catch(error => {
        console.error(`Error: ${error}`);
    });


$('#add-device').on('click', () => {
    const name = $('#name').val();
    const user = $('#user').val();
    const sensorData = [];
    const body = {
        name,
        user,
        sensorData
    };
    $.post('http://localhost:3001/devices', body)
        .then(response => {
            location.href = '/';
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
});
       

$('#register-button').on('click', function() {
    const username = $('#usr').val();
    const password = $('#pwd').val();
    const confpassword = $('#confpwd').val();
    const exists = users.find((user) => {
        console.log(user.username);
        return user.username === username;
    });

    if(exists == undefined)
    {   
        if(password == confpassword)
        {
            users.push({ username, password, confpassword });
            localStorage.setItem('users', JSON.stringify(users));
            location.href ='/login';
        }
        else
        {
            $("#message-warning").text("Passwords do not match! Try again...");
            $("#message").fadeIn();
        }
    }
    else
    {
        $("#message-warning").text("User already exists!");
        $("#message").fadeIn();
    }
   });

$('#login-button').on('click', function() {
    const username = $('#usr').val();
    const password = $('#pwd').val();

    const exist = users.find((user) => {
        console.log(user.username);
        return user.username === username;
    })

    const confirmpwd = users.find((user) => {
        console.log(user.password);
        return user.password === password;
    });

    if(exist == undefined)
    {   
        $("#message-warning").text("User does not exist.. Try again");
        $("#message").fadeIn();
    }
    else
    {
        if(confirmpwd == undefined)
        {
            $("#message-warning").text("Wrong password.. Try again");
            $("#message").fadeIn();
        }
        else
        {
            localStorage.setItem('isAuthenticated', JSON.stringify(true));
            location.href ='/';
        }
    }
});

const logout = () => {
    localStorage.removeItem('isAuthenticated');
    location.href='/login';
}

   $('#send-command').on('click', function()
   {
        const command = $('#command').val();
        console.log(`command is: ${command}`);
   });
   
