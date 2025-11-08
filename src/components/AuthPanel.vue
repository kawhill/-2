<template>
  <div class="modal-overlay" :class="{ 'fullscreen-login': showClose === false }" @click="handleClose">
    <div class="modal-content auth-panel" @click.stop>
      <div class="modal-header">
        <h3>🔐 登录 / 注册</h3>
        <button v-if="showClose !== false" class="modal-close" @click="handleClose">×</button>
      </div>

      <div class="modal-body">
        <!-- 当前用户信息 -->
        <div v-if="currentUser" class="user-info">
          <div class="user-avatar">👤</div>
          <div class="user-details">
            <p class="user-email">{{ currentUser.email || '匿名用户' }}</p>
            <p class="user-id">ID: {{ currentUser.id.substring(0, 8) }}...</p>
          </div>
          <button @click="handleSignOut" class="btn-signout" :disabled="loading">
            {{ loading ? '登出中...' : '登出' }}
          </button>
        </div>

        <!-- 登录/注册表单 -->
        <div v-else class="auth-forms">
          <!-- 邮箱登录 -->
          <div class="auth-section">
            <h4>{{ isLogin ? '登录' : '注册' }}</h4>
            <div class="form-group">
              <label>邮箱</label>
              <input 
                v-model="email" 
                type="email" 
                placeholder="your@email.com"
                :disabled="loading"
              />
            </div>
            <div class="form-group">
              <label>密码</label>
              <div class="password-input-wrapper">
                <input 
                  v-model="password" 
                  :type="showPassword ? 'text' : 'password'" 
                  placeholder="至少6个字符"
                  :disabled="loading"
                  @keyup.enter="handleEmailAuth"
                  class="password-input"
                />
                <button 
                  type="button"
                  class="password-toggle"
                  @click="showPassword = !showPassword"
                  :disabled="loading"
                  tabindex="-1"
                >
                  {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                </button>
              </div>
            </div>
            <button @click="handleEmailAuth" class="btn-primary" :disabled="loading || !email || !password">
              {{ loading ? '处理中...' : (isLogin ? '登录' : '注册') }}
            </button>
            <p class="switch-mode">
              {{ isLogin ? '还没有账号？' : '已有账号？' }}
              <a @click="isLogin = !isLogin" class="link">{{ isLogin ? '注册' : '登录' }}</a>
            </p>
          </div>
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="error-message">
          ❌ {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { AuthService } from '@/services/auth/authService'
import type { User } from '@supabase/supabase-js'

const props = defineProps<{
  showClose?: boolean
}>()

const emit = defineEmits(['close', 'auth-success'])

const currentUser = ref<User | null>(null)
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLogin = ref(true)
const loading = ref(false)
const error = ref('')

let authStateSubscription: any = null

// 加载当前用户
const loadCurrentUser = async () => {
  currentUser.value = await AuthService.getCurrentUser()
}

// 监听认证状态变化
onMounted(() => {
  loadCurrentUser()
  authStateSubscription = AuthService.onAuthStateChange((user) => {
    currentUser.value = user
    if (user) {
      emit('auth-success')
    }
  })
})

onUnmounted(() => {
  if (authStateSubscription && authStateSubscription.data) {
    authStateSubscription.data.subscription.unsubscribe()
  }
})

// 邮箱登录/注册
const handleEmailAuth = async () => {
  loading.value = true
  error.value = ''
  
  if (isLogin.value) {
    // 登录
    const result = await AuthService.signIn(email.value, password.value)
    loading.value = false
    
    if (result.success) {
      handleClose()
    } else {
      error.value = result.error || '登录失败'
    }
  } else {
    // 注册
    const result = await AuthService.signUp(email.value, password.value)
    loading.value = false
    
    if (result.success) {
      if (result.needsConfirmation) {
        // 需要邮箱确认
        error.value = '注册成功！请检查您的邮箱并点击确认链接，然后返回登录。'
        // 3秒后切换到登录模式
        setTimeout(() => {
          isLogin.value = true
          error.value = ''
        }, 3000)
      } else {
        // 注册成功并自动登录
        handleClose()
      }
    } else {
      error.value = result.error || '注册失败'
    }
  }
}

// 登出
const handleSignOut = async () => {
  loading.value = true
  error.value = ''
  const result = await AuthService.signOut()
  loading.value = false
  if (result.success) {
    currentUser.value = null
  } else {
    error.value = result.error || '登出失败'
  }
}

// 关闭面板
const handleClose = () => {
  if (props.showClose !== false) {
    emit('close')
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* 全屏登录模式（无关闭按钮时背景透明） */
.modal-overlay.fullscreen-login {
  background: transparent;
}


.modal-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.modal-close {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #f0f0f0;
  color: #333;
}

.modal-body {
  padding: 20px;
}

/* 用户信息 */
.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 20px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #4CAF50;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.user-details {
  flex: 1;
}

.user-email {
  margin: 0 0 5px 0;
  font-weight: 600;
  color: #333;
}

.user-id {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.btn-signout {
  padding: 8px 16px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.btn-signout:hover:not(:disabled) {
  background: #d32f2f;
}

.btn-signout:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 认证表单 */
.auth-forms {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.auth-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.auth-section h4 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.section-hint {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 10px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e0e0e0;
}

.divider span {
  padding: 0 15px;
  color: #999;
  font-size: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.form-group input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #4CAF50;
}

.form-group input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

/* 密码输入框包装器 */
.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input {
  flex: 1;
  padding-right: 40px;
}

.password-toggle {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: color 0.2s;
  user-select: none;
}

.password-toggle:hover:not(:disabled) {
  color: #333;
}

.password-toggle:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  padding: 12px 24px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background: #45a049;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}


.switch-mode {
  margin: 10px 0 0 0;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.link {
  color: #4CAF50;
  cursor: pointer;
  text-decoration: underline;
}

.link:hover {
  color: #45a049;
}

.error-message {
  margin-top: 15px;
  padding: 12px;
  background: #ffebee;
  border: 1px solid #f44336;
  border-radius: 4px;
  color: #c62828;
  font-size: 14px;
}
</style>

