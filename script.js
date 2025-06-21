function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('open');
  }

const username = "Manohar_17";

// STATS: https://leetcode-stats-api.herokuapp.com/
fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
  .then(res => res.json())
  .then(data => {
    const statsContainer = document.getElementById('leetcode-stats');
    if (data.status !== "success") {
      statsContainer.innerHTML = "<div style='color:#ff6600'>Could not fetch stats.</div>";
      return;
    }
    statsContainer.innerHTML = `
      <div class="leetcode-stats-box">
        <div class="leetcode-stats-label">Total Solved</div>
        <div class="leetcode-stats-value">${data.totalSolved} / ${data.totalQuestions}</div>
      </div>
      <div class="leetcode-stats-box">
        <div class="leetcode-stats-label">Easy</div>
        <div class="leetcode-stats-value">${data.easySolved} / ${data.totalEasy}</div>
      </div>
      <div class="leetcode-stats-box">
        <div class="leetcode-stats-label">Medium</div>
        <div class="leetcode-stats-value">${data.mediumSolved} / ${data.totalMedium}</div>
      </div>
      <div class="leetcode-stats-box">
        <div class="leetcode-stats-label">Hard</div>
        <div class="leetcode-stats-value">${data.hardSolved} / ${data.totalHard}</div>
      </div>
      <div class="leetcode-stats-box">
        <div class="leetcode-stats-label">Acceptance</div>
        <div class="leetcode-stats-value">${data.acceptanceRate}%</div>
      </div>
    `;
  })
  .catch(err => {
    document.getElementById('leetcode-stats').innerHTML = "<div style='color:#ff6600'>Error loading stats.</div>";
  });


let slideIndex = 1;
showSlides(slideIndex);
let autoSlideInterval = setInterval(() => plusSlides(1), 4000);

function plusSlides(n) {
  clearInterval(autoSlideInterval);
  showSlides(slideIndex += n);
  autoSlideInterval = setInterval(() => plusSlides(1), 4000);
}

function currentSlide(n) {
  clearInterval(autoSlideInterval);
  showSlides(slideIndex = n);
  autoSlideInterval = setInterval(() => plusSlides(1), 4000);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "flex";
  dots[slideIndex-1].className += " active";
}

const mediumFeed = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@manohar017manu"; // change username
fetch(mediumFeed)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('medium-blogs');
    container.innerHTML = data.items.slice(0,6).map(post => `
      <div class="medium-blog-card">
        <a href="${post.link}" target="_blank">
          <img src="${post.thumbnail || 'https://cdn-images-1.medium.com/max/400/1*OohqW5DGh9CQS4hLY5FXzA.png'}" alt="${post.title}">
          <h4>${post.title}</h4>
        </a>
        <p>${post.description.replace(/<[^>]+>/g, '').slice(0,100)}...</p>
        <div class="medium-meta">
          <span>${new Date(post.pubDate).toLocaleDateString()}</span>
          <span>By ${post.author}</span>
        </div>
      </div>
    `).join('');
  });










// $(document).ready(function() {

//   //sticky header
//     $(window).scroll(function() {
//       if ($(this).scrollTop() > 1) {
//         $(".header-area").addClass("sticky");
//       } else {
//         $(".header-area").removeClass("sticky");
//       }
  
//       // Update the active section in the header
//       updateActiveSection();
//     });
  
//     $(".header ul li a").click(function(e) {
//       e.preventDefault(); 
  
//       var target = $(this).attr("href");
  
//       if ($(target).hasClass("active-section")) {
//         return; 
//       }
  
//       if (target === "#home") {
//         $("html, body").animate(
//           {
//             scrollTop: 0 
//           },
//           500
//         );
//       } else {
//         var offset = $(target).offset().top - 40; 
  
//         $("html, body").animate(
//           {
//             scrollTop: offset
//           },
//           500
//         );
//       }
  
//       $(".header ul li a").removeClass("active");
//       $(this).addClass("active");
//     });
  

//     //Initial content revealing js
//     ScrollReveal({
//       distance: "100px",
//       duration: 2000,
//       delay: 200
//     });
  
//     ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
//       origin: "left"
//     });
//     ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
//       origin: "right"
//     });
//     ScrollReveal().reveal(".project-title, .contact-title", {
//       origin: "top"
//     });
//     ScrollReveal().reveal(".projects, .contact", {
//       origin: "bottom"
//     });

//   //contact form to excel sheet
//   const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
//   const form = document.forms['submitToGoogleSheet']
//   const msg = document.getElementById("msg")

//   form.addEventListener('submit', e => {
//       e.preventDefault()
//       fetch(scriptURL, { method: 'POST', body: new FormData(form) })
//           .then(response => {
//               msg.innerHTML = "Message sent successfully"
//               setTimeout(function () {
//                   msg.innerHTML = ""
//               }, 5000)
//               form.reset()
//           })
//           .catch(error => console.error('Error!', error.message))
//   })
    
//   });
  
//   function updateActiveSection() {
//     var scrollPosition = $(window).scrollTop();
  
//     // Checking if scroll position is at the top of the page
//     if (scrollPosition === 0) {
//       $(".header ul li a").removeClass("active");
//       $(".header ul li a[href='#home']").addClass("active");
//       return;
//     }
  
//     // Iterate through each section and update the active class in the header
//     $("section").each(function() {
//       var target = $(this).attr("id");
//       var offset = $(this).offset().top;
//       var height = $(this).outerHeight();
  
//       if (
//         scrollPosition >= offset - 40 &&
//         scrollPosition < offset + height - 40
//       ) {
//         $(".header ul li a").removeClass("active");
//         $(".header ul li a[href='#" + target + "']").addClass("active");
//       }
//     });
//   }
  

  
 