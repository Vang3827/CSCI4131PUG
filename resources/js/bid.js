document.addEventListener("DOMContentLoaded", () => {
  console.log("In bid.js script");

  const btn = document.getElementById("btnButton");
  const formInput = document.getElementById("bidInput");
  const submitBtn = document.getElementById("submit");
  const bidContainerID = document.getElementById("bidContainer");

  async function postapi() {
    const name_input = document.getElementById("nameinput").value;
    const amount_input = document.getElementById("amount").value;
    const comments_input = document.getElementById("comments").value;
    const listingId = document.getElementById("bidInput").getAttribute("data-id");

    const formData = {
      bidder_name: name_input,
      bid_amount: amount_input,
      comment: comments_input,
      listing_id: listingId
    };

    console.log("fetch ", JSON.stringify(formData));

    const url = '/api/place_bid';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error placing bid: ", errorData);
        alert(errorData.message); // Display error message
        return;
      }

      const data = await response.json();
      console.log('Bid placed successfully:', data);

      // Add the new bid to the DOM dynamically
      const newName = document.createTextNode(data.newBid.bidder_name);
      const newBid = document.createTextNode("$" + data.newBid.bid_amount);
      const newComment = document.createTextNode(data.newBid.comment);

      const newDiv = document.createElement("div");
      const newPname = document.createElement("p");
      const newPamount = document.createElement("p");
      const newPcomment = document.createElement("p");

      newDiv.classList.add("bidDiv");

      newPname.appendChild(newName);
      newPamount.appendChild(newBid);
      newPcomment.appendChild(newComment);

      newDiv.appendChild(newPname).classList.add("top");
      newDiv.appendChild(newPamount).classList.add("top");
      newDiv.appendChild(newPcomment).classList.add("bot");

      bidContainerID.prepend(newDiv); // Adds the new bid to the top of the list

      // Optionally hide the form after submission
      if (formInput.style.display === "block") {
        formInput.style.display = "none";
      } else {
        formInput.style.display = "block";
      }

    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Error placing bid. Please try again.');
    }
  }

  formInput.style.display = "none";

  // Toggle the form visibility
  btn.addEventListener("click", () => {
    formInput.style.display = formInput.style.display === "block" ? "none" : "block";
  });

  // Handle form submission
  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    postapi();
  });
});
