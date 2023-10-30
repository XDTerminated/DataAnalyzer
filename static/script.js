let selectedFiles = [];
let formData = new FormData();

document.getElementById("browse").addEventListener("click", function () {
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf, .docx, .txt, .pptx, .csv";
    fileInput.multiple = true;

    fileInput.addEventListener("change", function () {
        selectedFiles = fileInput.files;
        console.log(selectedFiles);
        if (selectedFiles.length > 0) {
            var filesInnerHTML = document.getElementById("files");
            var browseDiv = document.getElementById("btn");
            filesInnerHTML.innerHTML = "Files: " + selectedFiles.length;

            for (var i = 0; i < selectedFiles.length; i++) {
                formData.append("files", selectedFiles[i]);
            }

            browseDiv.innerHTML = "<div id='output' class='output'></div>";

            var csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "upload/");

            xhr.setRequestHeader("X-CSRFToken", csrfToken);

            xhr.send(formData);
        }
    });

    fileInput.click();
});

document.getElementById("img").addEventListener("click", function () {
    if (selectedFiles.length >= 1) {
        console.log(selectedFiles);

        if (document.getElementById("searchbar").value != "") {
            var value = document.getElementById("searchbar").value;
            fetch("upload/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-CSRFToken": getCookie("csrftoken"), // Include CSRF token for Django
                },
                body: "data=" + encodeURIComponent(value),
            })
                .then((response) => response.json())
                .then((data) => {
                    // Handle the processed data and update the HTML
                    document.getElementById("output").innerText = data.result;
                });
        }
    }
});

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
