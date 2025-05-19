function maskPassword(pass){
    return '*'.repeat(pass.length);
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(() => {
        const alertBox = document.getElementById("alert");
        alertBox.style.display = "block";
        setTimeout(() => alertBox.style.display = "none", 2000);
    }, () => {
        alert("Clipboard copying failed");
    });
}

function deletePassword(website){
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arr = arr.filter(e => e.website !== website);
    localStorage.setItem("passwords", JSON.stringify(arr));
    alert(`Deleted ${website}'s password`);
    showPasswords();
}

function showPasswords(){
    let tb = document.getElementById("passwords-table");
    let data = localStorage.getItem("passwords");
    if (!data || JSON.parse(data).length === 0) {
        tb.innerHTML = "<tr><td colspan='4'>No passwords stored yet.</td></tr>";
        return;
    }

    tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Action</th>
    </tr>`;

    let arr = JSON.parse(data);
    arr.forEach(({ website, username, password }) => {
        tb.innerHTML += `
        <tr>
            <td>${website} <img onclick="copyText('${website}')" src="copy.svg" alt="Copy"></td>
            <td>${username} <img onclick="copyText('${username}')" src="copy.svg" alt="Copy"></td>
            <td>${maskPassword(password)} <img onclick="copyText('${password}')" src="copy.svg" alt="Copy"></td>
            <td><button class="btnsm" onclick="deletePassword('${website}')">Delete</button></td>
        </tr>`;
    });
}

document.getElementById("password-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let website = document.getElementById("website").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
    passwords.push({ website, username, password });
    localStorage.setItem("passwords", JSON.stringify(passwords));

    alert("Password saved!");
    e.target.reset();
    showPasswords();
});

showPasswords();
