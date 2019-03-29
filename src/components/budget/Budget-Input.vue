<template>
  <div class="budget-input">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="content">
          <h1 class="title has-text-left">Total use:¥ {{calcTotal}}</h1>
          <div class="has-text-left">Left days: {{getRemainingDays}}</div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="content">
        <b-field>
          <b-input
            placeholder="Credit card"
            icon="credit-card"
            type="number"
            min="1"
            v-model="payment"
          ></b-input>
        </b-field>
        <b-field>
          <p class="control">
            <a class="button is-primary is-fullwidth" @click="savePayment()">Register</a>
          </p>
        </b-field>
      </div>
    </section>

    <b-field grouped group-multiline>
      <b-select v-model="perPage" :disabled="!isPaginated">
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="15">15 per page</option>
        <option value="20">20 per page</option>
      </b-select>
    </b-field>
    <b-table
      :data="payments"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :default-sort-direction="defaultSortDirection"
      default-sort="created_at"
      :striped="isStriped"
      :hoverable="isHoverable"
      :mobile-cards="hasMobileCards"
    >
      <template slot-scope="props">
        <b-table-column
          field="created_at"
          label="created_at"
          sortable
        >{{ new Date(props.row.created_at).toLocaleDateString() + ' ' + new Date(props.row.created_at).toLocaleTimeString() }}</b-table-column>
        <b-table-column field="type" label="type" sortable>{{ props.row.type }}</b-table-column>
        <b-table-column field="value" label="value" sortable>{{ props.row.value }}</b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large"></b-icon>
            </p>
            <p>Nothing here.</p>
          </div>
        </section>
      </template>
    </b-table>
  </div>
</template>

<script>
import moment from "moment";
import db from "@/firebase/firebase";

import shared from "@/common/shared";

export default {
  name: "Input",
  props: {
    msg: String
  },
  data() {
    return {
      payment: 0,
      payments: [],
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "desc",
      currentPage: 1,
      perPage: 5,
      isEmpty: false,
      isStriped: true,
      isHoverable: true,
      hasMobileCards: false
    };
  },
  computed: {
    calcTotal: function() {
      if (this.payments.length <= 0) {
        return 0;
      }

      let total = 0;
      this.payments.forEach(row => {
        total += row.value;
      });
      return total;
    },
    getRemainingDays: function() {
      const now = moment();
      const target = now;

      let year = now.year();
      let month = now.month();
      if (now.date() >= 25) {
        target.add(1, "months");
        target.set("date", 25);
      }

      return target.diff(now, "days");
    }
  },
  created() {
    this.fetchPayments();
  },
  methods: {
    fetchPayments: function() {
      const payments = shared.fetchPayments()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.payments.push(doc.data());
          });
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    },
    savePayment: function() {
      if (this.payment <= 0) return;

      let values = {
        type: "card",
        value: Number(this.payment),
        created_at: Date.now()
      };
      shared.savePayment(values);

      this.$toast.open({
        message: "Registered!",
        position: "is-top",
        type: "is-success"
      });

      this.payments.push(values);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
