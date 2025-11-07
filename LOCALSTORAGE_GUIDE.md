# 📦 localStorage 详细介绍

## 🎯 什么是 localStorage？

**localStorage** 是浏览器提供的一个 Web Storage API，用于在用户的浏览器中**持久化存储数据**。

### 核心特点

- ✅ **永久存储**：数据会一直保留，直到用户主动清除或程序删除
- ✅ **本地存储**：数据存储在用户电脑的浏览器中，不发送到服务器
- ✅ **键值对存储**：以键值对（key-value）的形式存储数据
- ✅ **同源策略**：每个域名有独立的存储空间
- ✅ **纯字符串**：只能存储字符串类型的数据

---

## 🏗️ 工作原理

### 存储位置

**Windows 系统**：
```
Chrome/Edge:
C:\Users\{用户名}\AppData\Local\Google\Chrome\User Data\Default\Local Storage

Firefox:
C:\Users\{用户名}\AppData\Roaming\Mozilla\Firefox\Profiles\{profile}\storage\default
```

### 存储结构

```
localStorage (键值对存储)
├── key1: "value1" (字符串)
├── key2: "value2" (字符串)
└── key3: '{"name":"data"}' (JSON 字符串)
```

---

## 📝 基本使用方法

### 1. 保存数据

```javascript
// 保存字符串
localStorage.setItem('username', '张三')

// 保存数字（会自动转为字符串）
localStorage.setItem('age', '25')

// 保存对象（需要 JSON.stringify）
const user = { name: '张三', age: 25 }
localStorage.setItem('user', JSON.stringify(user))
```

### 2. 读取数据

```javascript
// 读取字符串
const username = localStorage.getItem('username')
console.log(username) // "张三"

// 读取对象（需要 JSON.parse）
const userStr = localStorage.getItem('user')
const user = JSON.parse(userStr)
console.log(user) // { name: '张三', age: 25 }

// 如果不存在，返回 null
const notFound = localStorage.getItem('notExist')
console.log(notFound) // null
```

### 3. 删除数据

```javascript
// 删除单个数据
localStorage.removeItem('username')

// 清空所有数据（当前域名下的所有 localStorage）
localStorage.clear()
```

### 4. 检查数据是否存在

```javascript
// 方法 1：检查返回值
const data = localStorage.getItem('key')
if (data !== null) {
  console.log('数据存在')
} else {
  console.log('数据不存在')
}

// 方法 2：使用 key() 方法遍历
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i)
  console.log(key, localStorage.getItem(key))
}
```

### 5. 获取所有键

```javascript
// 获取所有键名
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i)
  console.log(key)
}

// 或者
Object.keys(localStorage).forEach(key => {
  console.log(key, localStorage.getItem(key))
})
```

---

## 💾 存储数据类型

### 支持的数据类型

localStorage **只能存储字符串**，所以其他类型需要转换：

```javascript
// ✅ 字符串 - 直接存储
localStorage.setItem('text', 'Hello')

// ✅ 数字 - 转为字符串
localStorage.setItem('number', String(123))
// 或
localStorage.setItem('number', '123')

// ✅ 布尔值 - 转为字符串
localStorage.setItem('bool', String(true))
// 或
localStorage.setItem('bool', 'true')

// ✅ 对象 - JSON 序列化
const obj = { name: '张三', age: 25 }
localStorage.setItem('obj', JSON.stringify(obj))

// ✅ 数组 - JSON 序列化
const arr = [1, 2, 3, 'hello']
localStorage.setItem('arr', JSON.stringify(arr))

// ✅ null/undefined - 转为字符串
localStorage.setItem('nullValue', String(null)) // "null"
```

### 读取时的类型转换

```javascript
// 字符串
const text = localStorage.getItem('text') // "Hello"

// 数字
const number = Number(localStorage.getItem('number')) // 123
// 或
const number2 = parseInt(localStorage.getItem('number')) // 123

// 布尔值
const bool = localStorage.getItem('bool') === 'true' // true

// 对象
const obj = JSON.parse(localStorage.getItem('obj')) // { name: '张三', age: 25 }

// 数组
const arr = JSON.parse(localStorage.getItem('arr')) // [1, 2, 3, 'hello']
```

