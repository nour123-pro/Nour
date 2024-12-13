function init() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();
}

init();

var crsr = document.querySelector(".cursor");
var main = document.querySelector(".main");

document.addEventListener("mousemove", function(dets) {
    crsr.style.left = dets.x + 20 + "px";
    crsr.style.top = dets.y + 20 + "px";
});

// Page 1 Animation
gsap.from(".page1 h1, .page1 h2", {
    y: 10,
    rotate: 10,
    opacity: 0,
    delay: 0.3,
    duration: 0.7
});

// Page 2 Animation (Ensure the elements exist and animation is applied)
gsap.from(".page2 h1, .page2 h2", {
    y: 10,
    rotate: 10,
    opacity: 0,
    delay: 0.3,
    duration: 0.7
});

// Page 1 ScrollTrigger Timeline
var tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top 27%",
        end: "top 0",
        scrub: 3
    }
});
tl.to(".page1 h1", { x: -100 }, "anim");
tl.to(".page1 h2", { x: 100 }, "anim");
tl.to(".page1 video", { width: "90%" }, "anim");

// Page 1 Background Color Change on Scroll
var tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top -280%",
        end: "top -300%",
        scrub: 3
    }
});

tl3.to(".main", {
    backgroundColor: "#0F0D0D"
});

// Box Hover Effect
var boxes = document.querySelectorAll(".box");

boxes.forEach(function(elem) {
    elem.addEventListener("mouseenter", function() {
        var att = elem.getAttribute("data-image");

        var localPath = att;  // Assuming your images are in the project folder
        var fileExists = checkFileExists(localPath);

        if (fileExists) {
            crsr.style.width = "500px";
            crsr.style.height = "500px";
            crsr.style.borderRadius = "0";
            crsr.style.backgroundImage = `url(${localPath})`;
            crsr.style.backgroundPosition = "center"; 
            crsr.style.backgroundSize = "contain";
            crsr.style.backgroundRepeat = "no-repeat"; 
        } else {
            crsr.style.width = "500px";
            crsr.style.height = "370px";
            crsr.style.borderRadius = "0";
            crsr.style.backgroundImage = `url(${att})`;
        }
    });

    elem.addEventListener("mouseleave", function() {
        elem.style.backgroundColor = "transparent";
        crsr.style.width = "20px";
        crsr.style.height = "20px";
        crsr.style.borderRadius = "50%";
        crsr.style.backgroundImage = `none`;
    });
});

// Function to check if a file exists locally
function checkFileExists(filePath) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', filePath, false);
    xhr.send();
    return xhr.status !== 404;
}

var h4 = document.querySelectorAll("#nav h4");
var purple = document.querySelector("#purple");

h4.forEach(function(elem) {
    elem.addEventListener("mouseenter", function() {
        purple.style.display = "block";   
        purple.style.opacity = "1";
    });
    elem.addEventListener("mouseleave", function() {
        purple.style.display = "none";   
        purple.style.opacity = "0";
    });
});
