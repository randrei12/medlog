async function addPillPopUp() {
  try {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });

    if (text) {
      Swal.fire(text);
    }
  } catch (error) {
    let errorMessage = error.message;
    alert(errorMessage);
  }
}
