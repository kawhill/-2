import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 检查环境变量
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ 缺少 Supabase 环境变量，云存储和登录功能将不可用')
  console.warn('请在 .env.local 文件（本地开发）或 Netlify 环境变量（生产环境）中配置：')
  console.warn('  - VITE_SUPABASE_URL')
  console.warn('  - VITE_SUPABASE_ANON_KEY')
} else {
  // 验证环境变量格式
  const urlPattern = /^https?:\/\/.+\.supabase\.co\/?$/
  const keyPattern = /^eyJ/
  
  if (!urlPattern.test(supabaseUrl)) {
    console.error('❌ VITE_SUPABASE_URL 格式不正确，应为: https://xxxxx.supabase.co')
  }
  
  if (!keyPattern.test(supabaseAnonKey)) {
    console.error('❌ VITE_SUPABASE_ANON_KEY 格式不正确，应以 eyJ 开头')
  }
}

// 创建 Supabase 客户端（如果环境变量有效）
export const supabase = supabaseUrl && supabaseAnonKey
  ? (() => {
      try {
        const client = createClient(supabaseUrl, supabaseAnonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            // 设置存储键，避免与其他应用冲突
            storageKey: 'sb-auth-token',
            // 设置存储类型为 localStorage
            storage: typeof window !== 'undefined' ? window.localStorage : undefined
          },
          // 全局错误处理
          global: {
            headers: {}
          }
        })
        
        // 拦截可能的错误，避免未捕获的异常
        if (typeof window !== 'undefined') {
          const originalGetUser = client.auth.getUser.bind(client.auth)
          client.auth.getUser = async function() {
            try {
              // 先检查会话
              const { data: { session } } = await this.getSession()
              if (!session) {
                return { data: { user: null }, error: null }
              }
              return await originalGetUser()
            } catch (error: any) {
              // 静默处理所有错误
              if (error?.name === 'AuthSessionMissingError' || 
                  error?.message?.includes('session')) {
                return { data: { user: null }, error: null }
              }
              return { data: { user: null }, error }
            }
          }
        }
        
        return client
      } catch (error) {
        console.error('❌ 创建 Supabase 客户端失败:', error)
        return null
      }
    })()
  : null

