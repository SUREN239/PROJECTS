// document.addEventListener("DOMContentLoaded", function () {
//   const checkInButton = document.getElementById("checkInButton");
//   const mapDiv = document.getElementById("map");

//   checkInButton.addEventListener("click", function () {
//       const name = document.getElementById("name").value.trim();
//       if (!name) {
//           alert("Please enter your name.");
//           return;
//       }

//       if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(function (position) {
//               const latitude = position.coords.latitude;
//               const longitude = position.coords.longitude;
//               const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
//               mapDiv.innerHTML = `<p>Name: ${name}</p><p>Location: <a href="${mapUrl}" target="_blank">View on Map</a></p>`;
//           }, function (error) {
//               mapDiv.textContent = "Error getting location: " + error.message;
//           });
//       } else {
//           mapDiv.textContent = "Geolocation is not supported by your browser.";
//       }
//   });
// });


document.addEventListener("DOMContentLoaded", function () {
    const checkInButton = document.getElementById("checkInButton");
    const mapDiv = document.getElementById("map");

    checkInButton.addEventListener("click", function () {
        const name = document.getElementById("name").value.trim();
        if (!name) {
            alert("Please enter your name.");
            return;
        }

        let rollNumber = "";

        if (name === "Shree Harinesh") {
            rollNumber = "727822TUCS239";
        } else if (name === "Suren") {
            rollNumber = "727822TUCS239"; // Replace with the correct registration number for Suren
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                mapDiv.innerHTML = `<p>Name: ${name}</p>${rollNumber ? `<p>Registration Number: ${rollNumber}</p>` : ""}<p>Location: <a href="${mapUrl}" target="_blank">View on Map</a></p>`;
            }, function (error) {
                mapDiv.textContent = "Error getting location: " + error.message;
            });
        } else {
            mapDiv.textContent = "Geolocation is not supported by your browser.";
        }
    });
});
