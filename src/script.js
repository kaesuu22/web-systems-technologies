document.addEventListener("DOMContentLoaded", () => {
  // Get form elements and table
  const createForm = document.getElementById("createForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const roleInput = document.getElementById("role");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const userTable = document.getElementById("userTable");

  // Form submission event listener
  createForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    // Validate name input
    if (nameInput.value.trim() === "") {
      nameInput.style.borderColor = "red";
      nameInput.style.borderWidth = "2px";
      nameError.classList.remove("hidden");
      isValid = false;
    } else {
      nameInput.style.borderColor = "";
      nameError.classList.add("hidden");
    }

    // Validate email input
    if (emailInput.value.trim() === "") {
      emailInput.style.borderColor = "red";
      emailInput.style.borderWidth = "2px";
      emailError.classList.remove("hidden");
      isValid = false;
    } else {
      emailInput.style.borderColor = "";
      emailError.classList.add("hidden");
    }

    // If form inputs are valid, append values to the table
    if (isValid) {
      appendValues();
    }
  });

  // Function to append values to the table
  const appendValues = () => {
    // Setting the index to -1 in insertRow(-1) appends the new row at the end of the table.
    const newRow = userTable.insertRow(-1);

    // Insert cells for ID, name, email, role, and actions
    const idCell = newRow.insertCell(0);
    const nameCell = newRow.insertCell(1);
    const emailCell = newRow.insertCell(2);
    const roleCell = newRow.insertCell(3);
    const actionsCell = newRow.insertCell(4);

    // Add classes to cells for styling
    newRow.classList.add("text-left");
    idCell.classList.add("border", "p-2");
    nameCell.classList.add("border", "p-2");
    emailCell.classList.add("border", "p-2");
    roleCell.classList.add("border", "p-2");
    actionsCell.classList.add("border", "p-2");

    // Populate cells with input values
    idCell.textContent = userTable.rows.length - 1; // the id is the length of total rows - 1
    nameCell.textContent = nameInput.value;
    emailCell.textContent = emailInput.value;
    roleCell.textContent = roleInput.value;

    // Create edit and delete buttons
    const editButton = createEditButton();
    const deleteButton = createDeleteButton();

    // Attach event listeners to edit and delete buttons
    editButton.addEventListener("click", () => handleEdit(newRow));
    deleteButton.addEventListener("click", () => handleDelete(newRow));

    // Append buttons to actions cell
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);

    // Clear form fields value after submission
    nameInput.value = "";
    emailInput.value = "";
    roleInput.value = "Admin";
  };

  // Function to create edit button
  const createEditButton = () => {
    const editButton = document.createElement("button");
    editButton.classList.add("text-blue-500", "px-1", "editButton");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    return editButton;
  };

  // Function to create delete button
  const createDeleteButton = () => {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("text-red-500", "px-2", "deleteButton");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    return deleteButton;
  };

  // Function to handle edit button click
  const handleEdit = (row) => {
    const nameCell = row.cells[1];
    const emailCell = row.cells[2];
    const roleCell = row.cells[3];

    let newName = prompt("Edit name:", nameCell.innerText.trim());
    let newEmail = prompt("Edit email:", emailCell.innerText.trim());
    let newRole = prompt("Edit role:", roleCell.innerText.trim());

    // Email format validation
    while (newEmail !== null && !isValidEmail(newEmail)) {
      newEmail = prompt(
        "Invalid email format. Please enter a valid email:",
        newEmail
      );
    }

    // Role validation
    while (newRole !== null && !isValidRole(newRole)) {
      newRole = prompt(
        "Invalid role. Please enter 'Admin' or 'User':",
        newRole
      );
    }

    // If user canceled any of the prompts, do not update the row
    if (newName !== null && newEmail !== null && newRole !== null) {
      nameCell.innerText = newName.trim();
      emailCell.innerText = newEmail.trim();

      const capitalizedRole =
        newRole.charAt(0).toUpperCase() + newRole.slice(1).toLowerCase().trim();
      roleCell.innerText = capitalizedRole;
    }
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate role
  const isValidRole = (role) => {
    return role.toLowerCase() === "admin" || role.toLowerCase() === "user";
  };

  // Function to handle delete button click
  const handleDelete = (row) => {
    // Show confirmation dialog
    const confirmation = window.confirm(
      "Are you sure you want to delete this data?"
    );

    // Check user's choice
    if (confirmation) {
      // If user clicks "Yes", delete the row
      row.parentNode.removeChild(row);
    }
  };

  // Attach event listeners to default edit and delete buttons for each default row
  const defaultEditButton1 = document
    .getElementById("defaultRow1")
    .querySelector(".editButton");
  const defaultDeleteButton1 = document
    .getElementById("defaultRow1")
    .querySelector(".deleteButton");

  const defaultEditButton2 = document
    .getElementById("defaultRow2")
    .querySelector(".editButton");
  const defaultDeleteButton2 = document
    .getElementById("defaultRow2")
    .querySelector(".deleteButton");

  defaultEditButton1.addEventListener("click", () =>
    handleEdit(document.getElementById("defaultRow1"))
  );
  defaultDeleteButton1.addEventListener("click", () =>
    handleDelete(document.getElementById("defaultRow1"))
  );

  defaultEditButton2.addEventListener("click", () =>
    handleEdit(document.getElementById("defaultRow2"))
  );
  defaultDeleteButton2.addEventListener("click", () =>
    handleDelete(document.getElementById("defaultRow2"))
  );
});
