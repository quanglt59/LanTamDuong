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

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const groqMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages.slice(-10).map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content,
    })),
  ];

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: groqMessages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      console.error('Groq error:', groqRes.status, err);
      return res.status(groqRes.status).json({ error: 'AI service error' });
    }

    const data = await groqRes.json();
    const text = data.choices?.[0]?.message?.content || 'Xin lỗi, tôi chưa thể trả lời lúc này.';
    return res.status(200).json({ text });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
