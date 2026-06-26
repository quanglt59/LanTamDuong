export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { messages, customerName } = req.body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const transcript = messages
    .map((m) => `${m.role === 'user' ? customerName || 'Khách' : 'AI'}: ${m.content}`)
    .join('\n');

  const prompt = `Hãy tóm tắt cuộc trò chuyện tư vấn sức khỏe sau đây giữa khách hàng "${customerName}" và AI của Lan Tâm Đường.

Nội dung cuộc trò chuyện:
${transcript}

Yêu cầu tóm tắt:
- Vấn đề sức khỏe khách quan tâm
- Các triệu chứng/tình trạng được đề cập
- Tư vấn AI đã đưa ra
- Mức độ quan tâm của khách (cao/trung bình/thấp)
- Khuyến nghị cho admin (có nên liên hệ tư vấn thêm không)

Trả lời ngắn gọn bằng tiếng Việt, dùng bullet points.`;

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 400,
        temperature: 0.3,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      console.error('Groq summarize error:', groqRes.status, err);
      return res.status(groqRes.status).json({ error: 'AI service error' });
    }

    const data = await groqRes.json();
    const summary = data.choices?.[0]?.message?.content || 'Không thể tóm tắt.';
    return res.status(200).json({ summary });
  } catch (err) {
    console.error('Summarize error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
