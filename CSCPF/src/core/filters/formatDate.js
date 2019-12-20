import moment from "moment";
import Vue from "vue";

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY hh:mm");
  }
});

Vue.filter("formatDateNoTime", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});
