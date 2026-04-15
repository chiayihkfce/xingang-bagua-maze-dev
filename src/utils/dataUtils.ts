/**
 * 報名資料排序工具函數
 * @param data 不含標題列的原始資料陣列
 * @param index 要排序的欄位索引
 * @param direction 排序方向 'asc' | 'desc'
 */
export const sortSubmissions = (data: any[][], index: number, direction: 'asc' | 'desc'): any[][] => {
  return [...data].sort((a, b) => {
    let valA = a[index];
    let valB = b[index];

    // 1. 日期排序 (索引 0 為報名時間)
    if (index === 0) {
      const dateA = new Date(valA).getTime();
      const dateB = new Date(valB).getTime();
      return direction === 'asc' ? dateA - dateB : dateB - dateA;
    }

    // 2. 數值排序
    const numA = Number(valA);
    const numB = Number(valB);
    if (!isNaN(numA) && !isNaN(numB) && typeof valA !== 'boolean' && typeof valB !== 'boolean') {
      return direction === 'asc' ? numA - numB : numB - numA;
    }

    // 3. 字串排序
    valA = String(valA).toLowerCase();
    valB = String(valB).toLowerCase();
    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};
