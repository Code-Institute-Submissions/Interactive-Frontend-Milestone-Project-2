function sendMail(contactForm) {
    emailjs.send("muthuvanitha_gmail_com", "vanitha", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "stockholm_tours": contactForm.Message.value
    },"user_5KExuU3XUBpBZd0ZMo3JQ")
    .then(
        function(response) {
            alert("Your Message has been sent!!");
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;  // To block from loading a new page
}