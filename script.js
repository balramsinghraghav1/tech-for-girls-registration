let shareCount = 0;
const shareBtn = document.getElementById('whatsappBtn');
const shareText = document.getElementById('shareCount');
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const thankYou = document.getElementById('thankYouMessage');

const isSubmitted = localStorage.getItem("submitted");

if (isSubmitted) {
  form.style.display = "none";
  thankYou.style.display = "block";
}

shareBtn.addEventListener('click', () => {
  if (shareCount < 5) {
    shareCount++;
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const url = `https://wa.me/?text=${message}`;
    window.open(url, '_blank');
    shareText.innerText = `Click count: ${shareCount}/5`;
    if (shareCount === 5) {
      alert("Sharing complete. Please continue.");
    }
  }
});

const uploadURL = "PASTE_YOUR_WEB_APP_URL_HERE";

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (shareCount < 5) {
    alert("Please complete sharing 5 times before submitting.");
    return;
  }

  submitBtn.disabled = true;

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const college = document.getElementById('college').value;
  const screenshotFile = document.getElementById('screenshot').files[0];

  // Screenshot name only (Drive upload needs advanced config)
  const screenshotName = screenshotFile ? screenshotFile.name : "Not uploaded";

  const formData = new URLSearchParams();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("screenshot", screenshotName);

  await fetch(uploadURL, {
    method: "POST",
    body: formData
  });

  localStorage.setItem("submitted", true);
  form.reset();
  form.style.display = "none";
  thankYou.style.display = "block";
});
