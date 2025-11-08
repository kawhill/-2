import { supabase } from '@/services/supabase/supabaseClient'
import type { User } from '@supabase/supabase-js'

export class AuthService {
  /**
   * 获取当前用户
   */
  static async getCurrentUser(): Promise<User | null> {
    if (!supabase) {
      console.warn('⚠️ Supabase 未配置')
      return null
    }

    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.error('获取用户失败:', error)
        return null
      }
      return user
    } catch (error) {
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

    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null)
    })
  }
}

