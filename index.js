function update() {
    naam = document.getElementById("Name").value;
    tarik = document.getElementById("date").value;
    paise = document.getElementById("amount").value;
    if (naam.trim() === "" && tarik.trim() === "" && paise.trim() === "") {
        console.log("Please enter the fields, thry are empty!!");
    }
    else {
        console.log("Updating data")
        if (localStorage.getItem('expenseJson') == null) {
            expenseJsonArray = [];
            expenseJsonArray.push([naam, tarik, paise]);
            localStorage.setItem('expenseJson', JSON.stringify(expenseJsonArray));
        }
        else {
            let expenseJsonArraystr = localStorage.getItem('expenseJson');
            let expenseJsonArray = JSON.parse(expenseJsonArraystr);
            expenseJsonArray.push([naam, tarik, paise]);
            localStorage.setItem('expenseJson', JSON.stringify(expenseJsonArray));
        }
    }
    document.getElementById("Name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("amount").value = "";
    updatetotable();
}
function updatetotable() {
    if (localStorage.getItem('expenseJson') == null) {
        expenseJsonArray = [];
        localStorage.setItem('expenseJson', JSON.stringify(expenseJsonArray));
    }
    else {
        expenseJsonArraystr = localStorage.getItem('expenseJson');
        expenseJsonArray = JSON.parse(expenseJsonArraystr);
    }

    tablebody = document.getElementById("bodyha");
    str = "";
    expenseJsonArray.forEach((element, index) => {
        str += `
        <tr>
        <th> ${index + 1} </th>
        <td> ${element[0]}</td>
        <td> ${element[1]}</td>
        <td> ${element[2]}</td>
        <td> <button class="btn btn-sm btn-primary" id="remove" onclick="deleting(${index})">Remove</button></td>
        </tr>
        `;
    });
    tablebody.innerHTML = str;
}
let add = document.getElementById("addtolist");
add.addEventListener("click", update);
updatetotable();

function deleting(indexarr) {
    let expenseJsonArraystr = localStorage.getItem('expenseJson');
    let expenseJsonArray = JSON.parse(expenseJsonArraystr);

    expenseJsonArray.splice(indexarr,1);
    localStorage.setItem('expenseJson', JSON.stringify(expenseJsonArray));
    updatetotable();
}
function clearkrdo(){
    if(confirm("Are u sure you want to clear all the expenses?")){
        localStorage.removeItem('expenseJson');
        updatetotable();
    }
}