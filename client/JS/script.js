let navLinks = document.querySelectorAll('.nav-links')

// CHanging the navLinks - animation

navLinks.forEach(element => {
    element.addEventListener('mouseover', () => {
        console.log(element.id)
        if (element.id == "home-nav") {
            element.innerHTML = "HOME"
        } else if (element.id == "convert-nav") {
            element.innerHTML = "CONVERT"
        } else if (element.id == "explain-nav") {
            element.innerHTML = "EXPLAIN"
        } else if (element.id == "error-nav") {
            element.innerHTML = "ERROR"
        }
    })
})

navLinks.forEach((element) => {
    element.addEventListener('mouseleave', () => {
        if (element.id == "home-nav") {
            element.innerHTML = "//HOME"
        } else if (element.id == "convert-nav") {
            element.innerHTML = "//CONVERT"
        } else if (element.id == "explain-nav") {
            element.innerHTML = "//EXPLAIN"
        } else if (element.id == "error-nav") {
            element.innerHTML = "//ERROR"
        }
    })
})