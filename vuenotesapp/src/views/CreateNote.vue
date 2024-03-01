<template>
  <div class="note">
    <form @submit.prevent="handleSubmit" class="w-50">
      <div class="mb-3">
        <label for="title" class="form-label">Title:</label>
        <input
          type="text"
          id="title"
          v-model="note.title"
          :disabled="disabled"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description:</label>
        <textarea
          id="description"
          v-model="note.description"
          :disabled="disabled"
          class="form-control"
          required
        ></textarea>
      </div>
      <button type="submit" :disabled="disabled" class="btn btn-primary">
        {{ buttonLabel }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const note = ref({ title: "", description: "" });
const router = useRouter();
const route = router.currentRoute;

const isEdit = route.value.name === "edit" && route.value.params.id;
const isView = route.value.name === "note" && route.value.params.id;
const isCreate = !isEdit && !isView;
const disabled = isView;

let buttonLabel = isEdit ? "Edit" : "Add Note";

const handleSubmit = () => {
  if (!note.value.title || !note.value.description) {
    alert("Please fill in both title and description fields");
    return;
  }

  if (isEdit) {
    console.log("edit is running");
    const noteId = route.value.params.id;
    const existingNotes = getNotesFromStorage();
    const noteIndex = existingNotes.findIndex(
      (note) => note.id === Number(noteId)
    );
    console.log(noteIndex);
    if (noteIndex !== -1) {
      existingNotes[noteIndex].title = note.value.title;
      existingNotes[noteIndex].description = note.value.description;
      localStorage.setItem("notes", JSON.stringify(existingNotes));
      router.push("/notes");
    } else {
      alert("Note not found!");
    }
  } else {
    const existingNotes = getNotesFromStorage();
    const newNote = {
      id: existingNotes.length === 0 ? 1 : existingNotes.length + 1,
      title: note.value.title,
      description: note.value.description,
    };

    existingNotes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(existingNotes));
    router.push("/notes");
  }
};

const getNotesFromStorage = () => {
  return JSON.parse(localStorage.getItem("notes") || "[]");
};

onMounted(() => {
  if (isEdit || isView) {
    const noteId = route.value.params.id;
    console.log(noteId);
    const existingNotes = getNotesFromStorage();
    console.log(existingNotes);
    const foundNote = existingNotes.find((note) => {
      console.log(note.id === noteId);
      return note.id === Number(noteId);
    });
    console.log(foundNote);
    if (foundNote) {
      note.value = { ...foundNote };
    }
  }
});
</script>

<style scoped>
.note {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
form {
  width: 50%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
}
input[type="text"],
textarea {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
