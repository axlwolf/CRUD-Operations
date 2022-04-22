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
      description: $textInput.value
    });
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
  };

  var closeModal = function closeModal() {};

  return {
    Init: init
  };
}(window, document);

if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
  TodoApp.Init();
} else {
  document.addEventListener("DOMContentLoaded", TodoApp.Init);
}