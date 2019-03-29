<template>
  <div class="budget">
    <section class="section">
      <div class="container">
        <Input msg="Input"/>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import Input from "@/components/budget/Budget-Input.vue";

export default {
  name: "budget",
  components: {
    Input,
  }
};
</script>
