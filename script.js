let shareCount = 0;
const shareBtn = document.getElementById('whatsappBtn');
const shareText = document.getElementById('shareCount');
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const thankYou = document.getElementById('thankYouMessage');

// Prevent re-submission
const isSubmitted = localStorage.getItem("submitted");
if (isSubmitted) {
  form.style.display = "none";
  thankYou.style.display = "block";
}

// WhatsApp Sharing Button
shareBtn.addEventListener('click', () => {
  if (shareCount < 5) {
    shareCount++;

    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");

    shareText.innerText = `Click count: ${shareCount}/5`;

    if (shareCount === 5) {
      alert("Sharing complete. Please continue.");
    }
  }
});

// Form Submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (shareCount < 5) {
    alert("Please complete sharing 5 times before submitting.");
    return;
  }

  // Disable submit button to prevent multiple submissions
  submitBtn.disabled = true;

  // Get form values
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const college = document.getElementById('college').value;
  const screenshotFile = document.getElementById('screenshot').files[0];
  const screenshotName = screenshotFile ? screenshotFile.name : "Not uploaded";

  // Prepare form data
  const formData = new URLSearchParams();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("screenshot", screenshotName);

  // Send to Google Sheets Web App
  const uploadURL = "https://script.google.com/macros/s/AKfycbyC8Vq12C2K08DDNz1UfcqBnCd_Cp_0bXWPNZMvWHEeVOcUTPOws-pty-d_x30tP4ny/exec";

  try {
    await fetch(uploadURL, {
      method: "POST",
      body: formData,
    });

    // Save submission flag
    localStorage.setItem("submitted", true);

    // UI Feedback
    form.reset();
    form.style.display = "none";
    thankYou.style.display = "block";

  } catch (error) {
    alert("❌ Error submitting form. Please try again.");
    console.error("Submit error:", error);
    submitBtn.disabled = false;
  }
});
