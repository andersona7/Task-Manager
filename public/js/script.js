
//----------------------------this is for delete alert*-------------------------
let currTaskId = null;
const model = document.getElementById("deleteAlert-container");

function showDeleteModal(taskId) {
    currTaskId = taskId;
    model.style.display = "flex";
}

document.getElementById("NotDelete").onclick = () => {
    model.style.display = "none";
}

document.getElementById("deletethis").onclick = async () => {
    await fetch(`/tasks/${currTaskId}/delete`, {
        method: 'post',
        header: {
            'content-type': 'application/json'
        }
    });
    window.location.reload();
}
//--------------------------------------------------------------------------------

//--------------------------------this is for alert and for delete ac and logout alert--------------------------------------------
const alertModel = document.getElementById("Alert-container");
const confirmbtn = document.getElementById("confirmbtn");
function showalert(message) {
    alertModel.style.display = "flex";
    confirmbtn.style.display = "none";
    document.getElementById("AlertMessage").innerText = message;

}

document.getElementById("cancel").onclick = () => {
    alertModel.style.display = "none";
}

function showalert2(message) {
    alertModel.style.display = "flex";
    confirmbtn.style.display = "none";
    document.getElementById("cancel").style.display = "none";
    document.getElementById("AlertMessage").innerText = message;
}

function showalert3(message) {
    alertModel.style.display = "flex";
    document.getElementById("cancel").innerText = "NO";
    document.getElementById("AlertMessage").innerText = message;
}

//--------------------------------------------------------------------------

//--------------------------for logout alert confirm***************

async function logoutSubmit(event) {
    event.preventDefault();
    showalert3("Do you want to Logout?");
    confirmbtn.onclick = async () => {
        try {
            await fetch("/logout", {
                method: 'post'
            });
        }
        catch (error) {
            showalert2("Logout Failed!");
        }
        window.location.href = "/login";
    }
}




//register form alert
async function RegisterSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target)
    const data = Object.fromEntries(fd);

    try {
        const response = await fetch("/registerCheck", {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            return showalert(result.msg);
        }

        document.getElementById("registerform-dt").style.display = "none";
        document.getElementById("verification").style.display = "flex";

    }
    catch (error) {
        console.log(error)
        showalert("Something went wrong. Try again!");
    }
}

async function VerifyUser(event) {
    event.preventDefault();
    const fd = new FormData(event.target)
    const data = Object.fromEntries(fd);
    const response = await fetch("/verify-otp", {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();

    if (!response.ok) {
        return setTimeout(() => {
            showalert2(result.msg);
        }, 2000);

    }
    else {
        showalert2(result.msg);
        return setTimeout(() => {
            window.location.href = "/login";
        }, 2000);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("submitlogin");

    if (!form) return;

    form.addEventListener("submit", LoginSubmit);
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("verification");

    if (!form) return;

    form.addEventListener("submit", VerifyUser);
});


async function LoginSubmit(event) {
    event.preventDefault();
    try {
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd);

        const response = await fetch("/login", {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            showalert(result.msg);
        }
        else {
            showalert2(result.msg);
            setTimeout(() => { window.location.href = "/"; }, 3000);
        }
    }
    catch (error) {
        showalert("Something went wrong")
    }

}




//**************************fr loading******************************* */

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader-wrapper");

    // Add a slight delay for a smoother feel
    setTimeout(() => {
        loader.classList.add("hidden");
    }, 500);
});



//********************************************************** */
const usernameInput = document.getElementById("usernamein");
const errmsg = document.getElementById("error-msg");
const btns = document.getElementById("sbtbtn");

usernameInput.addEventListener("input", (e) => {
    const val = e.target.value;
    const isValid = /^[a-zA-Z0-9]*$/.test(val);


    if (!isValid) {
        usernameInput.classList.add('invalid');
        btns.disabled = true;
        errmsg.className = "error-visible";
        errmsg.innerText = "No spaces or special symbols allowed!";
    }
    else if (val.length < 8) {
        errmsg.className = "error-visible";
        btns.disabled = true;
        usernameInput.classList.add('invalid');
        errmsg.innerText = "Username is atleast 8 characters";
    }
    else if (val.length > 20) {
        errmsg.className = "error-visible";
        btns.disabled = true;
        usernameInput.classList.add('invalid');
        errmsg.innerText = "Username is less than 20 characters";
    }
    else {
        errmsg.className = "error-hidden";
        btns.disabled = false;
        usernameInput.classList.remove('invalid');
        e.target.value = val.toLowerCase();
    }
});


//---------------------------------for resend otp------------------------------------

/*const resendbtn = document.getElementById("resendotp");
const timer = document.getElementById("seconds");
const otptime = document.getElementById("otptime");

function showresendotp() {
    resendbtn.classList.remove("hidden");
    otptime.classList.add("hidden");
    otptime.classList.remove("timer-section");
    resendbtn.classList.add("timer-section");
}

function startTimer() {
    let timeleft = 30;
    resendbtn.classList.add("hidden");
    otptime.classList.remove("hidden");
    otptime.classList.add("timer-section");
    resendbtn.classList.remove("timer-section");

    if (window.otpInterval) clearInterval(window.otpInterval);

    window.otpInterval = setInterval(() => {
        timeleft--;
        timer.innerText = timeleft;

        if (timeleft <= 0) {
            clearInterval(window.otpInterval);
            showresendotp();
        }
    }, 1000);
}

async function resendotp(event) {
    startTimer();
    event.preventDefault();
    try {
        const response = await fetch("/resend-otp", {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }
        });

        const res = await response.json();

        if (!response.ok) {
            setTimeout(() => {
                showalert2(res.msg); 
            }, 500);
            
            return window.location.href = "/register";
        } else {
            setTimeout(() => {
                showalert(res.msg); 
            }, 500);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        showalert2("Connection error. Please try again.");
    }
}*/