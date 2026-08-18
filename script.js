// ==========================================================================
// MOBILE MENU TOGGLE
// ==========================================================================
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    navLinks.classList.toggle('open');
  }
}

// Close mobile menu when a nav link is clicked
document.addEventListener('DOMContentLoaded', () => {
  const navLinksList = document.querySelectorAll('#navLinks a');
  const navLinks = document.getElementById('navLinks');
  navLinksList.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
      }
    });
  });
});

// ==========================================================================
// CERTIFICATIONS CATEGORY FILTER
// ==========================================================================
function filterCerts(category) {
  // Update active state on filter buttons
  const buttons = document.querySelectorAll('.cert-filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  const activeBtn = Array.from(buttons).find(btn => {
    const fnStr = btn.getAttribute('onclick') || '';
    return fnStr.includes(`'${category}'`);
  });
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // Filter cards
  const cards = document.querySelectorAll('.cert-card');
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category') || '';
    if (category === 'all' || cardCategory.includes(category)) {
      card.style.display = 'flex';
      card.style.animation = 'fadeIn 0.4s ease';
    } else {
      card.style.display = 'none';
    }
  });
}

// ==========================================================================
// LEETCODE API STATS FETCHER
// ==========================================================================
const leetcodeUsername = "Manohar_17";

fetch(`https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`)
  .then(res => res.json())
  .then(data => {
    const statsContainer = document.getElementById('leetcode-stats');
    if (!statsContainer) return;

    if (data.status !== "success") {
      statsContainer.innerHTML = `
        <div class="leetcode-stats-box" style="flex:1 1 100%;">
          <div class="leetcode-stats-label">Status</div>
          <div class="leetcode-stats-value" style="font-size:1rem;color:var(--primary);">Active Solver</div>
        </div>
      `;
      return;
    }

    statsContainer.innerHTML = `
      <div class="leetcode-stats-box">
        <div class="leetcode-stats-label">Total Solved</div>
        <div class="leetcode-stats-value">${data.totalSolved} <span style="font-size:0.8rem;color:#64748b;">/ ${data.totalQuestions}</span></div>
      </div>
      <div class="leetcode-stats-box">
        <div class="leetcode-stats-label">Easy</div>
        <div class="leetcode-stats-value" style="color:#10b981;">${data.easySolved}</div>
      </div>
      <div class="leetcode-stats-box">
        <div class="leetcode-stats-label">Medium</div>
        <div class="leetcode-stats-value" style="color:#f59e0b;">${data.mediumSolved}</div>
      </div>
      <div class="leetcode-stats-box">
        <div class="leetcode-stats-label">Hard</div>
        <div class="leetcode-stats-value" style="color:#ef4444;">${data.hardSolved}</div>
      </div>
      <div class="leetcode-stats-box">
        <div class="leetcode-stats-label">Acceptance</div>
        <div class="leetcode-stats-value">${data.acceptanceRate}%</div>
      </div>
    `;
  })
  .catch(err => {
    console.warn("LeetCode Stats API fallback:", err);
    const statsContainer = document.getElementById('leetcode-stats');
    if (statsContainer) {
      statsContainer.innerHTML = `
        <div class="leetcode-stats-box" style="flex:1 1 100%;">
          <div class="leetcode-stats-label">DSA Profile</div>
          <div class="leetcode-stats-value" style="font-size:1rem;">Problem Solver</div>
        </div>
      `;
    }
  });

// ==========================================================================
// MEDIUM RSS BLOGS FETCHER
// ==========================================================================
const mediumFeed = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@manohar017manu";

function scoreBlogPost(post) {
  const text = `${post.title || ''} ${post.description || ''}`.toLowerCase();
  const keywords = [
    'walkthrough',
    'lab',
    'ctf',
    'splunk',
    'vulnerability',
    'writeup',
    'analysis',
    'security',
    'pentest',
    'exploitation',
    'remediation'
  ];

  return keywords.reduce((score, keyword, index) => {
    return text.includes(keyword) ? score + (keywords.length - index) * 10 : score;
  }, 0);
}

function getFeaturedBlogPosts(items) {
  return items.slice().sort((left, right) => {
    const relevanceDelta = scoreBlogPost(right) - scoreBlogPost(left);
    if (relevanceDelta !== 0) return relevanceDelta;
    return new Date(right.pubDate).getTime() - new Date(left.pubDate).getTime();
  });
}

fetch(mediumFeed)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('medium-blogs');
    if (!container) return;

    if (data.status === "ok" && data.items && data.items.length > 0) {
      container.innerHTML = getFeaturedBlogPosts(data.items).slice(0, 3).map(post => {
        const cleanDesc = post.description.replace(/<[^>]+>/g, '').trim().slice(0, 130);
        const postImg = post.thumbnail || 'https://cdn-images-1.medium.com/max/800/1*OohqW5DGh9CQS4hLY5FXzA.png';
        const formattedDate = new Date(post.pubDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });

        return `
          <div class="medium-blog-card">
            <a href="${post.link}" target="_blank" rel="noopener">
              <img src="${postImg}" alt="${post.title}" loading="lazy">
              <h4>${post.title}</h4>
            </a>
            <p>${cleanDesc}...</p>
            <div class="medium-meta">
              <span><i class="fa-regular fa-calendar"></i> ${formattedDate}</span>
              <span><i class="fa-regular fa-user"></i> ${post.author || 'Manohar T H'}</span>
            </div>
          </div>
        `;
      }).join('');
    } else {
      displayFallbackBlogs(container);
    }
  })
  .catch(err => {
    console.warn("Medium RSS fallback:", err);
    const container = document.getElementById('medium-blogs');
    if (container) {
      displayFallbackBlogs(container);
    }
  });

function displayFallbackBlogs(container) {
  container.innerHTML = `
    <div class="medium-blog-card">
      <a href="https://medium.com/@manohar017manu" target="_blank" rel="noopener">
        <div style="height:170px;background:linear-gradient(135deg, #1e293b, #0f172a);display:flex;align-items:center;justify-content:center;color:#fff;">
          <i class="fa-solid fa-shield-halved" style="font-size:3rem;color:#ff6600;"></i>
        </div>
        <h4>Web Application Penetration Testing Lab Walkthroughs</h4>
      </a>
      <p>Practical vulnerability exploitation analysis covering SQL Injection, XSS, and authentication bypass techniques with remediation methodologies.</p>
      <div class="medium-meta">
        <span>Cybersecurity & Pentesting</span>
        <span>By Manohar T H</span>
      </div>
    </div>
    <div class="medium-blog-card">
      <a href="https://medium.com/@manohar017manu" target="_blank" rel="noopener">
        <div style="height:170px;background:linear-gradient(135deg, #0284c7, #1e40af);display:flex;align-items:center;justify-content:center;color:#fff;">
          <i class="fa-solid fa-cloud-arrow-up" style="font-size:3rem;color:#fff;"></i>
        </div>
        <h4>DSPM & Data Security Governance Across Hybrid Environments</h4>
      </a>
      <p>Deep-dive into Data Security Posture Management, automated data discovery, compliance audits (SOC 2, DPDPA), and data access controls.</p>
      <div class="medium-meta">
        <span>Compliance & DSPM</span>
        <span>By Manohar T H</span>
      </div>
    </div>
  `;
}

// ==========================================================================
// SCROLL ACTIVE SECTION TRACKER
// ==========================================================================
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`#navLinks a[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('#navLinks a').forEach(link => link.classList.remove('active'));
        navLink.classList.add('active');
      }
    }
  });
});