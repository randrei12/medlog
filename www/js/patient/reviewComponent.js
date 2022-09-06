import { params } from "../Utils.js";
import {
  getDoctorReview,
  addStarReview,
  addCommentReview,
} from "../../db/DoctorService.js";

const button = document.querySelector(".reviewStars");
console.log(button.children);

window.addStarReview = addStarReview;
window.selectedReviewStar = null;
const generateHtmlReview = (average, noOfReviews, doctorId) => {
    let html = document.createElement('div');
    html.setAttribute('class', 'rating');
    for (let i = 1; i < 6; i++) {
        let span = document.createElement('span');
        span.setAttribute('class', 'fa fa-star');
        span.setAttribute('onclick', `addStarReview(${i}, ${average}, ${noOfReviews}, '${doctorId}')`);
        html.appendChild(span);
    }
    return html.outerHTML;
}

button.onclick = async () => {
  try {
    const rating = document.querySelector(".rating");
    const doctorId = params.doctor.toString();
    const { average, noOfReviews } = await getDoctorReview(doctorId);

    const html = generateHtmlReview(average, noOfReviews, doctorId);
    const { value: text } = await Swal.fire({
      title: `${html}<br><strong>Write a review</strong>`,
    //   html,
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
