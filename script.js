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

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (shareCount < 5) {
    alert("Please complete sharing 5 times before submitting.");
    return;
  }

  submitBtn.disabled = true;

  const formData = new FormData();
  formData.append("name", document.getElementById('name').value);
  formData.append("phone", document.getElementById('phone').value);
  formData.append("email", document.getElementById('email').value);
  formData.append("college", document.getElementById('college').value);
  formData.append("screenshot", document.getElementById('screenshot').files[0]);

  const uploadURL = "YOUR_GOOGLE_APPS_SCRIPT_URL"; // 👈 Replace this

  await fetch(uploadURL, {
    method: "POST",
    body: formData,
  });

  localStorage.setItem("submitted", true);
  form.reset();
  form.style.display = "none";
  thankYou.style.display = "block";
});
