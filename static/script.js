let selectedFiles;
let formData = new FormData();

document.getElementById("browse").addEventListener("click", function () {
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf, .doc, .docx, .txt, .html, .js, .css";
    fileInput.multiple = true;

    fileInput.addEventListener("change", function () {
        selectedFiles = fileInput.files;
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


if (selectedFiles.length > 0) {
    document.getElementById("browse").addEventListener("click", function () {
        
    });
}

// function getCookie(name) {
//     var cookieValue = null;
//     if (document.cookie && document.cookie !== "") {
//         var cookies = document.cookie.split(";");
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = cookies[i].trim();
//             if (cookie.substring(0, name.length + 1) === name + "=") {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }
