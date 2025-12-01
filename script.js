// small utilities for the static site
document.addEventListener('DOMContentLoaded', function () {
  // header brand navigation (works across pages)
  document.querySelectorAll('.brand').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const nav = btn.dataset.nav || 'index.html';
      location.href = nav;
    });
  });

  // search toggle
  const searchToggle = document.getElementById('searchToggle');
  const searchToggle2 = document.getElementById('searchToggle2');
  const searchArea = document.getElementById('searchArea');
  function toggleSearch(){ if(!searchArea) return; searchArea.classList.toggle('hidden'); }
  if(searchToggle) searchToggle.addEventListener('click', toggleSearch);
  if(searchToggle2) searchToggle2.addEventListener('click', toggleSearch);

  // cookie banner
  const cookieBanner = document.getElementById('cookieBanner');
  const accepted = localStorage.getItem('formare_cookie');
  if(!accepted && cookieBanner) cookieBanner.classList.remove('hidden');
  const acceptAll = document.getElementById('acceptAll');
  const rejectAll = document.getElementById('rejectAll');
  if(acceptAll) acceptAll.addEventListener('click', ()=> { localStorage.setItem('formare_cookie','all'); if(cookieBanner) cookieBanner.classList.add('hidden'); });
  if(rejectAll) rejectAll.addEventListener('click', ()=> { localStorage.setItem('formare_cookie','necessary'); if(cookieBanner) cookieBanner.classList.add('hidden'); });

  // contact form simple handling
  const contactForm = document.getElementById('contactForm');
  if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const privacyConsent = document.getElementById('privacyConsent').checked;
      if(!fullName || !email || !phone) { alert('Please fill required fields'); return; }
      if(!privacyConsent) { alert('Please accept the privacy policy to continue'); return; }
      // simulate send
      alert("Thank you! Your message has been sent. We'll respond within 24 hours.");
      contactForm.reset();
    });
  }

  // privacy settings toggles & actions
  const mapToggle = id => document.getElementById(id);
  const toggleIds = ['bodyScanStorage','shareMeasurements','personalizedRecommendations','analyticsTracking','marketingEmails','pushNotifications'];
  toggleIds.forEach(id => {
    const el = mapToggle(id);
    if(!el) return;
    // load saved
    const saved = localStorage.getItem('ps_' + id);
    if(saved !== null) el.checked = saved === 'true';
    el.addEventListener('change', ()=> {
      localStorage.setItem('ps_' + id, el.checked);
      alert('Privacy setting updated');
    });
  });

  const downloadBtn = document.getElementById('downloadData');
  if(downloadBtn) downloadBtn.addEventListener('click', ()=> alert('Your data download has been initiated. You will receive an email with a secure link.'));

  const deleteBody = document.getElementById('deleteBodyScans');
  if(deleteBody) deleteBody.addEventListener('click', ()=> { if(confirm('Delete all body scans? This is irreversible.')) alert('All body scans scheduled for deletion (within 30 days).'); });

  const deleteAccount = document.getElementById('deleteAccount');
  if(deleteAccount) deleteAccount.addEventListener('click', ()=> { if(confirm('Delete your account? This is irreversible.')) alert('Account deletion request submitted. You will receive a confirmation email within 24 hours.'); });

  // search form
  const searchForm = document.getElementById('searchForm');
  if(searchForm){
    searchForm.addEventListener('submit', e=> { e.preventDefault(); const q = document.getElementById('searchInput').value; alert('Searching: ' + q); });
  }

});
