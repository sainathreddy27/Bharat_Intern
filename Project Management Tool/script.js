// Define a function to fetch and display issues/tasks
function fetchIssues() {
  // Get the issues from local storage or initialize an empty array if it doesn't exist
  var issues = JSON.parse(localStorage.getItem('issues')) || [];
  var issuesList = document.getElementById('issuesList');
  
  // Clear the existing list of issues
  issuesList.innerHTML = '';

  // Check if there are no issues to display
  if (issues.length === 0) {
      issuesList.innerHTML = '<p>No tasks found.</p>';
      return;
  }

  // Loop through the issues and create HTML elements for each issue
  issues.forEach(function(issue) {
      var issueDiv = document.createElement('div');
      issueDiv.classList.add('issue');
      
      var issueStatus = document.createElement('span');
      issueStatus.classList.add('label');
      issueStatus.classList.add('label-info');
      issueStatus.textContent = issue.status;
      
      var taskId = document.createElement('h6');
      taskId.textContent = 'Task ID: ' + issue.id;
      
      var taskDescription = document.createElement('h3');
      taskDescription.textContent = issue.description;
      
      var taskInfo = document.createElement('p');
      taskInfo.innerHTML = '<span class="glyphicon glyphicon-folder-open"></span> ' + issue.severity + ' ' +
                           '<span class="glyphicon glyphicon-user"></span> ' + issue.assignedTo;
      
      var markCompletedBtn = document.createElement('a');
      markCompletedBtn.href = '#';
      markCompletedBtn.classList.add('btn');
      markCompletedBtn.classList.add('btn-success');
      markCompletedBtn.textContent = 'Mark as Completed';
      markCompletedBtn.onclick = function() {
          setStatusClosed(issue.id);
      };

      var deleteBtn = document.createElement('a');
      deleteBtn.href = '#';
      deleteBtn.classList.add('btn');
      deleteBtn.classList.add('btn-danger');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = function() {
          deleteIssue(issue.id);
      };

      // Append elements to the issueDiv
      issueDiv.appendChild(issueStatus);
      issueDiv.appendChild(taskId);
      issueDiv.appendChild(taskDescription);
      issueDiv.appendChild(taskInfo);
      issueDiv.appendChild(markCompletedBtn);
      issueDiv.appendChild(deleteBtn);
      
      // Append issueDiv to issuesList
      issuesList.appendChild(issueDiv);
  });
}

// Handle form submission
document.getElementById('issueInputForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the form from submitting
  
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  
  // Validate input fields
  if (!issueDesc || !issueSeverity || !issueAssignedTo) {
      alert('Please fill in all fields.');
      return;
  }
  
  // Create a new issue object
  var newIssue = {
      id: chance.guid(),
      description: issueDesc,
      severity: issueSeverity,
      assignedTo: issueAssignedTo,
      status: 'Pending'
  };
  
  // Retrieve existing issues from local storage or initialize an empty array
  var issues = JSON.parse(localStorage.getItem('issues')) || [];
  
  // Add the new issue to the array
  issues.push(newIssue);
  
  // Store the updated issues array in local storage
  localStorage.setItem('issues', JSON.stringify(issues));
  
  // Clear the form fields
  document.getElementById('issueInputForm').reset();
  
  // Fetch and display the updated issues
  fetchIssues();
});

// Function to mark an issue as completed
function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
      if (issues[i].id === id) {
          issues[i].status = 'Task Completed';
      }
  }

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

// Function to delete an issue
function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
      if (issues[i].id === id) {
          issues.splice(i, 1);
      }
  }

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

// Call the fetchIssues function when the page loads
window.onload = fetchIssues;
