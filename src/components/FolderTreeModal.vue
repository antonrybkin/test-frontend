<template>
  <div class="modal">
    <div class="modal__content">
      <span class="modal__close" @click="$emit('close')">&times;</span>
      <h2 class="modal__title">{{ title }}</h2>
      <ul class="modal__tree">
        <FolderNode
          v-for="folder in folders"
          :key="folder.id"
          :folder="folder"
          radioGroup="folders"
          v-model="selectedFolderId"
          @select="handleSelect"
        />
      </ul>
      <div class="modal__buttons">
        <button
          class="modal__button modal__button--close"
          @click="$emit('close')"
        >
          Закрыть
        </button>
        <button
          class="modal__button modal__button--ok"
          @click="confirmSelection"
        >
          Ок
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FolderNode from "./FolderNode.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "FolderTreeModal",
  components: {
    FolderNode,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    folders: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState(["selectedFolderId"]),
  },
  methods: {
    ...mapActions(["updateSelectedFolderId"]),
    handleSelect(folderId) {
      this.updateSelectedFolderId(folderId);
    },
    confirmSelection() {
      this.$emit("select", this.selectedFolderId);
    },
  },
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  display: flex;
}

.modal__content {
  background-color: #fff;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  position: relative;
  text-align: center;
}

.modal__close {
  color: #aaa;
  float: right;
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
}

.modal__close:hover,
.modal__close:focus {
  color: #000;
  text-decoration: none;
}

.modal__title {
  margin: 0;
}

.modal__tree {
  text-align: left;
  padding: 0;
  margin: 20px 0;
}

.modal__buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.modal__button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal__button--close {
  background-color: #f44336;
  color: white;
}

.modal__button--ok {
  background-color: #4caf50;
  color: white;
}
</style>
