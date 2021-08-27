function onScanSuccess(qrCodeMessage) {
  // handle on success condition with the decoded message

  window.location.assign("https://script.google.com/macros/s/AKfycbxBho6ZDKwVZsd7VOlt3k91wL32rx8tX4dCN9oqOM9n1nujyyXKO4G6/exec?ID="+qrCodeMessage);

  html5QrcodeScanner.clear();

}

function onScanError(errorMessage) {
  // handle on error condition, with error message
  return "No data or QRCODE is Detected"
}

var html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess, onScanError);