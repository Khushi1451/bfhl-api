import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      is_success: false,
      error: "Method not allowed"
    });
  }

  try {
    const body = req.body;

    if (!body || typeof body !== "object") {
      return res.status(400).json({
        is_success: false,
        error: "Invalid request body"
      });
    }

    const keys = Object.keys(body);
    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        error: "Exactly one key is required"
      });
    }

    const key = keys[0];
    let data;

    // Fibonacci
    if (key === "fibonacci") {
      const n = body[key];
      if (!Number.isInteger(n) || n < 0) throw "Invalid fibonacci input";

      const fib = [];
      for (let i = 0; i < n; i++) {
        fib.push(i <= 1 ? i : fib[i - 1] + fib[i - 2]);
      }
      data = fib;
    }

    // Prime
    else if (key === "prime") {
      const arr = body[key];
      if (!Array.isArray(arr)) throw "Invalid prime input";

      const isPrime = (num) => {
        if (num < 2) return false;
        for (let i = 2; i * i <= num; i++) {
          if (num % i === 0) return false;
        }
        return true;
      };

      data = arr.filter(isPrime);
    }

    // LCM
    else if (key === "lcm") {
      const arr = body[key];
      if (!Array.isArray(arr)) throw "Invalid lcm input";

      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const lcm = (a, b) => (a * b) / gcd(a, b);

      data = arr.reduce((a, b) => lcm(a, b));
    }

    // HCF
    else if (key === "hcf") {
      const arr = body[key];
      if (!Array.isArray(arr)) throw "Invalid hcf input";

      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      data = arr.reduce((a, b) => gcd(a, b));
    }

    //ai
   // AI Integration
    // AI Integration
   // AI Integration
    else if (key === "AI") {
      const question = body[key];
      if (typeof question !== "string") throw "Invalid AI input";

      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyBXaWZiNT4XW6ZereHyNGniyVLrDyqvqO0`,
          {
            contents: [{ 
              parts: [{ text: `${question} (Respond with ONLY one single word)` }] 
            }]
          },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );

        if (response.data && response.data.candidates && response.data.candidates[0].content) {
          const answer = response.data.candidates[0].content.parts[0].text;
          data = answer.trim().split(/\s+/)[0].replace(/[^a-zA-Z]/g, "");
        } else {
          throw "AI service returned empty content";
        }
      } catch (aiErr) {
        // Detailed error reporting to identify any remaining issues
        throw `AI Error: ${aiErr.response?.data?.error?.message || aiErr.message}`;
      }
    }

    else {
      throw "Invalid key";
    }

    res.status(200).json({
      is_success: true,
      official_email: "khushi0463.be23@chitkara.edu.in",
      data
    });

  } catch (err) {
    res.status(400).json({
      is_success: false,
      error: err.toString()
    });
  }
}
