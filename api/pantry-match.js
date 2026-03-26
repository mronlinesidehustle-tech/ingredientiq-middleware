export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      'https://ydyozxpxbqvhhkwkxzfy.supabase.co/functions/v1/pantry-match',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          'apikey': process.env.SUPABASE_ANON_KEY
        },
        body: JSON.stringify(req.body)
      }
    );

    const raw = await response.text();

    try {
      return res.status(response.status).json(JSON.parse(raw));
    } catch {
      return res.status(response.status).send(raw);
    }

  } catch (error) {
    return res.status(500).json({
      error: error.message,
      note: 'Middleware could not reach Supabase function'
    });
  }
}