---

## 🔒 同源策略（重要！）

### 什么是同源？

**同源** = 相同的协议 + 域名 + 端口

```javascript
// ✅ 同源（数据共享）
http://localhost:3000/page1
http://localhost:3000/page2

// ❌ 不同源（数据隔离）
http://localhost:3000    → 存储 A
http://127.0.0.1:3000    → 存储 B（不同！）
https://localhost:3000   → 存储 C（不同！）
http://localhost:5173    → 存储 D（不同！）

// ❌ 不同域名（数据隔离）
http://localhost:3000        → 存储 A
https://your-app.netlify.app → 存储 B（不同！）
```

### 影响

- **不同域名之间的 localStorage 完全隔离**
- 无法跨域名读取或写入数据
- 每个域名有自己独立的存储空间

---

## 📊 存储容量限制

### 容量大小

| 浏览器 | 限制 | 说明 |
|--------|------|------|
| Chrome/Edge | 5-10 MB | 单个域名 |
| Firefox | 10 MB | 单个域名 |
| Safari | 5 MB | 单个域名 |

### 容量计算

```javascript
// 计算已使用空间
function getLocalStorageSize() {
  let total = 0
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      // key + value 的长度（字节）
      total += localStorage[key].length + key.length
    }
  }
  return (total / 1024).toFixed(2) + ' KB'
}

console.log('已使用:', getLocalStorageSize())
```

### 超出限制的处理

```javascript
try {
  localStorage.setItem('key', 'very long data...')
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    console.error('存储空间不足！')
    // 清理旧数据或提示用户
  }
}
```

---

## ✅ 优点

1. **持久化存储**
   - 关闭浏览器后数据仍然保留
   - 重启电脑后数据仍然保留

2. **简单易用**
   - API 简单直观
   - 无需服务器
   - 无需后端支持

3. **隐私保护**
   - 数据存储在本地
   - 不会发送到服务器
   - 用户完全控制

4. **性能好**
   - 读取写入速度快
   - 同步操作（立即完成）

5. **免费**
   - 不需要付费服务
   - 不需要服务器

---

## ❌ 缺点

1. **容量限制**
   - 只有 5-10MB
   - 不适合存储大量数据

2. **只能存储字符串**
   - 需要序列化/反序列化
   - 复杂对象需要 JSON 处理

3. **同步操作**
   - 可能阻塞主线程
   - 不适合大量数据操作

4. **同源限制**
   - 无法跨域名共享
   - 域名变化会丢失数据

5. **容易被清除**
   - 用户清除浏览器数据会丢失
   - 无痕模式下不持久

6. **安全性**
   - 存储在本地，可能被恶意软件访问
   - 不适合存储敏感信息（密码、密钥等）

---

## 🛠️ 在我们项目中的应用

### 存储结构

```javascript
// 存储键名
const STORAGE_KEY = 'user_data_sets'

// 存储格式
{
  version: '1.0',
  dataSets: [
    {
      id: 'uuid-1',
      name: '数据集1',
      regionName: '石宝镇',
      points: [
        {
          id: 'point-1',
          name: '点1',
          longitude: 108.16,
          latitude: 30.42,
          // ... 其他字段
        }
      ],
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
  ],
  lastUpdated: '2024-01-01T00:00:00.000Z'
}
```

### 使用示例

```javascript
// 保存数据
const data = {
  version: '1.0',
  dataSets: [...],
  lastUpdated: new Date().toISOString()
}
localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

// 读取数据
const dataStr = localStorage.getItem(STORAGE_KEY)
if (dataStr) {
  const data = JSON.parse(dataStr)
  console.log('数据集数量:', data.dataSets.length)
}

// 删除数据
localStorage.removeItem(STORAGE_KEY)
```

---

## ⚠️ 注意事项和最佳实践

### 1. 错误处理

```javascript
try {
  localStorage.setItem('key', 'value')
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    // 存储空间不足
    alert('存储空间不足，请清理数据')
  } else {
    // 其他错误（如被禁用）
    console.error('localStorage 不可用:', e)
  }
}
```

### 2. 数据验证

