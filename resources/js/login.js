import helpers from "./helpers";

window.addEventListener("DOMContentLoaded", ()=>{
    if(helpers.tokenIsValid()){
        window.location.href = "/admin";

        return;
    }

    const emailEl = document.getElementById("inputEmail");
    const passwordEl = document.getElementById("inputPassword");

    document.querySelector("button").addEventListener("click", e=>{
        e.preventDefault();

        e.target.disabled = true;

        fetch("/user/auth", {
            method: 'POST',
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: emailEl.value, password: passwordEl.value})
        })
            .then(async rawResponse=>{
                const content = await rawResponse.json();
                
                if(rawResponse.status >= 400){
                    alert(content.message);
                    return;
                }

                localStorage.setItem("token", content.value);
                localStorage.setItem("token_expiresAt", content.expiresAt.toString());

                window.location.href = "/admin";
            })
            .finally(()=>e.target.disabled = false);
    });
});