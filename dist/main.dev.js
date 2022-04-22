"use strict";

var TodoApp = function (window, document) {
  /*
      DOM Selectors
  */
  var $form = document.getElementById("form");
  var $textInput = document.getElementById("textInput");
  var $dateInput = document.getElementById("dateInput");
  var $textArea = document.getElementById("textarea");
  var $msg = document.getElementById("msg");
  var $tasks = document.getElementById("tasks");
  var $addBtn = document.getElementById("add"); // Data

  var data = [];

  var init = function init() {
    console.log("Init");
    bindEvents();
  };

  var bindEvents = function bindEvents() {
    $form.addEventListener("submit", function (e) {
      e.preventDefault();
      formValidation();
    });
  };

  var formValidation = function formValidation() {
    if ($textInput.value === "") {
      console.error("Failure");
      $msg.innerHTML = "Task cannot be blank";
    } else {
      console.log("Success");
      $msg.innerHTML = "";
      acceptData();
      $addBtn.setAttribute("data-bs-dismiss", "modal");
      $addBtn.click();

      (function () {
        $addBtn.setAttribute("data-bs-dismiss", "");
      })();
    }
  };

  var acceptData = function acceptData() {
    data.push({
      text: $textInput.value,
      date: $dateInput.value,
      description: $textArea.value
    });
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    createTasks();
  };

  var createTasks = function createTasks() {
    $tasks.innerHTML = "";
    data.map(function (x, y) {
      return $tasks.innerHTML += "\n                <div id=".concat(y, ">\n                      <span class=\"fw-bold\">").concat(x.text, "</span>\n                      <span class=\"small text-secondary\">").concat(x.date, "</span>\n                      <p>").concat(x.description, "</p>\n              \n                      <span class=\"options\">\n                        <i onClick= \"editTask(this)\" data-bs-toggle=\"modal\" data-bs-target=\"#form\" class=\"fas fa-edit\"></i>\n                        <i onClick =\"deleteTask(this);createTasks()\" class=\"fas fa-trash-alt\"></i>\n                      </span>\n                    </div>\n                ");
    });
    resetForm();
  };

  var resetForm = function resetForm() {
    $textInput.value = '';
    $dateInput.value = '';
    $textArea.value = '';
  };

  return {
    Init: init
  };
}(window, document);

if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
  TodoApp.Init();
} else {
  document.addEventListener("DOMContentLoaded", TodoApp.Init);
}