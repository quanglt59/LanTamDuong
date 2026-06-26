import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const STATUS = {
  pending: { label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-700' },
  confirmed: { label: 'Đã xác nhận', color: 'bg-green-100 text-green-700' },
  rescheduled: { label: 'Đổi lịch', color: 'bg-blue-100 text-blue-700' },
  cancelled: { label: 'Hủy lịch', color: 'bg-red-100 text-red-700' },
};

function parseLocalDate(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function toLocalDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

function getDayLabel(dateStr) {
  const today = new Date(); today.setHours(0,0,0,0);
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const d = parseLocalDate(dateStr);
  if (!d) return null;
  d.setHours(0,0,0,0);
  if (d.getTime() === today.getTime()) return 'Hôm nay';
  if (d.getTime() === tomorrow.getTime()) return 'Ngày mai';
  return null;
}

function isTomorrow(dateStr) {
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1); tomorrow.setHours(0,0,0,0);
  const d = parseLocalDate(dateStr);
  if (!d) return false;
  d.setHours(0,0,0,0);
  return d.getTime() === tomorrow.getTime();
}

export default function UpcomingAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rescheduleModal, setRescheduleModal] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({ date: '', reason: '' });
  const [saving, setSaving] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const today = new Date(); today.setHours(0,0,0,0);
      const maxDate = new Date(today); maxDate.setDate(today.getDate() + 7);

      const upcoming = snapshot.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((a) => {
          if (!a.appointmentDate) return false;
          const d = parseLocalDate(a.appointmentDate);
          if (!d) return false;
          d.setHours(0,0,0,0);
          return d >= today && d <= maxDate;
        })
        .sort((a, b) => {
          const da = parseLocalDate(a.appointmentDate);
          const db_ = parseLocalDate(b.appointmentDate);
          return da - db_;
        });

      setAppointments(upcoming);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const showMessage = (msg) => {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(''), 3000);
  };

  const update = async (id, data) => {
    await updateDoc(doc(db, 'appointments', id), data);
  };

  const handleCallCount = async (item, count) => {
    const newCount = item.callCount === count ? count - 1 : count;
    await update(item.id, { callCount: Math.max(0, newCount) });
  };

  const handleConfirm = async (item) => {
    setSaving(true);
    await update(item.id, { status: 'confirmed', statusUpdatedAt: new Date().toISOString() });
    setSaving(false);
    showMessage(`Đã xác nhận lịch hẹn của ${item.fullName}`);
  };

  const handleCancelAppointment = async (item) => {
    setSaving(true);
    await update(item.id, { status: 'cancelled', statusUpdatedAt: new Date().toISOString() });
    setSaving(false);
    showMessage(`Đã hủy lịch hẹn của ${item.fullName}`);
  };

  const openReschedule = (item) => {
    setRescheduleModal(item);
    setRescheduleData({ date: '', reason: '' });
  };

  const handleReschedule = async () => {
    if (!rescheduleData.date) return;
    setSaving(true);
    await update(rescheduleModal.id, {
      appointmentDate: rescheduleData.date,
      rescheduleReason: rescheduleData.reason,
      status: 'rescheduled',
      callCount: 0,
      statusUpdatedAt: new Date().toISOString(),
    });
    setSaving(false);
    setRescheduleModal(null);
    showMessage(`Đã đổi lịch hẹn của ${rescheduleModal.fullName} sang ${rescheduleData.date}`);
  };

  const tomorrowCount = appointments.filter((a) => isTomorrow(a.appointmentDate)).length;

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
        <h2 className="text-2xl font-bold text-wood-900">Lịch hẹn sắp tới</h2>
        <p className="text-wood-500 text-sm mt-1">Hiển thị lịch hẹn trong 7 ngày tới</p>
      </div>

      {actionMsg && (
        <div className="mb-4 bg-nature-green-50 border border-nature-green-200 text-nature-green-800 px-4 py-3 rounded-lg text-sm">
          {actionMsg}
        </div>
      )}

      {/* Cảnh báo ngày mai */}
      {tomorrowCount > 0 && (
        <div className="mb-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-4">
          <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <div>
            <p className="font-semibold text-amber-800">Có {tomorrowCount} lịch hẹn vào ngày mai!</p>
            <p className="text-sm text-amber-700 mt-0.5">Nhớ gọi điện xác nhận với khách hàng trước khi đến.</p>
          </div>
        </div>
      )}

      {appointments.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center text-wood-400">
          Không có lịch hẹn nào trong 7 ngày tới
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((item) => {
            const dayLabel = getDayLabel(item.appointmentDate);
            const isTmr = isTomorrow(item.appointmentDate);
            const callCount = item.callCount || 0;
            const status = item.status || 'pending';

            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl border-2 p-5 transition-all ${
                  isTmr ? 'border-amber-300 shadow-md' : 'border-gray-200'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-wood-900 text-lg">{item.fullName}</h3>
                      {dayLabel && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          dayLabel === 'Ngày mai' ? 'bg-amber-100 text-amber-700' : 'bg-nature-green-100 text-nature-green-700'
                        }`}>
                          {dayLabel}
                        </span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS[status]?.color}`}>
                        {STATUS[status]?.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-wood-600">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-wood-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {item.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-wood-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDisplayDate(item.appointmentDate)}
                        {item.appointmentTime && ` lúc ${item.appointmentTime}`}
                      </span>
                      {item.healthIssue && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-wood-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          {item.healthIssue}
                        </span>
                      )}
                    </div>
                    {item.rescheduleReason && (
                      <p className="text-xs text-blue-600 mt-1.5 bg-blue-50 px-2 py-1 rounded-lg inline-block">
                        Lý do đổi lịch: {item.rescheduleReason}
                      </p>
                    )}
                  </div>
                </div>

                {/* Gọi điện */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-wood-500 mr-1">Gọi điện:</span>
                  {[1, 2, 3].map((n) => (
                    <button
                      key={n}
                      onClick={() => handleCallCount(item, n)}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                        callCount >= n
                          ? 'bg-nature-green-600 border-nature-green-600 text-white'
                          : 'border-gray-200 text-wood-600 hover:border-nature-green-400 hover:text-nature-green-600'
                      }`}
                    >
                      {callCount >= n ? (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      )}
                      Lần {n}
                    </button>
                  ))}
                </div>

                {/* Hành động trạng thái */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                  {status !== 'cancelled' && (
                    <>
                      <button
                        onClick={() => handleConfirm(item)}
                        disabled={status === 'confirmed' || saving}
                        className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg font-medium transition-all ${
                          status === 'confirmed'
                            ? 'bg-green-100 text-green-700 cursor-default'
                            : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {status === 'confirmed' ? 'Đã xác nhận' : 'Xác nhận đến'}
                      </button>

                      <button
                        onClick={() => openReschedule(item)}
                        className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Đổi lịch hẹn
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => status !== 'cancelled' && handleCancelAppointment(item)}
                    disabled={saving}
                    className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg font-medium transition-all ${
                      status === 'cancelled'
                        ? 'bg-red-600 text-white border border-red-600 cursor-default'
                        : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                    }`}
                  >
                    {status === 'cancelled' ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    Hủy lịch
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-wood-900">Đổi lịch hẹn</h3>
              <button onClick={() => setRescheduleModal(null)} className="text-wood-400 hover:text-wood-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-wood-600 mb-4 bg-gray-50 rounded-lg p-3">
              Khách: <strong>{rescheduleModal.fullName}</strong><br />
              Lịch cũ: <strong>{formatDisplayDate(rescheduleModal.appointmentDate)} {rescheduleModal.appointmentTime}</strong>
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-wood-700 mb-1.5">Ngày hẹn mới <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={rescheduleData.date}
                  min={toLocalDateStr(new Date())}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, date: e.target.value })}
                  className="w-full px-4 py-2.5 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-700 mb-1.5">Lý do đổi lịch</label>
                <textarea
                  rows={3}
                  placeholder="Khách bận, sức khỏe không tốt..."
                  value={rescheduleData.reason}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, reason: e.target.value })}
                  className="w-full px-4 py-2.5 border border-wood-200 rounded-lg focus:ring-2 focus:ring-nature-green-500 outline-none text-sm resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setRescheduleModal(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-wood-700 hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleReschedule}
                disabled={!rescheduleData.date || saving}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Đang lưu...
                  </>
                ) : 'Xác nhận đổi lịch'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
