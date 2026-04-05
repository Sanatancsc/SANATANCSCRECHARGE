export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST allowed' });
    }

    const { mobile, opt, amount } = req.body;
    
    // 1. Apni Real API Key yahan dalein
    const API_KEY = "e862b6-9136f7-797df0-3690ba-8f31d9"; 

    // 2. Sirf Digits wala Unique Agent ID Generate karna
    // Date.now() -> 13 digits (Current Time)
    // Math.random() -> 4 extra random digits
    const UNIQUE_ID = Date.now().toString() + Math.floor(1000 + Math.random() * 9000).toString();

    // 3. Final URL with Number-only Agent ID
    const apiUrl = `https://mgpayseva.com/api/RechargeWebService/apitransaction?api_key=${API_KEY}&mobile=${mobile}&opt=${opt}&amount=${amount}&agentid=${UNIQUE_ID}`;

    try {
        const apiResponse = await fetch(apiUrl);
        const data = await apiResponse.json();
        
        // Response wapas bhej rahe hain frontend ko
        res.status(200).json(data);
    } catch (error) {
        console.error("Recharge Error:", error);
        res.status(500).json({ 
            Status: "FAILED", 
            MSG: "Connection Error",
            AgentID: UNIQUE_ID 
        });
    }
}
