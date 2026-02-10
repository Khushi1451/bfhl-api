export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      is_success: false,
      error: "Method not allowed"
    });
  }

  res.status(200).json({
    is_success: true,
    official_email: "khushi0463.be23@chitkara.edu.in"
  });
}
