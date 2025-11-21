<template>
  <div class="p-4 bg-gray-100 rounded-lg">
    <h3 class="font-bold mb-2">Environment Debug</h3>
    <div class="space-y-1 text-sm font-mono">
      <div>Endpoint: {{ endpoint }}</div>
      <div>Project ID: {{ projectId }}</div>
      <div>Project Name: {{ projectName }}</div>
      <div>Database ID: {{ databaseId }}</div>
    </div>
  </div>
</template>

<script setup>
import { getEndpoint, getProjectId, getProjectName, DATABASE_ID } from '@/services/appwrite'

const endpoint = getEndpoint()
const projectId = getProjectId()
const projectName = getProjectName()
const databaseId = DATABASE_ID
</script>
