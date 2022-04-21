"use strict";

var CrudOperations = function (window, document) {
  var $form = document.getElementById("form");
  var $input = document.getElementById("input");
  var $msg = document.getElementById("msg");
  var $posts = document.getElementById("posts");
  var $submitDataBtn = document.getElementById("submitData");
  var data = {};

  var init = function init() {
    console.log("Init");
    bindEvents();
  };

  var bindEvents = function bindEvents() {
    $form.addEventListener("submit", function (e) {
      e.preventDefault();
      submitData(e);
    });
    $posts.addEventListener("click", function (e) {
      console.info(e.target);

      if (e.target.classList.contains("fa-trash-alt")) {
        e.target.parentElement.parentElement.remove();
      }
    });
  };

  var submitData = function submitData(e) {
    console.log(e);
    console.log("button clicked");
    formValidation();
  };

  var formValidation = function formValidation() {
    console.info("Validation");

    if ($input.value == "") {
      $msg.innerHTML = "Post cannot be blank";
      console.warn("failure");
    } else {
      console.log("success");
      $msg.innerHTML = "";
      acceptData();
    }
  };

  var acceptData = function acceptData() {
    data.text = $input.value;
    console.table(data);
    createPost();
  };

  var createPost = function createPost() {
    $posts.innerHTML += "\n            <div class=\"post\">\n                <p>".concat(data.text, "</p>\n                <span class=\"options\">\n                    <i onClick=\"editPost(this)\" class=\"fas fa-edit\"></i>\n                    <i onClick=\"deletePost(this)\" class=\"fas fa-trash-alt\"></i>\n                </span>\n            </div>\n        ");
    $input.value = "";
  };

  var deletePost = function deletePost() {};

  return {
    Init: init
  };
}(window, document);

if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
  CrudOperations.Init();
} else {
  document.addEventListener("DOMContentLoaded", CrudOperations.Init);
}