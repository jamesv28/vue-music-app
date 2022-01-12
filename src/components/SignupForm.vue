<template>
   <div class="text-white text-center font-bold p-4 rounded mb-4" v-if="reg_show_alert" :class="bg_alert_variant">
            {{reg_alert_msg}}
          </div>
          <vee-form 
            :validation-schema="schema"
            @submit="register"
            :initial-values="userData"
          >
            <!-- Name -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="name">Name</label>
              <vee-field 
                name="name"
                type="text"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name"
                id="name"
                autocomplete="off" />
                <ErrorMessage class="text-red-600" name="name"/>
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="email">Email</label>
              <vee-field type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" 
                id="email"
                name="email"
                autocomplete="off"/>
              <ErrorMessage class="text-red-600" name="email"/>
             </div>
            <!-- Age -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="age">Age</label>
              <vee-field type="number"
                name="age"
                id="age"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                autocomplete="off" 
              />
              <ErrorMessage name="age" class="text-red-600" />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <vee-field type="password"
                name="password"
                autocomplete="off"
                :bails="false"
                v-slot="{field, errors}"
              >
                <input  id="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password"
                v-bind="field"
                />
              <div class="text-red-600" v-for="error in errors" :key="error">
                  {{error}}
              </div>
              </vee-field>
              <ErrorMessage class="text-red-600" name="password" />
            </div>
            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="confirm_password">Confirm Password</label>
              <vee-field type="password"
                id="confirm_password"
                name="confirm_password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password" 
                autocomplete="off"/>
              <ErrorMessage name="confirm_password" class="text-red-600" />
            </div>
            <!-- Country -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="country">Country</label>
              <vee-field as="select"
                id="country"
                name="country"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded">
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
              </vee-field>
              <ErrorMessage class="text-red-600" name="country" />
            </div>
            <!-- artis/listener -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="consumer">Artist/Lister?</label>
              <vee-field as="select"
                id="consumer"
                name="customer"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded">
                <option value="artist">Artist</option>
                <option value="listener">Listener</option>
              </vee-field>
              <ErrorMessage class="text-red-600" name="customer" />
            </div>
            <!-- TOS -->
            <div class="mb-3 pl-6">
              <vee-field name="tos" id="tos-label" value="1" type="checkbox" class="w-4 h-4 float-left -ml-6 mt-1 rounded"/>
              <label for="tos-label" class="inline-block">Accept terms of service</label>
              <ErrorMessage class="text-red-600 block" name="tos" />
            </div>
            <button type="submit" :disabled="reg_in_submission"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              Submit
            </button>
          </vee-form> 
</template>

<script>

export default {
    name: 'SignupForm',
    data() {
        return {
          userData: {
            country: 'USA',
            customer: 'listener'
        },     
        reg_in_submission: false,
        reg_show_alert: false,
        bg_alert_variant: 'bg-blue-500',
        reg_alert_msg: 'Please wait! Your process is being created.',
        schema: {
          name: 'required|min:3|max:100|alpha_spaces',
          email: 'required|min:3|max:100|email',
          age: 'required|min_value:18|max_value:125',
          password: 'required|min:3|max:100',
          confirm_password: 'required|confirmed:@password',
          country: 'required',
          customer: 'required',
          tos: 'tos'
        },
        }
    },
    methods: {
        async register(values) {
            this.reg_show_alert = true;
            this.reg_in_submission = true;
            this.bg_alert_variant = 'bg-blue-500';
            this.reg_alert_msg = "Please wait. your account is being created";
            try {
              await this.$store.dispatch('register', values)
            }
            catch(err) {
                this.reg_in_submission = false;
                this.bg_alert_variant = 'bg-red-500';
                this.reg_alert_msg = "Something went wrong! Plese try again later.";
                return;
            }
            
            this.bg_alert_variant = 'bg-green-500';
            this.reg_alert_msg = "Congrats! Your account has been created";
      },
    }
}
</script>

<style scoped>

</style>