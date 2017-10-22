// get all data in form and return object
function getFormData() {
  var elements = document.getElementById("gform").elements; // all form elements
  var fields = Object.keys(elements).map(function(k) {
    if(elements[k].name !== undefined) {
      return elements[k].name;
    // special case for Edge's html collection
    }else if(elements[k].length > 0){
      return elements[k].item(0).name;
    }
  }).filter(function(item, pos, self) {
    return self.indexOf(item) == pos && item;
  });
  var data = {};
  fields.forEach(function(k){
    data[k] = elements[k].value;
    var str = ""; // declare empty string outside of loop to allow
                  // it to be appended to for each item in the loop
    if(elements[k].length){
      for(var i = 0; i < elements[k].length; i++){
        if(elements[k].item(i).checked){
          str = str + elements[k].item(i).value + ", "; // same as above
          data[k] = str.slice(0, -2);
        }
      }
    }
  });
  data.id='_' + Math.random().toString(36).substr(2, 9);
  return data;   
}



function handleFormSubmit(event) {    // handles form submit withtout any jquery
    event.preventDefault();           // we are submitting via xhr below
    var data = getFormData();         // get the values submitted in the form 
    var url = event.target.action;    //
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        var response=JSON.parse(xhr.responseText);
        document.getElementById('gform').style.display = 'none'; // hide form
        document.getElementById('thankyou_message').style.display = 'block';       
        var qr = new QRious({
          element: document.getElementById('qr'),
          value: window.location.href+'qrread?id='+JSON.parse(response.data).id[0]
        });
        //window.location = window.location.href+'qrread?id=_l8v4ewxua';
        return;
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded);
}
function loaded() {
  // bind to the submit event of our form
  var form = document.getElementById('gform');
  navigator.geolocation.getCurrentPosition(function(location) {
    document.getElementById('farmlocation').value=location.coords.latitude+','+location.coords.longitude;    
  });
  form.addEventListener("submit", handleFormSubmit, false);
};
document.addEventListener('DOMContentLoaded', loaded, false);


