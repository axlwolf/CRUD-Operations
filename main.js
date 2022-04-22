const TodoApp = ((window, document) =>  {
    /*
        DOM Selectors
    */
    let $form = document.getElementById("form");
    let $textInput = document.getElementById("textInput");
    let $dateInput = document.getElementById("dateInput");
    let $textArea = document.getElementById("textarea");
    let $msg = document.getElementById("msg");
    let $tasks = document.getElementById("tasks");
    let $addBtn = document.getElementById("add");

    // Data
    let data = [];

    let init = () => { 
        console.log("Init");
        bindEvents();
    }

    let bindEvents = () => {
        $form.addEventListener("submit", (e) => {
            e.preventDefault();
            formValidation();
        });
    }

    let formValidation = () => {
        if($textInput.value === "") {
            console.error("Failure");
            $msg.innerHTML = "Task cannot be blank";
        } else {
            console.log("Success");
            $msg.innerHTML = "";
            acceptData();

            $addBtn.setAttribute("data-bs-dismiss", "modal");
            $addBtn.click();
        
            (() => {
                $addBtn.setAttribute("data-bs-dismiss", "");
            })();
        }
    }; 

    let acceptData = () => {
        data.push({
            text: $textInput.value,
            date: $dateInput.value,
            description: $textInput.value
        });

        localStorage.setItem("data", JSON.stringify(data));

        console.log(data);
    };

    let closeModal = () => {};

    return {
        Init: init
    }
})(window, document);


if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    TodoApp.Init();
} else {
    document.addEventListener("DOMContentLoaded", TodoApp.Init);
}

