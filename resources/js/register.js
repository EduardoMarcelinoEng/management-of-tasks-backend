window.addEventListener("DOMContentLoaded", ()=>{
    const emailEl = document.getElementById("inputEmail");
    const nameEl = document.getElementById("inputName");
    const passwordEl = document.getElementById("inputPassword");
    const repeatPasswordEl = document.getElementById("inputRepeatPassword");

    const clearInputs = ()=>{
        emailEl.value = "";
        nameEl.value = "";
        passwordEl.value = "";
        repeatPasswordEl.value = "";
    }

    document.querySelector("button").addEventListener("click", e=>{
        e.preventDefault();

        e.target.disabled = true;

        fetch("/user", {
            method: 'POST',
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailEl.value,
                password: passwordEl.value,
                name: nameEl.value
            })
        })
            .then(async rawResponse=>{
                const content = await rawResponse.json();
                
                if(rawResponse.status >= 400){
                    alert(content.message);
                    return;
                }

                clearInputs();
                alert("Usuário criado com sucesso!");
                window.location.href = "/login";
            })
            .catch(error=>{
                alert(error.message);
            })
            .finally(()=>e.target.disabled = false);
    });
});