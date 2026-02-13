export default async function handler(req, res) {
    const { userId, targetUserId } = req.query;

    if (!userId || !targetUserId) {
        return res.status(400).json({ success: false, error: "Missing parameters" });
    }

    try {
        const response = await fetch(`https://friends.roblox.com/v1/users/${userId}/followings?sortOrder=Desc&limit=100`);
        const data = await response.json();

        if (data && data.data) {
            const isFollowing = data.data.some(following => following.id === parseInt(targetUserId));
            return res.status(200).json({ success: true, isFollowing });
        }

        return res.status(200).json({ success: false, error: "Invalid response" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
