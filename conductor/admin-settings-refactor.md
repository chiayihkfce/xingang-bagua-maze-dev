# AdminSettingsModal 拆解計畫

## Objective
將高達 1,241 行的 `AdminSettingsModal.tsx` 拆分為多個職責單一的子組件，以符合 `GEMINI.md` 的模組化規範（單一檔案 < 500 行）。

## Key Files & Context
- 目標檔案：`src/components/Admin/AdminSettingsModal.tsx`
- 新增目錄：`src/components/Admin/Settings/`

## Implementation Steps
為確保樣式與功能**完全不變**，所有 Inline Styles 與 CSS Class 必須 100% 照搬。我們將依據其 4 個頁籤拆分為 4 個獨立子組件：

1.  **新增 `SettingsProfileTab.tsx`**
    - 職責：處理個人設定（修改密碼、暱稱、LINE ID）。
    - 搬遷內容：`nickname`, `username`, `password`, `lineUid`, `showLineGuide` 狀態，以及 `handleUpdateProfile` 邏輯。
    - 接收 Props：`currentAdmin`, `setCurrentAdmin`, `showAlert`, `fetchAdmins`。

2.  **新增 `SettingsPricingTab.tsx`**
    - 職責：處理特定身分優待費率管理。
    - 搬遷內容：`editingIp`, `ipName`, `ipPrice` 狀態，以及 `handleSaveIp`, `handleStartEditIp`, `handleCancelEditIp` 邏輯。
    - 接收 Props：`identityPricings`, `saveIdentityPricing`, `deleteIdentityPricing`, `showAlert`。

3.  **新增 `SettingsSealTab.tsx`**
    - 職責：數位證書官印設定。
    - 搬遷內容：純展示與切換邏輯。
    - 接收 Props：`sealConfig`, `updateSealConfig`。

4.  **新增 `SettingsAdminListTab.tsx`**
    - 職責：管理員清單展示與新增/刪除功能（僅超級管理員可見）。
    - 搬遷內容：`admins`, `newUsername`, `newPassword`, `newNickname` 狀態，以及 `fetchAdmins`, `handleAddAdmin`, `handleDeleteAdmin` 邏輯。
    - 接收 Props：`currentAdmin`, `showAlert`, `showConfirm`。

5.  **重構 `AdminSettingsModal.tsx`**
    - 職責：僅作為 Modal 外殼與頁籤切換路由 (`activeTab`)。
    - 載入上述 4 個子組件，依據 `activeTab` 渲染對應的組件，並傳入必要 Props。
    - 大幅減少代碼量至約 150-200 行。

## Verification & Testing
- 拆解後將啟動開發伺服器進行手動驗證。
- 確認：各頁籤切換流暢、外觀樣式無任何跑版。
- 確認：儲存個人設定、新增管理員、刪除管理員、設定官印、新增費率等功能正常運作。