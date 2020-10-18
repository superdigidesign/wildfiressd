
  // Create a JavaScript Date object for the current date and time, and set the desired options.
  var date = new Date(),
      options = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
 
  // Convert to locale string and add a locale and the options
  date = date.toLocaleString( "en-US", options );
 
  // Output the date to the above HTML element
  document.getElementById("msg").innerHTML = date;

