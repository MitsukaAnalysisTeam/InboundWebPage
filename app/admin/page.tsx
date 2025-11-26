'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MenuItem } from '@/domain/types';

export default function AdminDashboard() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/menu');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      } else if (res.status === 401) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Failed to fetch items', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('本当にこの項目を削除しますか？')) return;

    try {
      const res = await fetch(`/api/admin/menu?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems(items.filter(item => item.id !== id));
      } else {
        alert('削除に失敗しました');
      }
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleFormSubmit = async (item: MenuItem) => {
    try {
      const res = await fetch('/api/admin/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (res.ok) {
        fetchItems();
        handleFormClose();
      } else {
        alert('保存に失敗しました');
      }
    } catch (error) {
      console.error('Error saving item', error);
    }
  };

  const filteredItems = items.filter(item => 
    filterCategory === 'All' || item.category === filterCategory
  );

  const categories = ['All', 'Ramen', 'Beer', 'JapaneseSake', 'Ippin', 'LunchSpecial', 'DinnerSpecial', 'SunsetSpecial', 'Kaedama', 'Event'];
  
  const categoryLabels: Record<string, string> = {
    'All': 'すべて',
    'Ramen': 'ラーメン',
    'Beer': 'ビール',
    'JapaneseSake': '日本酒',
    'Ippin': '一品',
    'LunchSpecial': 'ランチスペシャル',
    'DinnerSpecial': 'ディナースペシャル',
    'SunsetSpecial': 'サンセットスペシャル',
    'Kaedama': '替え玉',
    'Event': 'イベント'
  };

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">メニュー管理</h1>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900"
          >
            ログアウト
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mr-2 inline-block">
              カテゴリで絞り込み:
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="mt-1 block border border-gray-300 rounded-md shadow-sm p-2"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {categoryLabels[category] || category}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            新規追加
          </button>
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingItem ? 'メニュー編集' : '新規メニュー作成'}
              </h2>
              <MenuItemForm
                initialData={editingItem}
                onSubmit={handleFormSubmit}
                onCancel={handleFormClose}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
              {item.imageUrl && (
                <div className="h-48 w-full relative bg-gray-200">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-2 font-mono">ID: {item.id}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
              <div className="flex justify-between items-center mt-auto">
                <div className="text-gray-900 font-medium text-sm">
                  {typeof item.priceYen === 'number' ? (
                    `¥${item.priceYen}`
                  ) : item.priceYen && typeof item.priceYen === 'object' ? (
                    // priceYen がオブジェクトの場合、各価格を改行（縦並び）で表示
                    <div className="space-y-1">
                      {Object.entries(item.priceYen as Record<string, number | undefined>)
                        .filter(([, v]) => v !== undefined)
                        .map(([k, v], idx) => (
                          <div key={idx} className="flex gap-2 items-baseline">
                            {k ? <span className="text-gray-600">{k}:</span> : null}
                            <span>¥{v}</span>
                          </div>
                        ))}
                    </div>
                  ) : (
                    '価格未設定'
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 font-medium transition-colors"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 font-medium transition-colors"
                  >
                    削除
                  </button>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function MenuItemForm({ 
  initialData, 
  onSubmit, 
  onCancel 
}: { 
  initialData: MenuItem | null, 
  onSubmit: (item: MenuItem) => void, 
  onCancel: () => void 
}) {
  const [formData, setFormData] = useState<Partial<MenuItem>>(
    initialData || {
      id: '',
      name: '',
      category: 'Ramen',
      description: '',
      priceYen: 0,
      ingredients: [],
      dietary: [],
      allergies: [],
      imageUrl: '',
      availableAt: [],
    }
  );

  const [priceType, setPriceType] = useState<'single' | 'multiple'>(
    typeof formData.priceYen === 'object' ? 'multiple' : 'single'
  );

  const [priceMap, setPriceMap] = useState<Record<string, number>>(
    typeof formData.priceYen === 'object' ? (formData.priceYen as Record<string, number>) : {}
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updates: Partial<MenuItem> = { [name]: value };
      
      // IDが変更された場合、imageUrlも自動更新する（新規作成時のみ）
      if (name === 'id' && !initialData) {
        const currentId = prev.id || '';
        const currentUrl = prev.imageUrl || '';
        // 以前のIDに基づいたURLだった場合、または空の場合に更新
        if (!currentUrl || currentUrl === `/images/menu/${currentId}.jpg`) {
          updates.imageUrl = `/images/menu/${value}.jpg`;
        }
      }
      
      return { ...prev, ...updates };
    });
  };

  const handleDietaryChange = (tag: string, checked: boolean) => {
    setFormData(prev => {
      const current = prev.dietary || [];
      if (checked) {
        return { ...prev, dietary: [...current, tag] };
      } else {
        return { ...prev, dietary: current.filter(t => t !== tag) };
      }
    });
  };

  const handleAvailableAtChange = (time: string, checked: boolean) => {
    setFormData(prev => {
      const current = prev.availableAt || [];
      if (checked) {
        return { ...prev, availableAt: [...current, time] };
      } else {
        return { ...prev, availableAt: current.filter(t => t !== time) };
      }
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, priceYen: Number(e.target.value) }));
  };


  const handlePriceMapChange = (key: string, value: string) => {
    const newMap = { ...priceMap, [key]: Number(value) };
    setPriceMap(newMap);
    setFormData(prev => ({ ...prev, priceYen: newMap }));
  };

  const addPriceVariant = () => {
    const newMap = { ...priceMap, '': 0 };
    setPriceMap(newMap);
  };

  const removePriceVariant = (keyToRemove: string) => {
    const newMap = { ...priceMap };
    delete newMap[keyToRemove];
    setPriceMap(newMap);
    setFormData(prev => ({ ...prev, priceYen: newMap }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // IDがなければ生成するなどのロジックが必要だが、ここでは入力必須とする
    onSubmit(formData as MenuItem);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">ID</label>
          <input
            name="id"
            value={formData.id}
            onChange={handleChange}
            disabled={!!initialData} // 編集時はID変更不可
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">カテゴリ</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="Ramen">ラーメン</option>
            <option value="Beer">ビール</option>
            <option value="JapaneseSake">日本酒</option>
            <option value="Ippin">一品</option>
            <option value="LunchSpecial">ランチスペシャル</option>
            <option value="DinnerSpecial">ディナースペシャル</option>
            <option value="SunsetSpecial">サンセットスペシャル</option>
            <option value="Kaedama">替え玉</option>
            <option value="Event">イベント</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">商品名</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">画像URL</label>
        <div className="mt-1 flex gap-2">
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100 text-gray-500"
            placeholder="/images/menu/..."
            readOnly
          />
        </div>
        {formData.imageUrl && (
          <div className="mt-2 relative h-40 w-40 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
              onLoad={(e) => {
                (e.target as HTMLImageElement).style.display = 'block';
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs -z-10">
              画像なし
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">説明文</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">価格</label>
        <div className="flex space-x-4 mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={priceType === 'single'}
              onChange={() => {
                setPriceType('single');
                setFormData(prev => ({ ...prev, priceYen: 0 }));
              }}
              className="form-radio"
            />
            <span className="ml-2">単一価格</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={priceType === 'multiple'}
              onChange={() => {
                setPriceType('multiple');
                setFormData(prev => ({ ...prev, priceYen: {} }));
              }}
              className="form-radio"
            />
            <span className="ml-2">バリエーション価格</span>
          </label>
        </div>

        {priceType === 'single' ? (
          <input
            type="number"
            value={typeof formData.priceYen === 'number' ? formData.priceYen : 0}
            onChange={handlePriceChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        ) : (
          <div className="space-y-2">
            {Object.entries(priceMap).map(([key, val], idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  placeholder="種類 (例: 小盛)"
                  value={key}
                  onChange={(e) => {
                    const newKey = e.target.value;
                    const newMap = { ...priceMap };
                    delete newMap[key];
                    newMap[newKey] = val;
                    setPriceMap(newMap);
                    setFormData(prev => ({ ...prev, priceYen: newMap }));
                  }}
                  className="flex-1 border border-gray-300 rounded-md shadow-sm p-2"
                />
                <input
                  type="number"
                  placeholder="価格"
                  value={val}
                  onChange={(e) => handlePriceMapChange(key, e.target.value)}
                  className="w-32 border border-gray-300 rounded-md shadow-sm p-2"
                />
                <button
                  type="button"
                  onClick={() => removePriceVariant(key)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPriceVariant}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              + 種類を追加
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        {[
          { id: 'Spicy', label: '辛い' },
          { id: 'Vegetarian', label: 'ベジタリアン' },
          { id: 'Vegan', label: 'ヴィーガン' },
          { id: 'Gluten Free', label: 'グルテンフリー' }
        ].map(({ id, label }) => (
          <label key={id} className="inline-flex items-center">
            <input
              type="checkbox"
              checked={formData.dietary?.includes(id) || false}
              onChange={(e) => handleDietaryChange(id, e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2">{label}</span>
          </label>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">提供時間帯</label>
        <div className="flex flex-wrap gap-4">
          {[
            { id: 'Lunch', label: 'ランチ' },
            { id: 'Sunset', label: 'サンセット' },
            { id: 'Dinner', label: 'ディナー' },
            { id: 'Midnight', label: '深夜' }
          ].map(({ id, label }) => (
            <label key={id} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.availableAt?.includes(id) || false}
                onChange={(e) => handleAvailableAtChange(id, e.target.checked)}
                className="form-checkbox"
              />
              <span className="ml-2">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          保存
        </button>
      </div>
    </form>
  );
}
