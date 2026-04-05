export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST allowed' });
    }

    const { mobile, opt, amount } = req.body;
    const API_KEY = "YOUR_ACTUAL_API_KEY_HERE"; // Apni key yahan dalein
    const AGENT_ID = "SSPAY" + Date.now();

    const apiUrl = `https://mgpayseva.com/api/RechargeWebService/apitransaction?api_key=${API_KEY}&mobile=${mobile}&opt=${opt}&amount=${amount}&agentid=${AGENT_ID}`;

    try {
        const apiResponse = await fetch(apiUrl);
        const data = await apiResponse.json();
        
        // Response wapas bhej raha hai
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ Status: "FAILED", MSG: "Backend Server Error" });
    }
}
