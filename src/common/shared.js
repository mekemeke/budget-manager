import db from "@/firebase/firebase";

export default {
  fetchPayments: function () {
    return db.collection("payments")
      .orderBy("created_at", "desc")
      .get()
      .catch(err => {
        console.log("Error getting documents", err);
      });
  },
  savePayment: function (values) {
    if (this.payment <= 0) return;

    db.collection("payments")
      .add(values)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    // this.registered = true;
  }
};
