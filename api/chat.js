const SYSTEM_PROMPT = `Bạn là chuyên gia tư vấn sức khỏe của Lan Tâm Đường - thương hiệu thuốc Nam gia truyền dòng họ Đào với hơn 300 năm kinh nghiệm.

Nhiệm vụ:
- Tư vấn về các vấn đề sức khỏe theo y học cổ truyền và thuốc Nam
- Giới thiệu các sản phẩm/liệu pháp phù hợp của Lan Tâm Đường
- Gợi ý khách đặt lịch khám trực tiếp khi cần thiết

Nguyên tắc:
- Luôn trả lời bằng tiếng Việt, thân thiện và chuyên nghiệp
- Không chẩn đoán bệnh cụ thể thay bác sĩ
- Câu trả lời ngắn gọn, dễ hiểu (tối đa 150 từ)
- Khi khách hỏi về triệu chứng nghiêm trọng, khuyên đến cơ sở y tế ngay

Các nhóm bệnh Lan Tâm Đường hỗ trợ: xương khớp, thần kinh, hô hấp, phục hồi chức năng, suy nhược cơ thể, chăm sóc phụ nữ và nội tiết.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
        }),
      }
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.text();
      console.error('Gemini error:', geminiRes.status, err);
      return res.status(geminiRes.status).json({ error: 'Gemini API error' });
    }

    const data = await geminiRes.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Xin lỗi, tôi chưa thể trả lời lúc này.';
    return res.status(200).json({ text });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
