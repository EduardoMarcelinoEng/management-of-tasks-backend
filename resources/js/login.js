window.addEventListener("DOMContentLoaded", ()=>{
    const emailEl = document.getElementById("inputEmail");
    const passwordEl = document.getElementById("inputPassword");

    document.querySelector("button").addEventListener("click", e=>{
        e.preventDefault();

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

                alert("Sucesso!");
                // setTimeout(()=>{
                //     loadingEl.classList.add("hide");
                //     messageEl.classList.remove("hide");
                // }, 3000);
            });
    });
});