// 临时测试文件 - 用于验证 Supabase 环境变量是否正确加载
// 测试完成后可以删除此文件

console.log('=== Supabase 环境变量检查 ===')
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Supabase Key (前20个字符):', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + '...')
console.log('Key 长度:', import.meta.env.VITE_SUPABASE_ANON_KEY?.length || 0)

// 检查是否配置完整
if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.log('✅ 环境变量配置完整')
} else {
  console.error('❌ 环境变量配置不完整')
  if (!import.meta.env.VITE_SUPABASE_URL) {
    console.error('  - 缺少 VITE_SUPABASE_URL')
  }
  if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.error('  - 缺少 VITE_SUPABASE_ANON_KEY')
  }
}

