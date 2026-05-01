# 「時空導讀者 - 白鸞卿」集齊彩蛋實作計畫

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推薦）或 superpowers:executing-plans 逐任務實現此計劃。步驟使用複選框（`- [ ]`）語法來跟蹤進度。

**目標：** 實作一個隱藏劇情彩蛋。當玩家集齊道具箱中的五個信物後，全螢幕進入黑暗劇場，由主角白鸞卿現身進行時空對話，結束後無痕恢復。

**架構：** 
- 在 `useAppState` 中新增控制彩蛋啟動的狀態。
- 建立 `LuanQingTheater.tsx` 專用組件，封裝 GSAP 動畫、照片容器與對話邏輯。
- 透過 `RegistrationForm` 頂層掛載，確保劇場能覆蓋全螢幕。
- 修改 `BagModal` 的觸發邏輯，在集齊瞬間啟動彩蛋。

**技術棧：** React, GSAP, CSS Animations

---

### 任務 1：狀態與全域配置更新

**文件：**
- 修改：`src/hooks/useAppState.ts`
- 修改：`src/hooks/useAppController.ts`

- [ ] **步驟 1：在 useAppState 中加入彩蛋啟動狀態**

```typescript
// src/hooks/useAppState.ts
const [isEasterEggActive, setIsEasterEggActive] = useState(false);
// ... 導出此狀態與 Setter
```

- [ ] **步驟 2：在 useAppController 中傳遞狀態**

```typescript
// src/hooks/useAppController.ts
// 將 isEasterEggActive 與 setIsEasterEggActive 加入 return 物件
```

- [ ] **步驟 3：Commit**
```bash
git add src/hooks/useAppState.ts src/hooks/useAppController.ts
git commit -m "feat(egg): 新增 isEasterEggActive 全域狀態"
```

---

### 任務 2：建立「白鸞卿劇場」組件

**文件：**
- 建立：`src/components/Registration/LuanQingTheater.tsx`

- [ ] **步驟 1：實作 LuanQingTheater 組件基礎結構與樣式**
包含全黑背景、聚光燈、照片容器與對話框。

- [ ] **步驟 2：整合 GSAP 實現呼吸感與登場動畫**
實現照片的漸顯與微幅縮放，以及對話框的點擊切換邏輯。

- [ ] **步驟 3：Commit**
```bash
git add src/components/Registration/LuanQingTheater.tsx
git commit -m "feat(egg): 建立 LuanQingTheater 組件與動畫邏輯"
```

---

### 任務 3：整合觸發機制與頁面掛載

**文件：**
- 修改：`src/components/Registration/BagModal.tsx`
- 修改：`src/components/Registration/RegistrationForm.tsx`

- [ ] **步驟 1：在 BagModal 中實作集齊檢查與觸發**
當 5 個 `hasXXX` 均為 true 時，在關閉 Modal 的同時觸發 `setIsEasterEggActive(true)`。

- [ ] **步驟 2：在 RegistrationForm 中渲染劇場**
確保 `isEasterEggActive` 為 true 時，劇場組件以 `fixed` 定位覆蓋全螢幕。

- [ ] **步驟 3：Commit**
```bash
git add src/components/Registration/BagModal.tsx src/components/Registration/RegistrationForm.tsx
git commit -m "feat(egg): 整合集齊觸發機制與劇場掛載"
```

---

### 任務 4：驗證與細節調整

- [ ] **步驟 1：手動測試觸發路徑**
進入道具箱，點擊最後一個道具，確認是否順利進入黑暗劇場。

- [ ] **步驟 2：確認對話結束後的恢復邏輯**
對話至最後一段點擊後，確認畫面是否能正確 `fadeOut` 並恢復到報名表單。

- [ ] **步驟 3：Commit 最終修正**
```bash
git commit -am "fix(egg): 優化劇場恢復動畫與點擊手感"
```
