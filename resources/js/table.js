window.addEventListener("DOMContentLoaded", () => {
    console.log("In table.js script");

    let count = new Date("Dec 25, 2024 15:37:25").getTime();
    let countTwo = new Date("Dec 30, 2024 15:37:25").getTime();
    let countTre = new Date("Dec 15, 2024 15:37:25").getTime();

    // Update the countdown every 1 second
    let x = setInterval(function () {
        let now = new Date().getTime();
        let distance = count - now;
        let distwo = countTwo - now;
        let distre = countTre - now;

        let d = Math.floor(distance / (1000 * 60 * 60 * 24));
        let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((distance % (1000 * 60)) / 1000);

        let dTwo = Math.floor(distwo / (1000 * 60 * 60 * 24));
        let hTwo = Math.floor((distwo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let mTwo = Math.floor((distwo % (1000 * 60 * 60)) / (1000 * 60));
        let sTwo = Math.floor((distwo % (1000 * 60)) / 1000);

        let dTre = Math.floor(distre / (1000 * 60 * 60 * 24));
        let hTre = Math.floor((distre % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let mTre = Math.floor((distre % (1000 * 60 * 60)) / (1000 * 60));
        let sTre = Math.floor((distre % (1000 * 60)) / 1000);

        document.getElementById("timerid1").innerHTML = d + "d " + h + "h "
            + m + "m " + s + "s ";
        document.getElementById("timerid2").innerHTML = dTwo + "d " + hTwo + "h "
            + mTwo + "m " + sTwo + "s ";
        document.getElementById("timerid3").innerHTML = dTre + "d " + hTre + "h "
            + mTre + "m " + sTre + "s ";

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timerid1").innerHTML = "EXPIRED";
            document.getElementById("timerid2").innerHTML = "EXPIRED";
            document.getElementById("timerid3").innerHTML = "EXPIRED";
        }
    }, 1000);

    // Hover effect for image previews
    function setupImagePreview(imgDataId, previewId) {
        document.getElementById(imgDataId).addEventListener('mouseover', function () {
            const imgNode = document.createElement("img");
            let imgData = document.getElementById(imgDataId);
            const dataimage = imgData.dataset.image;
            imgNode.src = dataimage;
            imgNode.alt = "Image Preview here";
            imgNode.width = 320;
            imgNode.height = 270;
            imgNode.id = "newNode";
            const element = document.getElementById(previewId);
            element.appendChild(imgNode);
        });

        document.getElementById(imgDataId).addEventListener("mouseout", () => {
            const removeele = document.getElementById("newNode");
            removeele.remove();
        });
    }

    // Setting up image previews for multiple images
    setupImagePreview('imgData1', 'imgPreview');
    setupImagePreview('imgData2', 'imgPreview');
    setupImagePreview('imgData3', 'imgPreview');

    // Delete Button functionality
    const deleteButtons = document.querySelectorAll('.bidButton');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const listingId = this.getAttribute('data-id');
            
            try {
                const response = await fetch('/api/delete_listing', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ listing_id: listingId }),
                });

                if (response.ok) {
                    // Immediately remove the listing row from the DOM without refreshing
                    const row = document.querySelector(`#tableRow-${listingId}`);
                    if (row) row.remove();  // Remove the row from the table
                } else {
                    // Handle failure here (you can add an error message, log it, etc.)
                    console.error('Failed to delete listing');
                }
            } catch (error) {
                // Handle any errors
                console.error('Error deleting listing:', error);
            }
        });
    });
});
