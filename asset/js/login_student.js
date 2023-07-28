import { config } from "./config.js";
const endpoint = `${config.api}loginUser`;

const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", () => {
    //Get Data
    var register_data = {};
    register_data["nim"] = document.getElementById("studentID").value;
    register_data["password"] = document.getElementById("pass").value;
    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(register_data)) {
      formData.append(key, value.toString());
    }
    //Submit Data
    fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })
      .then((response) => response.json())
      .then((response) => {
        var message = response["message"];
        var data = response["data"];

        if(data == null){
            Swal.fire({
                title: `${message}`,
                icon: 'error',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000
              })
        }else{
            //Success
            //Save Session
            var toSave = {};
            toSave["id_user"] = data["Data"]["id_user"];
            toSave["status"] = data["Data"]["status"];
            toSave["role"] = "student";
            window.sessionStorage.setItem(
                "user-data",
                JSON.stringify(toSave)
            );
            //console.log(window.sessionStorage.getItem("user-data"));

            //Redirect
            Swal.fire({
                title: `Login Success`,
                text: 'redirecting...',
                icon: 'success',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    window.location.href = "landing_page_login.html";
                }
            })
        }
      });
  });