import { params } from "../Utils.js";
import {
  getDoctorReview,
  addStarReview,
  addCommentReview,
} from "../../db/DoctorService.js";

const button = document.querySelector(".reviewStars");

window.addStarReview = addStarReview;
window.selectedReviewStar = null;
const generateHtmlReview = (average, noOfReviews, doctorId) => {
  let html = '<div class="rating">';
  for (let i = 1; i < 6; i++) {
    html += `<span class="fa fa-star ${
      average >= i ? "checked" : ""
    }" onClick="addStarReview(${i},${average},${noOfReviews},'${doctorId}')"></span>`;
  }
  html += "</div>";

  return html;
}

//fara initializare baza de date => await getDoctorReview o sa crape
button.onclick = async () => {
  try {
    const rating = document.querySelector(".rating");
    const doctorId = params.doctor.toString();
    const { average, noOfReviews } = await getDoctorReview(doctorId);

    const html = generateHtmlReview(average, noOfReviews, doctorId);
    const { value: text } = await Swal.fire({
      title: `${html}
                <strong>Write a review</strong>`,
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCloseButton: true,
      customClass: {
        popup: "border-radius-25",
        closeButton: "popUpCloseButton",
      },
      confirmButtonText: "Review",
      buttonsStyling: false,
    });
    if (text) {
      Swal.fire({
        title: text,
        buttonsStyling: false,
      });
      await addCommentReview(window.selectedReviewStar, text, doctorId);
    }
  } catch (error) {
    let errorMessage = error.message;
    alert(errorMessage);
  }
};
