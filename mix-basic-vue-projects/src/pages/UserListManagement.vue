<script lang="js" setup>
import { reactive, onMounted } from 'vue'
const state = reactive({
  requestType: '1', // 1 for server data, 2 for mock data
  tableHeaders: [
    { title: 'Index', key: 'index' },
    { title: 'Name', value: 'name' },
    { title: 'Email', value: 'email' },
    { title: 'Phone', value: 'phone' },
    { title: 'City', value: 'address.city' },
    { title: 'Actions', value: 'actions' },
  ],
  userForm: {
    name: '',
    email: '',
    phone: '',
    address: {
      city: '',
    },
  },
  userList: [], // Placeholder for user list data
  tableLoading: false, // Loading state for the table
})

// filter in object element value empty filed
function removeEmptyStringFields(obj) {
  if (Array.isArray(obj)) {
    // if the input is an array, recursively process each element
    return obj.map(removeEmptyStringFields)
  } else if (obj && typeof obj === 'object') {
    // if the input is an object, recursively process each key-value pair
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value === '') {
        // just skip empty string fields
        return acc
      }
      const newValue = removeEmptyStringFields(value)
      // if the new value is an empty object, skip it
      if (
        typeof newValue === 'object' &&
        newValue !== null &&
        !Array.isArray(newValue) &&
        Object.keys(newValue).length === 0
      ) {
        return acc
      }
      acc[key] = newValue.trim ? newValue.trim() : newValue // if the value is a string, trim it
      return acc
    }, {})
  }
  // otherwise, return the value as is
  return obj
}

// Function to request user data from the server or mock data
const requestUsers = function () {
  state.tableLoading = true // Set loading state
  let baseUrl = 'https://jsonplaceholder.typicode.com/users'
  // filter the userForm to remove empty fields
  let filteredUserForm = removeEmptyStringFields(state.userForm)
  if (filteredUserForm && Object.keys(filteredUserForm).length > 0) {
    if (filteredUserForm.address) {
      const city = filteredUserForm.address.city
      delete filteredUserForm.address // Remove city from the object to avoid duplication in query params
      baseUrl = `${baseUrl}?${new URLSearchParams(filteredUserForm).toString()}address.city=${city}`
    } else {
      baseUrl += '?' + new URLSearchParams(filteredUserForm).toString()
    }
  }
  if (state.requestType === '1') {
    // Fetch data from the server
    fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        state.userList = data.map((user) => ({
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: { city: user.address.city },
        }))
      })
      .catch((error) => console.error('Error fetching server data:', error))
      .finally(() => {
        state.tableLoading = false // Reset loading state
      })
  }
}

const resetForm = function () {
  if (state.tableLoading) return // Prevent reset while loading
  state.userForm = {
    name: '',
    email: '',
    phone: '',
    address: {
      city: '',
    },
  }
  state.userList = [] // Clear the user list
}

const editItem = function (item) {
  // Placeholder for edit functionality
  console.log('Edit item:', item)
}

const deleteItem = function (item) {
  // Placeholder for delete functionality
  console.log('Delete item:', item)
  // Here you would typically make a request to delete the user from the server
  // and then update the userList accordingly.
}

onMounted(() => {
  // Initial request to load data if needed
  requestUsers()
})
</script>
<template>
  <v-container class="user-list-management">
    <v-card>
      <v-card-title class="text-h5">User List Management</v-card-title>
      <v-card-text
        >Network request, data addition, deletion, modification and query functions.</v-card-text
      >
    </v-card>
    <v-card class="mt-3">
      <v-form class="pa-3">
        <div class="d-flex align-center">
          <span>Request Type</span>
          <v-radio-group v-model="state.requestType" inline hide-details>
            <v-radio label="Server Date" value="1"></v-radio>
            <v-radio label="Mock Date" value="2"></v-radio>
          </v-radio-group>
        </div>
        <v-row class="mt-3">
          <v-col cols="4">
            <div class="d-flex align-center">
              <span class="mr-3 d-inline-block" style="width: 50px">Name</span>
              <v-text-field
                v-model="state.userForm.name"
                outlined
                density="compact"
                hide-details
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="d-flex align-center">
              <span class="mr-3 d-inline-block" style="width: 50px">Email</span>
              <v-text-field
                v-model="state.userForm.email"
                outlined
                density="compact"
                hide-details
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="d-flex align-center">
              <span class="mr-3 d-inline-block" style="width: 50px">Phone</span>
              <v-text-field
                v-model="state.userForm.phone"
                outlined
                density="compact"
                hide-details
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="d-flex align-center">
              <span class="mr-3 d-inline-block" style="width: 50px">City</span>
              <v-text-field
                v-model="state.userForm.address.city"
                outlined
                density="compact"
                hide-details
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="8" class="d-flex justify-end align-center">
            <v-btn class="mr-3" @click="resetForm">Reset</v-btn>
            <v-btn color="primary" @click="requestUsers">Search</v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-data-table
        :headers="state.tableHeaders"
        :items="state.userList"
        :loading="state.tableLoading"
        class="mt-3"
      >
        <template v-slot:[`item.index`]="{ index }">
          {{ index + 1 }}
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex align-center">
            <v-btn color="primary" variant="text" @click="editItem(item)">Edit</v-btn>
            <v-btn color="error" variant="text" @click="deleteItem(item)">Delete</v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<style scoped></style>
