<template>
  <div>
    <h1 class="text-h4 mb-4">Hộp thư đến</h1>
    
    <v-card>
      <v-data-table
        :headers="headers"
        :items="emails"
        :loading="loading"
        :items-per-page="10"
        class="elevation-1"
        @click:row="viewEmail"
      >
        <template v-slot:item.subject="{ item }">
          <div class="font-weight-medium">{{ item.subject || '(Không có tiêu đề)' }}</div>
        </template>

        <template v-slot:item.timestamp="{ item }">
          {{ formatDate(item.timestamp) }}
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click.stop="viewEmail(item)">
            mdi-eye
          </v-icon>
          <v-icon small @click.stop="deleteEmail(item)">
            mdi-delete
          </v-icon>
        </template>

        <template v-slot:no-data>
          <div class="pa-6 text-center">
            <v-icon x-large color="grey lighten-1">mdi-email-outline</v-icon>
            <p class="mt-2 text-body-1 grey--text">Không có email nào</p>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          Đóng
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import EmailService from '@/services/EmailService';

export default {
  name: 'EmailList',
  data() {
    return {
      emails: [],
      loading: false,
      headers: [
        { text: 'Người gửi', value: 'sender' },
        { text: 'Tiêu đề', value: 'subject' },
        { text: 'Thời gian', value: 'timestamp' },
        { text: 'Thao tác', value: 'actions', sortable: false }
      ],
      snackbar: false,
      snackbarColor: 'info',
      snackbarText: ''
    };
  },
  created() {
    this.fetchEmails();
    this.$root.$on('refresh-data', this.fetchEmails);
  },
  beforeDestroy() {
    this.$root.$off('refresh-data', this.fetchEmails);
  },
  methods: {
    async fetchEmails() {
      this.loading = true;
      try {
        const response = await EmailService.getEmails();
        this.emails = response.data;
      } catch (error) {
        console.error('Error fetching emails:', error);
        this.showSnackbar('Không thể tải danh sách email', 'error');
      } finally {
        this.loading = false;
      }
    },
    viewEmail(email) {
      this.$router.push({ name: 'email-detail', params: { id: email.id } });
    },
    async deleteEmail(email) {
      if (!confirm(`Xóa email "${email.subject || 'Không có tiêu đề'}"?`)) {
        return;
      }

      try {
        await EmailService.deleteEmail(email.id);
        this.emails = this.emails.filter(e => e.id !== email.id);
        this.showSnackbar('Email đã được xóa', 'success');
      } catch (error) {
        console.error('Error deleting email:', error);
        this.showSnackbar('Không thể xóa email', 'error');
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      
      const date = new Date(dateString);
      return format(date, 'HH:mm - dd/MM/yyyy', { locale: vi });
    },
    showSnackbar(text, color = 'info') {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    }
  }
};
</script>
