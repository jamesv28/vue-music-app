<template>
   <div class="text-white text-center font-bold p-4 rounded mb-4" v-if="login_show_alert" :class="bg_alert_variant">
            {{login_alert_msg}}
          </div>
          <vee-form 
            @submit="signin"
            :validation-schema="loginSchema"
          >
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="l_email">Email</label>
              <vee-field 
                name="email"
                id="l_email"
                type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" 
                autocomplete="off"/>
              <ErrorMessage class="text-red-600" name="email"/>
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="l_password">Password</label>
              <vee-field 
                name="password"
                id="l_password"
                type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password" 
                autocomplete="off"/>
              <ErrorMessage class="text-red-600" name="password"/>
            </div>
            <button type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              Submit
            </button>
          </vee-form> 
</template>

<script>
export default {
    name: 'LoginForm',
    data() {
        return {
            login_in_submission: false,
            login_show_alert: false,
            login_alert_msg: 'Please wait! Your login is being processed',
            bg_alert_variant: 'bg-blue-500',
            loginSchema: {
              email: 'required|min:3|max:100|email',
              password: 'required|min:3|max:100'
            }
        }
    },
    methods: {
        async signin(values) {
        this.login_show_alert = true;
        this.login_in_submission = true;
        this.bg_alert_variant = 'bg-blue-500';
        this.login_alert_msg = "Please wait. your account is being created";

        try {
          await this.$store.dispatch('login', values);
        }
        catch(err) {
          this.login_in_submission = false;
          this.bg_alert_variant = 'bg-red-500';
          this.login_alert_msg = 'Invalid login details';
          console.log('error', err);
          return;
        }
        this.bg_alert_variant = 'bg-green-500';
        this.login_alert_msg = "Congrats! Your account has been created";

      }
    }
}
</script>

<style scoped>

</style>