<template>
 <div 
  class="fixed z-10 inset-0 overflow-y-auto" 
  id="modal"
  :class="{hidden: !modal}"
  >
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center 
      sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
        shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click.prevent="toggleAuthModal">
              <i class="fas fa-times" aria-label="Close" tabindex="0"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a class="block rounded py-3 px-4 transition " 
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'login',
                  'hover:text-blue-600': tab === 'registration'
                }"
                @click.prevent="tab = 'login'"
                href="#">Login</a>
            </li>
            <li class="flex-auto text-center">
              <a class="block rounded py-3 px-4 transition" 
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'registration',
                  'hover:text-blue-600': tab === 'login'
                }"
                @click.prevent="tab = 'registration'"
                href="#">Register</a>
            </li>
          </ul>

          <!-- Login Form -->
          <div class="text-white text-center font-bold p-4 rounded mb-4" v-if="login_show_alert" :class="bg_alert_variant">
            {{login_alert_msg}}
          </div>
          <vee-form 
            v-show="tab === 'login'"
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
          <!-- Registration Form -->
          <div class="text-white text-center font-bold p-4 rounded mb-4" v-if="reg_show_alert" :class="bg_alert_variant">
            {{reg_alert_msg}}
          </div>
          <vee-form 
            v-show="tab === 'registration'" 
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
            <!-- TOS -->
            <div class="mb-3 pl-6">
              <vee-field name="tos" value="1" type="checkbox" class="w-4 h-4 float-left -ml-6 mt-1 rounded"/>
              <label for="tos" class="inline-block">Accept terms of service</label>
              <ErrorMessage class="text-red-600 block" name="tos" />
            </div>
            <button type="submit" :disabled="reg_in_submission"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              Submit
            </button>
          </vee-form>
        </div>
      </div>
    </div>
  </div>   
</template>

<script>
import {mapMutations, mapState} from 'vuex'
export default {
    name: 'Auth',
    data() {
      return {
        userData: {
          country: 'USA'
        },
        login_in_submission: false,
        login_show_alert: false,
        login_alert_msg: 'Please wait! Your login is being processed',
        reg_in_submission: false,
        reg_show_alert: false,
        bg_alert_variant: 'bg-blue-500',
        reg_alert_msg: 'Please wait! Your process is being created.',
        tab: 'login',
          schema: {
          name: 'required|min:3|max:100|alpha_spaces',
          email: 'required|min:3|max:100|email',
          age: 'required|min_value:18|max_value:125',
          password: 'required|min:3|max:100',
          confirm_password: 'required|confirmed:@password',
          country: 'required',
          tos: 'tos'
        },
        loginSchema: {
          email: 'required|min:3|max:100|email',
          password: 'required|min:3|max:100'
        }
      }
    },
    computed: {
      ...mapState({
        modal: 'authModalShow'
      })
    },
    methods: {
      ...mapMutations(['toggleAuthModal']),
      register(values) {
        this.reg_show_alert = true;
        this.reg_in_submission = true;
        this.bg_alert_variant = 'bg-blue-500';
        this.reg_alert_msg = "Please wait. your account is being created";

        this.bg_alert_variant = 'bg-green-500';
        this.reg_alert_msg = "Congrats! Your account has been created";

        console.log('values', values);
      },
      signin(values) {
        this.login_show_alert = true;
        this.login_in_submission = true;
        this.bg_alert_variant = 'bg-blue-500';
        this.login_alert_msg = "Please wait. your account is being created";

        this.bg_alert_variant = 'bg-green-500';
        this.login_alert_msg = "Congrats! Your account has been created";

        console.log('values', values);
      }
    }
}
</script>

<style>

</style>
