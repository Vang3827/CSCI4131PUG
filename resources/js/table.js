window.addEventListener("DOMContentLoaded", () => {

    console.log("In table.js script");

    let count = new Date("Oct 25, 2024 15:37:25").getTime();
    let countTwo = new Date("Oct 30, 2024 15:37:25").getTime();
    let countTre = new Date("Nov 15, 2024 15:37:25").getTime();

    // Update the count down every 1 second
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

        // Display the result in the element with id="demo"
        document.getElementById("timer1").innerHTML = d + "d " + h + "h "
            + m + "m " + s + "s ";
        document.getElementById("timer2").innerHTML = dTwo + "d " + hTwo + "h "
            + mTwo + "m " + sTwo + "s ";
        document.getElementById("timer3").innerHTML = dTre + "d " + hTre + "h "
            + mTre + "m " + sTre + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer1").innerHTML = "EXPIRED";
            document.getElementById("timer2").innerHTML = "EXPIRED";
            document.getElementById("timer3").innerHTML = "EXPIRED";
        }
    }, 1000);



    document.getElementById('imgData1').addEventListener('mouseover', function () {
        const imgNode = document.createElement("img")
        let imgData = document.getElementById("imgData1");
        const dataimage = imgData.dataset.image
        console.log(dataimage)
        imgNode.src = dataimage
        imgNode.alt = "image Preview here"
        imgNode.width = 320;
        imgNode.height = 270;
        imgNode.id = "newNode"
        const element = document.getElementById("imgPreview");
        element.appendChild(imgNode);
    });
    document.getElementById('imgData1').addEventListener("mouseout", (event) => {
        // const elementData = myElement.dataset.image; // Accessing custom data

        // document.getElementById("imgPreview").style.display = "none";
        const removeele = document.getElementById("newNode");
        removeele.remove()
    });

    document.getElementById('imgData2').addEventListener('mouseover', function () {
        const imgNode = document.createElement("img")
        let imgData = document.getElementById("imgData2");
        const dataimage = imgData.dataset.image
        console.log(dataimage)
        imgNode.src = dataimage
        imgNode.alt = "image Preview here"
        imgNode.width = 320;
        imgNode.height = 270;
        imgNode.id = "newNode"
        const element = document.getElementById("imgPreview");
        element.appendChild(imgNode);
    });
    document.getElementById('imgData2').addEventListener("mouseout", (event) => {
        // const elementData = myElement.dataset.image; // Accessing custom data

        // document.getElementById("imgPreview").style.display = "none";
        const removeele = document.getElementById("newNode");
        removeele.remove()
    });

    document.getElementById('imgData3').addEventListener('mouseover', function () {
        const imgNode = document.createElement("img")
        let imgData = document.getElementById("imgData3");
        const dataimage = imgData.dataset.image
        console.log(dataimage)
        imgNode.src = dataimage
        imgNode.alt = "image Preview here"
        imgNode.width = 320;
        imgNode.height = 270;
        imgNode.id = "newNode"
        const element = document.getElementById("imgPreview");
        element.appendChild(imgNode);
    });
    document.getElementById('imgData3').addEventListener("mouseout", (event) => {
        // const elementData = myElement.dataset.image; // Accessing custom data

        // document.getElementById("imgPreview").style.display = "none";
        const removeele = document.getElementById("newNode");
        removeele.remove()
    });

    newImgPreview

    // Optionally reset the image when mouse leaves the text
    document.querySelectorAll('.hover-text').forEach(text => {
        text.addEventListener('mouseleave', function () {
            image.src = 'default.jpg';
        });
    });

    async function deleteapi() {
        btnId = document.getElementById("tableRow").value
        console.log("DELETE! this one --> ",btnId)

        let url = "/api/delete_listing/"+btnId

        let options = {
            method: "DELETE"
        }
        fetch(url,options)
        .then(repsonse => console.log(repsonse.status))
        

    }


    const deleteBtn = document.querySelectorAll("#delete");

    // deleteBtn.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     deleteapi()
    // })

    // Add an event listener to each button
    // deleteBtn.forEach(button => {
    //     button.addEventListener('click', buttons
    //     // Code to execute when the button is clicked
    //     // console.log('Delete Button clicked!'); 
    //     // deleteapi();
    //   );
    // });

    // function buttons() {
    //     console.log('Delete Button clicked!'); 
    //     deleteapi();
    // };


    document.addEventListener("click", e => {
        if (e.target.matches("#delete"))
            console.log("clicked");
            deleteapi();
    })



});