```javascript
function loadData() {
  try {
    const dataStr = localStorage.getItem('key')
    if (!dataStr) {
      return null // 数据不存在
    }
    
    const data = JSON.parse(dataStr)
    
    // 验证数据格式
    if (!data || !Array.isArray(data.dataSets)) {
      console.warn('数据格式错误')
      return null
    }
    
    return data
  } catch (e) {
    console.error('解析数据失败:', e)
    return null
  }
}
```

### 3. 数据版本管理

```javascript
const CURRENT_VERSION = '1.0'

function saveData(data) {
  const dataWithVersion = {
    version: CURRENT_VERSION,
    data: data,
    lastUpdated: new Date().toISOString()
  }
  localStorage.setItem('key', JSON.stringify(dataWithVersion))
}

function loadData() {
  const stored = JSON.parse(localStorage.getItem('key'))
  if (stored.version !== CURRENT_VERSION) {
    // 版本不匹配，需要迁移数据
    return migrateData(stored)
  }
  return stored.data
}
```

### 4. 定期清理

```javascript
// 清理过期数据
function cleanExpiredData() {
  const dataStr = localStorage.getItem('key')
  if (!dataStr) return
  
  const data = JSON.parse(dataStr)
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  
  data.dataSets = data.dataSets.filter(ds => {
    return new Date(ds.updatedAt).getTime() > oneWeekAgo
  })
  
  localStorage.setItem('key', JSON.stringify(data))
}
```

### 5. 不要存储敏感信息

```javascript
// ❌ 不要这样做
localStorage.setItem('password', '123456')
localStorage.setItem('creditCard', '1234-5678-9012-3456')
localStorage.setItem('apiKey', 'secret-key')

// ✅ 应该这样做
// 使用加密存储或完全避免存储敏感信息
```

---

## 🔄 与其他存储方式对比

| 特性 | localStorage | sessionStorage | Cookie | IndexedDB |
|------|-------------|----------------|--------|-----------|
| 容量 | 5-10 MB | 5-10 MB | 4 KB | 50 MB+ |
| 持久性 | ✅ 永久 | ❌ 关闭标签页清除 | ✅ 可设置过期 | ✅ 永久 |
| 同源隔离 | ✅ | ✅ | ✅ | ✅ |
| 同步/异步 | 同步 | 同步 | 同步 | 异步 |
| 使用场景 | 用户设置、缓存 | 临时数据 | 会话跟踪 | 大量数据 |

---

## 💡 实用技巧

### 1. 封装 Storage 工具类

```javascript
class StorageUtil {
  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (e) {
      console.error('存储失败:', e)
      return false
    }
  }
  
  static get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : defaultValue
    } catch (e) {
      console.error('读取失败:', e)
      return defaultValue
    }
  }
  
  static remove(key) {
    localStorage.removeItem(key)
  }
  
  static clear() {
    localStorage.clear()
  }
}

// 使用
StorageUtil.set('user', { name: '张三' })
const user = StorageUtil.get('user')
```

### 2. 监听存储变化

```javascript
// 监听 localStorage 变化（同标签页）
window.addEventListener('storage', (e) => {
  if (e.key === 'user_data_sets') {
    console.log('数据已更新:', e.newValue)
    // 重新加载数据
    loadUserData()
  }
})
```

### 3. 检查是否可用

```javascript
function isLocalStorageAvailable() {
  try {
    const test = 'test'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

if (!isLocalStorageAvailable()) {
  alert('您的浏览器不支持 localStorage，部分功能可能无法使用')
}
```

---

## 🎯 总结

localStorage 是一个**简单、实用、免费**的本地存储方案，非常适合：

- ✅ 存储用户设置和偏好
- ✅ 缓存应用数据
- ✅ 保存用户输入的内容
- ✅ 存储非敏感的用户数据

但在使用时要记住：

- ⚠️ 检查存储空间是否充足
- ⚠️ 处理可能的错误情况
- ⚠️ 不要存储敏感信息
- ⚠️ 注意同源策略的限制
- ⚠️ 提供数据导出功能作为备份

---

## 📚 参考资源

- [MDN localStorage 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
- [Web Storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API)
- [浏览器存储限制](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)


