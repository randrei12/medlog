import firebase from "./config.js";

export const getDoctorReview = async (id) => {
    const result = await firebase.firestore().collection("ratings").doc(id).get();
    const data = result.data();

    return {
        average: data.average,
        noOfReviews: data.noOfReviews
    };
}

export const addStarReview = async (star, average, noOfReviews, id) => {
    let childs = document.querySelectorAll('.fa.fa-star');
    for (let i = 0; i < childs.length; ++i) i < star ? childs[i].classList.add('checked') : childs[i].classList.remove('checked');
    const newAverage = ((average * noOfReviews) + star) / (noOfReviews + 1);
    window.selectedReviewStar = star;
    await firebase.firestore().collection('ratings').doc(id).update({
        average: newAverage,
        noOfReviews: noOfReviews + 1
    });
}

export const addCommentReview = async (star, text, id) => {
    const result = await firebase.firestore().collection("ratings").doc(id).get();
    const data = result.data();
    console.log(data);
    const comments = data.reviews;

    comments.push({
        score: star,
        review: text
    });
    
    await firebase.firestore().collection('ratings').doc(id).update({reviews: comments});
}