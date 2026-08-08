import { useState } from 'react';
import { doc, setDoc, deleteField } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { useSiteContent } from '../../contexts/SiteContentContext';
import { SITE_CONTENT_SLOTS } from '../../lib/siteContentSlots';

export default function ContentManagement() {
  const { images, loading } = useSiteContent();
  const [uploadingKey, setUploadingKey] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  const showMessage = (msg) => {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(''), 3000);
  };

  const handleUpload = async (slot, file) => {
    if (!file) return;
    setUploadingKey(slot.key);
    try {
      const storageRef = ref(storage, `site-content/${slot.key}-${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await setDoc(doc(db, 'siteContent', 'images'), { [slot.key]: url }, { merge: true });
      showMessage(`Đã cập nhật: ${slot.label}`);
    } catch (err) {
      console.error('Lỗi upload ảnh:', err);
      showMessage('Có lỗi khi upload ảnh. Vui lòng thử lại.');
    } finally {
      setUploadingKey('');
    }
  };

  const handleReset = async (slot) => {
    setUploadingKey(slot.key);
    try {
      await setDoc(doc(db, 'siteContent', 'images'), { [slot.key]: deleteField() }, { merge: true });
      showMessage(`Đã khôi phục ảnh gốc: ${slot.label}`);
    } finally {
      setUploadingKey('');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <svg className="animate-spin h-8 w-8 text-nature-green-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-wood-900">Nội dung trang chủ</h2>
        <p className="text-wood-500 text-sm mt-1">Thay ảnh hiển thị trên trang chủ mà không cần sửa code</p>
      </div>

      {actionMsg && (
        <div className="mb-4 bg-nature-green-50 border border-nature-green-200 text-nature-green-800 px-4 py-3 rounded-lg text-sm">
          {actionMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SITE_CONTENT_SLOTS.map((slot) => {
          const currentSrc = images[slot.key] || slot.fallback;
          const hasOverride = Boolean(images[slot.key]);
          const isBusy = uploadingKey === slot.key;
          const isVideo = slot.type === 'video';

          return (
            <div key={slot.key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="aspect-video bg-gray-100">
                {isVideo ? (
                  <video src={currentSrc} className="w-full h-full object-cover" muted controls />
                ) : (
                  <img src={currentSrc} alt={slot.label} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-4">
                <p className="font-medium text-wood-900 text-sm mb-3">{slot.label}</p>
                <div className="flex items-center gap-2">
                  <label className={`flex-1 text-center text-xs px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                    isBusy
                      ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-nature-green-50 text-nature-green-700 border-nature-green-200 hover:bg-nature-green-100'
                  }`}>
                    {isBusy ? 'Đang tải...' : isVideo ? 'Đổi video' : 'Đổi ảnh'}
                    <input
                      type="file"
                      accept={isVideo ? 'video/*' : 'image/*'}
                      disabled={isBusy}
                      className="hidden"
                      onChange={(e) => handleUpload(slot, e.target.files?.[0])}
                    />
                  </label>
                  {hasOverride && (
                    <button
                      onClick={() => handleReset(slot)}
                      disabled={isBusy}
                      className="text-xs px-3 py-2 rounded-lg border border-gray-200 text-wood-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Khôi phục
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
