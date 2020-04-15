submitFunction();
function submitFunction() {
  let $tableElement = document.getElementById("indiaTable");

  fetch("/getData").then(response => {
    response.json().then(data => {
      //console.log(data.activeCases);
      $tableElement.rows[1].cells[1].innerHTML = data.activeCases;
      $tableElement.rows[2].cells[1].innerHTML = data.recovered;
      $tableElement.rows[3].cells[1].innerHTML = data.deaths;
      $tableElement.rows[4].cells[1].innerHTML = data.totalCases;
    });
  });
}

function createTable() {
  let stateData = {};
  fetch("/india").then(response => {
    response
      .json()
      .then(stateDat => {
        stateData = stateDat;
      })
      .then(() => {
        var tblBody = document.createElement("tbody");
        const $stateTable = document.getElementById("dataTable");
        const stateButton = document.getElementById("stateButton");
        for (const property in stateData) {
          //creating a row
          const row = document.createElement("tr");

          //creating cells
          const stateCell = document.createElement("td");
          const activeCell = document.createElement("td");
          const confirmedCell = document.createElement("td");
          const deathCell = document.createElement("td");
          const recoveredCell = document.createElement("td");

          //filling data into cells
          const stateName = document.createTextNode(property);
          const activeCases = document.createTextNode(
            stateData[property].active
          );
          const confirmedCases = document.createTextNode(
            stateData[property].confirmed
          );
          const deaths = document.createTextNode(stateData[property].deaths);

          const recovered = document.createTextNode(
            stateData[property].recovered
          );

          stateCell.appendChild(stateName);
          activeCell.appendChild(activeCases);
          confirmedCell.appendChild(confirmedCases);
          deathCell.appendChild(deaths);
          recoveredCell.appendChild(recovered);

          //adding cells to rows
          row.appendChild(stateCell);
          row.appendChild(activeCell);
          row.appendChild(confirmedCell);
          row.appendChild(deathCell);
          row.appendChild(recoveredCell);

          //adding row to the tableBody
          tblBody.appendChild(row);

          //attaching to existing table
          stateTable.appendChild(tblBody);

          $stateTable.hidden = false;
          stateButton.disabled = "true";
        }
      });
  });
}
