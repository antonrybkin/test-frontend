<template>
  <div id="app">
    <button class="app__open-button" @click="openModal">Открыть</button>
    <p v-if="selectedFolderName">Выбрана папка: {{ selectedFolderName }}</p>
    <FolderTreeModal
      v-if="isModalOpen"
      :title="'Выберите папку'"
      :folders="folders"
      :radioGroup="'folders'"
      @close="closeModal"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import FolderTreeModal from "./components/FolderTreeModal.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    FolderTreeModal,
  },
  data() {
    return {
      isModalOpen: false,
      folders: [
        {
          id: 1,
          name: "Папка 1",
          children: [
            {
              id: 2,
              name: "Подпапка 1.1",
              children: [
                { id: 22, name: "Подпапка 1.1.1", children: [] },
                { id: 33, name: "Подпапка 1.1.2", children: [] },
              ],
            },
            { id: 3, name: "Подпапка 1.2", children: [] },
          ],
        },
        {
          id: 4,
          name: "Папка 2",
          children: [],
        },
      ],
    };
  },
  computed: {
    ...mapState(["selectedFolderId"]),
    selectedFolderName() {
      const folder = this.findFolderById(this.selectedFolderId, this.folders);
      return folder ? folder.name : "";
    },
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    handleSelect() {
      this.closeModal();
    },
    findFolderById(id, folders) {
      for (let folder of folders) {
        if (folder.id === id) {
          return folder;
        }
        if (folder.children) {
          const result = this.findFolderById(id, folder.children);
          if (result) {
            return result;
          }
        }
      }
      return null;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

.app__open-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #008cba;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.app__open-button:hover {
  background-color: #005f73;
}
</style>
