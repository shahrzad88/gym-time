$(document).ready(function() {
    //Getting references to the type input and activity container, as well as the table body
    var typeInput = $("#activity-type");
    var activityList = $("tbody");
    var activityContainer = $(".activity-container");
    //Adding event listeners to the form to create a new object, and the button to delete
    //an Activity
    $(document).on("submit", "#activity-form", handleActivityFormSubmit);
    $(document).on("click", ".delete-activity", handleDeleteButtonPress);
  
    //Getting the initial list of Activities
    getActivities();
  
    //A function to handle what happens when the form is submitted to create a new Activity
    function handleActivityFormSubmit(event) {
      event.preventDefault();
      // Don't do anything if the type fields hasn't been filled out
      if(!typeInput.val().trim().trim()) {
        return;
      }
      // Calling the upsertActivity function and passing in the value of the type input
      upsertActivity({
        type: typeInput
          .val()
          .trim()
      });
    }
  
    // A function for creating an author. Calls getActivities upon completion
    function upsertAuthor(authorData) {
      $.post("/api/activities", activityData)
        .then(getActivities);
    }
  
    // Function for creating a new list row for activities
    function createActivityRow(activityData) {
      var newTr = $("<tr>");
      newTr.data("activity", activityData);
      newTr.append("<td>" + activityData.type + "</td>");
      if (activityData.Posts) {
        newTr.append("<td> " + activityData.Posts.length + "</td>");
      } else {
        newTr.append("<td>0</td>");
      }
      newTr.append("<td><a href='/blog?activity_id=" + activityData.id + "'>Go to Posts</a></td>");
      newTr.append("<td><a href='/cms?activity_id=" + activityData.id + "'>Create a Post</a></td>");
      newTr.append("<td><a style='cursor:pointer;color:red' class='delete-activity'>Delete Activity</a></td>");
      return newTr;
    }
  
    //Function for retrieving activies and getting them ready to be rendered to the page
    function getActivities() {
      $.get("/api/activities", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createActivityRow(data[i]));
        }
        renderActivityList(rowsToAdd);
        typeInput.val("");
      });
    }
  
    // A function for rendering the list of activities to the page
    function renderActivityList(rows) {
      activityList.children().not(":last").remove();
      activityContainer.children(".alert").remove();
      if(rows.length) {
        console.log(rows);
        activityList.prepend(rows);
      }
      else {
        renderEmpty();
      }
    }
  
    // Function for handling what to render when there are no activities
    function renderEmpty() {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger");
      alertDiv.text("You must create an Author before you can create a Post.");
      activityContainer.append(alertDiv);
    }
  
    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
      var listItemData = $(this).parent("td").parent("tr").data("activity");
      var id = listItemData.id;
      $.ajax({
        method: "DELETE",
        url: "/api/activities/" + id
      })
        .then(getActivities);
    }
  });
  