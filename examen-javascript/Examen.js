document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("user-form");
  const userTableContainer = document.getElementById("user-table-container");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const sexo = document.getElementById("sexo").value;

    await addUserToAPI({ nombre, apellido, sexo });
    await fetchUsersFromAPI();
    form.reset();
  });

  const addUserToTable = (nombre, apellido, sexo) => {
    if (!userTableContainer.querySelector("table")) {
      const userTable = document.createElement("table");
      const tableHead = document.createElement("thead");
      const tableRow = document.createElement("tr");

      const headerCell1 = document.createElement("th");
      headerCell1.textContent = "Nombre";
      tableRow.appendChild(headerCell1);

      const headerCell2 = document.createElement("th");
      headerCell2.textContent = "Apellido";
      tableRow.appendChild(headerCell2);

      const headerCell3 = document.createElement("th");
      headerCell3.textContent = "Sexo";
      tableRow.appendChild(headerCell3);

      tableHead.appendChild(tableRow);
      userTable.appendChild(tableHead);
      userTableContainer.appendChild(userTable);

      const tableBody = document.createElement("tbody");
      userTable.appendChild(tableBody);
    }

    const userTableBody = userTableContainer.querySelector("table tbody");
    const row = userTableBody.insertRow();
    const nombreCell = row.insertCell(0);
    const apellidoCell = row.insertCell(1);
    const sexoCell = row.insertCell(2);
    nombreCell.textContent = nombre;
    apellidoCell.textContent = apellido;
    sexoCell.textContent = sexo;
  };

  const fetchUsersFromAPI = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users');
      const data = await response.json();
      userTableContainer.innerHTML = ''; 
      data.forEach(user => {
        addUserToTable(user.nombre, user.apellido, user.sexo);
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUserToAPI = async (user) => {
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  fetchUsersFromAPI();
});


