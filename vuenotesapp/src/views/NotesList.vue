<template>
  <div class="list">
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="note in notes" :key="note.id">
            <td>{{ note.title }}</td>
            <td>{{ note.description }}</td>
            <td class="text-center">
              <!-- Center the buttons -->
              <div class="d-flex justify-content-center gap-2">
                <!-- Add space between buttons -->
                <button
                  @click="handleUpdate(note.id)"
                  class="btn btn-primary"
                  :id="'update-note' + note.id"
                >
                  Update
                </button>
                <button
                  @click="handleDelete(note.id)"
                  class="btn btn-danger"
                  :id="'delete-note' + note.id"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<!-- <script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const notes = ref([]);
const router = useRouter();

const getNotesFromStorage = () => {
  return JSON.parse(localStorage.getItem("notes") || "[]");
};

const reloadNotes = () => {
  notes.value = getNotesFromStorage();
};

const handleUpdate = (id) => {
  router.push({ name: "edit", params: { id } });
};

const handleDelete = (id) => {
  const updatedNotes = notes.value.filter((note) => note.id !== id);
  localStorage.setItem("notes", JSON.stringify(updatedNotes));
  reloadNotes();
};

onMounted(() => {
  reloadNotes();
});
</script> -->

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const notes = ref([]);
const router = useRouter();

const getNotesFromStorage = () => {
  return JSON.parse(localStorage.getItem("notes") || "[]");
};

const saveNotesToStorage = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

const reloadNotes = () => {
  notes.value = getNotesFromStorage();
};

const initializeNotes = () => {
  if (notes.value.length === 0) {
    const initialNotes = [];
    for (let i = 1; i <= 50; i++) {
      initialNotes.push({
        id: i,
        title: `Note ${i}`,
        description: `Description of Note ${i}`,
      });
    }
    saveNotesToStorage(initialNotes);
    reloadNotes();
  }
};

const handleUpdate = (id) => {
  router.push({ name: "edit", params: { id } });
};

const handleDelete = (id) => {
  const updatedNotes = notes.value.filter((note) => note.id !== id);
  saveNotesToStorage(updatedNotes);
  reloadNotes();
};

onMounted(() => {
  initializeNotes();
});
</script>

<style scoped>
.list {
  min-height: 80vh;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

button {
  cursor: pointer;
}
</style>
