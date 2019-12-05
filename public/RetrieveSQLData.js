
function getHttpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onreadystatechange = processChanges;

    function processChanges() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var packagesObject = xhr.response;
            callback(packagesObject);
        }
    }
}
