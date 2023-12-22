// $(function() {
//   'use strict';
  
//   // Date& time
// 	var datetime = null,
// 	datetime2 = null,
//     date = null;
//     var update = function () {
//         date = moment(new Date())
//         datetime.html(date.format('HH:mm'));
//         datetime2.html(date.format('dddd, MMMM Do YYYY'));
//     };

//     $(document).ready(function(){
//         datetime = $('.time h1');
//         datetime2 = $('.time p');
//         update();
//         setInterval(update, 1000);
//     });
	

// });




// /* drawer sid user before */
// function openSideDrawer() {
//     document.getElementById("side-drawer").style.left = "0";
//     document.getElementById("side-drawer-void").classList.add("d-block");
//     document.getElementById("side-drawer-void").classList.remove("d-none");
// }

// function closeSideDrawer() {
//     document.getElementById("side-drawer").style.left = "-336px";
//     document.getElementById("side-drawer-void").classList.add("d-none");
//     document.getElementById("side-drawer-void").classList.remove("d-block");
// }

// window.openSideDrawer = openSideDrawer;
// window.closeSideDrawer = closeSideDrawer;
function toggleSideDrawer() {
    var sideDrawer = document.getElementById("side-drawer");
    var sideDrawerVoid = document.getElementById("side-drawer-void");

    if (sideDrawer.style.left === "0px") {
        sideDrawer.style.left = "-336px";
        sideDrawerVoid.classList.add("d-none");
        sideDrawerVoid.classList.remove("d-block");
    } else {
        sideDrawer.style.left = "0";
        sideDrawerVoid.classList.add("d-block");
        sideDrawerVoid.classList.remove("d-none");
    }
}

window.toggleSideDrawer = toggleSideDrawer;
