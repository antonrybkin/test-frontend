<template>
  <li class="folder-node">
    <div
      class="folder-node__item"
      :class="{
        'folder-node__item--checked': selectedFolderIdNum === folder.id,
      }"
      @click="selectFolder"
    >
      <span
        v-if="hasChildren"
        class="folder-node__icon"
        :class="{ 'folder-node__icon--open': isOpen }"
        @click.stop="toggle"
      ></span>
      <span v-else class="folder-node__placeholder"></span>
      {{ value }}
      {{ folder.name }}
    </div>
    <ul v-if="isOpen" v-show="hasChildren" class="folder-node__children">
      <FolderNode
        v-for="child in folder.children"
        :key="child.id"
        :folder="child"
        :radioGroup="radioGroup"
        v-model="selectedFolderId"
        @select="$emit('select', $event)"
      />
    </ul>
  </li>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "FolderNode",
  props: {
    folder: {
      type: Object,
      required: true,
    },
    radioGroup: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: false,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapState({
      selectedFolderIdNum: "selectedFolderId",
    }),
    hasChildren() {
      return this.folder.children && this.folder.children.length > 0;
    },
    selectedFolderId: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
        this.$emit("select", newValue);
      },
    },
  },
  methods: {
    toggle() {
      if (this.hasChildren) {
        this.isOpen = !this.isOpen;
      }
    },
    selectFolder() {
      this.selectedFolderId = this.folder.id;
    },
  },
};
</script>

<style scoped>
.folder-node {
  list-style-type: none;
  margin: 5px 0;
}

.folder-node__item {
  display: flex;
  align-items: center;
  padding: 5px 10px 5px 25px;
  border-radius: 4px;
  transition: background-color 0.3s;
  cursor: pointer;
}

.folder-node__item:hover,
.folder-node__item--checked {
  background-color: #f0f0f0;
}

.folder-node__icon,
.folder-node__placeholder {
  position: absolute;
  width: 6px;
  height: 0;
  margin-left: -20px;
  display: inline-block;
  transition: transform 0.3s;
}

.folder-node__icon {
  border-left: 6px solid #000;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
}

.folder-node__icon--open {
  transform: rotate(90deg);
}

.folder-node__children {
  padding-left: 20px;
}
</style>
