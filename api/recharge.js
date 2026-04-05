export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST allowed' });
    }

    const { mobile, opt, amount, pin } = req.body;
    
    // 1. Apna 6-digit Transaction PIN yahan set karein
    const MY_SECURE_PIN = "39410"; 

    // 6-Digit PIN Check logic
    if (pin !== MY_SECURE_PIN) {
        return res.status(403).json({ 
            Status: "FAILED", 
            MSG: "WRONG PIN",
            AgentID: "N/A" 
        });
    }

    // 2. Apni Real API Key yahan dalein
    const API_KEY = "e862b6-9136f7-797df0-3690ba-8f31d9"; 

    // 3. Unique Agent ID (Only Digits)
    const UNIQUE_ID = Date.now().toString() + Math.floor(1000 + Math.random() * 9000).toString();

    // 4. Final URL
    const apiUrl = `https://mgpayseva.com/api/RechargeWebService/apitransaction?api_key=${API_KEY}&mobile=${mobile}&opt=${opt}&amount=${amount}&agentid=${UNIQUE_ID}`;

    try {
        const apiResponse = await fetch(apiUrl);
        const data = await apiResponse.json();
        
        // Response with AgentID for status check compatibility
        res.status(200).json({
            ...data,
            AgentID: UNIQUE_ID 
        });
    } catch (error) {
        console.error("Recharge Error:", error);
        res.status(500).json({ 
            Status: "FAILED", 
            MSG: "Server Connection Error",
            AgentID: UNIQUE_ID 
        });
    }
}
