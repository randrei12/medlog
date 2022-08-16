// import { db } from "../conf"
// export const getDoctorReview = async (id) => {
//     const result = await db.collection("ratings")
//         .doc(id)
//         .get();
//     const data = result.data();
//     return {
//         average: data.average,
//         noOfReviews: data.noOfReviews
//     };
// }