<template>
    <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">Upload</span>
            <i class="fas fa-upload float-right text-emerald-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Upload Dropbox -->
            <div
              class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white "
              :class="{'bg-emerald-400 border-emerald-400 border-solid' : isDragOver}"
              @drag.prevent.stop=""
              @dragstart.prevent.stop=""
              @dragend.prevent.stop="isDragOver = false"
              @dragover.prevent.stop="isDragOver = true"
              @dragenter.prevent.stop="isDragOver = true"
              @dragleave.prevent.stop="isDragOver = false"
              @drop.prevent.stop="upload($event)"
            >
              <!-- <h5>Drop your files here</h5> -->
            </div>
            <input type="file" multiple @change="upload($event)"/>

            <hr class="my-6" />
            <div class="mb-4" v-for="upload in uploads" :key="upload.name">
              <!-- File Name -->
              <div class="font-bold text-sm" :class="upload.text_class">
                  <i :class="upload.icon"></i>{{upload.name}}
                </div>
              <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
                <!-- Inner Progress Bar -->
                <div
                  class="transition-all progress-bar bg-blue-400"
                  :class="upload.variant"
                  :style="{width: upload.current_progress + '%'}"
                ></div>
              </div>
            </div>         
          </div>
        </div>
</template>

<script>
import {storage,auth, songsCollection} from '@/includes/firebase';

export default {
    name: 'Upload',
    props: ['addSong'],
    data() {
        return {
            isDragOver: false,
            uploads: []
        }
    },
    methods: {
        upload($event) {
            this.isDragOver = false;
            const files = $event.dataTransfer
              ? [...$event.dataTransfer.files]
            : [...$event.target.files];   
            files.forEach(file => {
                if(file.type !== 'audio/mpeg') return;
                const storageRef = storage.ref();
                const songsRef = storageRef.child(`songs/${file.name}`);
                const task = songsRef.put(file);

                const updateIndex = this.uploads.push({
                    task,
                    current_progress: 0,
                    name: file.name,
                    variant: 'bg-indigo-500',
                    icon: 'fas fa-spinner fa-spin',
                    text_class: '',
                }) - 1;

                task.on('state_changed', (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.uploads[updateIndex].current_progress = progress;
                }, (err) => {
                    this.uploads[updateIndex].variant = 'bg-red-400';
                    this.uploads[updateIndex].icon = 'fas fa-times';
                    this.uploads[updateIndex].text_class = 'text-red-400';
                    console.log('error', err);
                }, async () => {
                    const songUrl = await task.snapshot.ref.getDownloadURL();

                    const song = {
                        uid: auth.currentUser.uid,
                        displayName: auth.currentUser.displayName,
                        originalName: task.snapshot.ref.name,
                        modifiedName: task.snapshot.ref.name,
                        genre: '',
                        commentCount: 0,
                        url: songUrl
                    }

                    const songRef = await songsCollection.add(song);
                    const songSnapshot = await songRef.get();

                    this.addSong(songSnapshot);

                    this.uploads[updateIndex].variant = 'bg-emerald-500';
                    this.uploads[updateIndex].icon = 'fas fa-check';
                    this.uploads[updateIndex].text_class = 'text-emerald-500';

                })
            })
            console.log('files', files);  
        },
        // cancelUploads() {
        //   this.uploads.foreEach((upload) => {
        //     upload.task.cancel();
        //   })
        // }
        beforeUnmount() {
          this.uploads.foreEach((upload) => {
            upload.task.cancel();
          })
        },
    }
}
</script>