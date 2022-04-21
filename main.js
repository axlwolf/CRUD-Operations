const CrudOperations = ((window, document) =>  {
    const $form = document.getElementById("form");
    const $input = document.getElementById("input");
    const $msg = document.getElementById("msg");
    const $posts = document.getElementById("posts");  
    const $submitDataBtn = document.getElementById("submitData");
    let data = {};    

    let init = () => { 
        console.log("Init");
        bindEvents();
    }

    let bindEvents = () => {
        $form.addEventListener("submit", (e) => {
            e.preventDefault();
            submitData(e);
        });

        $posts.addEventListener("click", (e) => {
            console.info(e.target);
            if(e.target.classList.contains("fa-trash-alt")) {
                deletePost(e.target);
            }
            if(e.target.classList.contains("fa-edit")) {
                editPost(e.target);
            }
        });
    }

    let submitData = (e) => {
        console.log(e);
        console.log("button clicked");

        formValidation();
    }

    let formValidation = () => {
        console.info("Validation");
        if ($input.value == "") {
            $msg.innerHTML = "Post cannot be blank";
            console.warn("failure");
        } else {
            console.log("success");
            $msg.innerHTML = "";
            acceptData();
        }
    }

    let acceptData = () => {
        data.text = $input.value;
        console.table(data);
        createPost();
    }

    let createPost = () => {
        $posts.innerHTML += `
            <div class="post">
                <p>${data.text}</p>
                <span class="options">
                    <i class="fas fa-edit"></i>
                    <i class="fas fa-trash-alt"></i>
                </span>
            </div>
        `;
        $input.value = "";
    }

    let deletePost = (target) => {
        target.parentElement.parentElement.remove();
    }

    let editPost = (target) => {
        $input.value = target.parentElement.previousElementSibling.innerHTML;
        target.parentElement.parentElement.remove();
    }

    return {
        Init: init
    }
})(window, document);


if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    CrudOperations.Init();
} else {
    document.addEventListener("DOMContentLoaded", CrudOperations.Init);
}

