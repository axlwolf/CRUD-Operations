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
            description: $textArea.value
        });

        localStorage.setItem("data", JSON.stringify(data));

        console.log(data);

        createTasks();
    };

    let createTasks = () => {
        $tasks.innerHTML = "";

        data.map((x, y) => {
            return (
                $tasks.innerHTML +=  `
                <div id=${y}>
                      <span class="fw-bold">${x.text}</span>
                      <span class="small text-secondary">${x.date}</span>
                      <p>${x.description}</p>
              
                      <span class="options">
                        <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                        <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
                      </span>
                    </div>
                `
            );
        });

        resetForm();
    };

    let resetForm = () => {
        $textInput.value = '';
        $dateInput.value = '';
        $textArea.value = '';
    };

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

