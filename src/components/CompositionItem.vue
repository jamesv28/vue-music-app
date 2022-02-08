<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modifiedName }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-rose-500 float-right"
      >
        <i class="fa fa-times" aria-label="delete"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-indigo-500 float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt" aria-label="Edit"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        v-if="show_alert"
        class="text-white text-center mb-4 p-4 font-bold"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <vee-form
        :validation-schema="schema"
        :initial-values="song"
        @submit="edit"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            type="text"
            name="modifiedName"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
          />
          <ErrorMessage class="text-red-600" name="modifiedName" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            type="text"
            name="genre"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-indigo-500"
          :disabled="in_submission"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded bg-violet-700 text-white"
          :disabled="in_submission"
          @click.prevent="showForm = false"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import {songsCollection} from '@/includes/firebase';

export default {
  name: "CompositionItem",
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      showForm: false,
      show_alert: false,
      alert_variant: "bg-blue-500",
      alert_message: "Please wait! Updating song info.",
      in_submission: false,
      schema: {
        modifiedName: "required",
        genre: "alpha_spaces",
      },
    };
  },
  methods: {
    async edit(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = "bg-blue-500";
      this.alert_message = "Please wait! Updating song info.";
      try {
        await songsCollection.doc(this.song.docId).update(values);
      }
      catch(err) {
          this.in_submission = false;
          this.alert_message = "Something went wrong! Tray again later";
          this.alert_variant = "bg-red-600";
          console.log('err', err);
          return;
      }
      this.updateSong(this.index, values);
      this.in_submission = false;
      this.alert_variant = 'bg-emerald-600';
      this.alert_message = "Success!"
    },
  },
};
</script>
