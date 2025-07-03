<template>
  <div>
    <v-btn text color="primary" class="mb-4" @click="$router.go(-1)">
      <v-icon small class="mr-1">mdi-arrow-left</v-icon>
      Quay lại
    </v-btn>

    <v-card v-if="email" class="mb-4">
      <v-card-title class="text-h5 grey lighten-3">
        {{ email.subject || '(Không có tiêu đề)' }}
      </v-card-title>
      
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <div class="overline">Người gửi</div>
            <div class="text-subtitle-1">{{ email.sender }}</div>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="overline">Người nhận</div>
            <div class="text-subtitle-1">{{ email.recipient }}</div>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12">
            <div class="overline">Thời gian</div>
            <div class="text-subtitle-2">{{ formatDate(email.timestamp) }}</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card v-if="email">
      <v-tabs v-model="activeTab">
        <v-tab>
          <v-icon small class="mr-2">mdi-code-tags</v-icon>
          HTML
        </v-tab>
        <v-tab>
          <v-icon small class="mr-2">mdi-text</v-icon>
          Text
        </v-tab>
      </v-tabs>
      
      <v-tabs-items v-model="activeTab">
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <div v-if="email.html" class="email-html" v-html="sanitizedHtml"></div>
              <div v-else class="pa-4 grey--text text-center">
                Không có nội dung HTML
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
        
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <pre v-if="email.body" class="email-text">{{ email.body }}</pre>
              <div v-else class="pa-4 grey--text text-center">
                Không có nội dung text
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <v-skeleton-loader
      v-else
      type="card, list-item-three-line, card-heading, card-text, card-text"
      class="mt-4"
    ></v-skeleton-loader>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import DOMPurify from 'dompurify';
import EmailService from '@/services/EmailService';

export default {
  name: 'EmailDetail',
  data() {
    return {
      email: null,
      loading: false,
      activeTab: 0
    };
  },
  computed: {
    sanitizedHtml() {
      if (!this.email || !this.email.html) {
        return '';
      }
      return DOMPurify.sanitize(this.email.html);
    }
  },
  created() {
    this.fetchEmail();
  },
  methods: {
    async fetchEmail() {
      this.loading = true;
      try {
        const id = this.$route.params.id;
        const response = await EmailService.getEmail(id);
        this.email = response.data;
      } catch (error) {
        console.error('Error fetching email:', error);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      
      const date = new Date(dateString);
      return format(date, 'HH:mm - dd/MM/yyyy', { locale: vi });
    }
  }
};
</script>

<style>
.email-text {
  white-space: pre-wrap;
  word-wrap: break-word;
  background: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  font-family: monospace;
}

.email-html {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 16px;
  overflow: auto;
}
</style>
