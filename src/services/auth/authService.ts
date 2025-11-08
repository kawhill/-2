import { supabase } from '@/services/supabase/supabaseClient'
import type { User } from '@supabase/supabase-js'

export class AuthService {
  /**
   * 获取当前用户
   */
  static async getCurrentUser(): Promise<User | null> {
    if (!supabase) {
      console.warn('⚠️ Supabase 未配置，无法获取用户')
      return null
    }

    try {
      // 先尝试获取会话，使用 try-catch 包裹以避免任何可能的错误
      let session = null
      try {
        const sessionResult = await supabase.auth.getSession()
        session = sessionResult.data?.session || null
      } catch (sessionError: any) {
        // getSession() 也可能抛出错误，静默处理
        if (sessionError?.name === 'AuthSessionMissingError' || 
            sessionError?.message?.includes('session')) {
          // 没有会话是正常情况
          return null
        }
        // 其他错误也静默处理，因为没有会话时这是预期的
        return null
      }

      // 如果没有会话，直接返回 null
      if (!session) {
        return null
      }

      // 有会话，尝试获取用户信息
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) {
          // 只有在有会话但获取用户失败时才记录错误
          console.error('获取用户失败:', error)
          return null
        }
        return user
      } catch (getUserError: any) {
        // getUser() 也可能抛出错误
        if (getUserError?.name === 'AuthSessionMissingError' || 
            getUserError?.message?.includes('session')) {
          // 静默处理：会话可能已过期
          return null
        }
        console.error('获取用户异常:', getUserError)
        return null
      }
    } catch (error: any) {
      // 捕获所有其他异常
      if (error?.message?.includes('session') || error?.name === 'AuthSessionMissingError') {
        // 静默处理：没有会话是正常情况
        return null
      }
      // 其他错误才记录
      console.error('获取用户异常:', error)
      return null
    }
  }

  /**
   * 匿名登录（自动创建匿名账号）
   */
  static async signInAnonymously(): Promise<{ success: boolean, error?: string }> {
    if (!supabase) {
      return { success: false, error: 'Supabase 未配置' }
    }

    try {
      const { data, error } = await supabase.auth.signInAnonymously()
      if (error) {
        console.error('匿名登录失败:', error)
        return { success: false, error: error.message }
      }
      console.log('✅ 匿名登录成功')
      return { success: true }
    } catch (error: any) {
      console.error('匿名登录异常:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * 邮箱注册
   */
  static async signUp(email: string, password: string): Promise<{ success: boolean, error?: string, needsConfirmation?: boolean }> {
    if (!supabase) {
      return { success: false, error: 'Supabase 未配置' }
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
      })
      if (error) {
        console.error('注册失败:', error)
        return { success: false, error: error.message }
      }
      
      // 检查是否需要邮箱确认
      if (data.user && !data.session) {
        console.log('⚠️ 注册成功，但需要邮箱确认')
        return { success: true, needsConfirmation: true }
      }
      
      console.log('✅ 注册成功并自动登录')
      return { success: true, needsConfirmation: false }
    } catch (error: any) {
      console.error('注册异常:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * 邮箱登录
   */
  static async signIn(email: string, password: string): Promise<{ success: boolean, error?: string }> {
    if (!supabase) {
      return { success: false, error: 'Supabase 未配置' }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) {
        console.error('登录失败:', error)
        return { success: false, error: error.message }
      }
      console.log('✅ 登录成功')
      return { success: true }
    } catch (error: any) {
      console.error('登录异常:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * 登出
   */
  static async signOut(): Promise<{ success: boolean, error?: string }> {
    if (!supabase) {
      return { success: false, error: 'Supabase 未配置' }
    }

    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('登出失败:', error)
        return { success: false, error: error.message }
      }
      console.log('✅ 登出成功')
      return { success: true }
    } catch (error: any) {
      console.error('登出异常:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * 监听认证状态变化
   */
  static onAuthStateChange(callback: (user: User | null) => void) {
    if (!supabase) {
      console.warn('⚠️ Supabase 未配置，无法监听认证状态')
      return { data: { subscription: { unsubscribe: () => {} } } }
    }

    try {
      return supabase.auth.onAuthStateChange((event, session) => {
        try {
          callback(session?.user || null)
        } catch (error: any) {
          // 回调函数中的错误不应该影响监听器
          console.error('认证状态变化回调错误:', error)
          callback(null)
        }
      })
    } catch (error: any) {
      // 如果监听器创建失败，返回一个空的订阅对象
      console.error('创建认证状态监听器失败:', error)
      return { data: { subscription: { unsubscribe: () => {} } } }
    }
  }
}

