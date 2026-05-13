"use server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";

export async function processChatMessage(message: string): Promise<string> {
    await connectToDatabase();

    const lowerMessage = message.toLowerCase();

    // Basic Greetings and FAQs
    if (lowerMessage.match(/\b(hi|hello|hey|namaste|greetings)\b/)) {
        return "Hello! Welcome to Shri Sai Computers. Are you looking for a new computer, a specific accessory, or do you need a repair service today?";
    }
    if (lowerMessage.match(/\b(thanks|thank you|thx)\b/)) {
        return "You're very welcome! Let me know if you need anything else.";
    }
    if (lowerMessage.match(/\b(time|hour|open|close|when)\b/)) {
        return "We are open Monday to Saturday, from 10:00 AM to 8:00 PM. We are closed on Sundays.";
    }
    if (lowerMessage.match(/\b(contact|phone|call|number|where|address|location)\b/)) {
        return "You can call us directly at 9057107826 or visit our Contact page to send us an inquiry. Our shop is ready to assist you!";
    }
    if (lowerMessage.match(/\b(repair|fix|broken|service|screen|keyboard repair|format)\b/)) {
        return "We offer expert repair services for PCs, laptops, and printers! Most repairs take 24-48 hours. You can book a repair request from our Services page.";
    }
    if (lowerMessage.match(/\b(return|refund|exchange)\b/)) {
        return "We offer a 7-day replacement policy on defective products. Please bring the product and receipt to our store.";
    }

    // Advanced Product Search
    // Filter out common english/hindi stop words to focus only on product identifiers
    const stopWords = ["hai", "konsa", "ka", "ki", "ke", "ko", "batao", "dikhao", "dikhaiye", "show", "me", "what", "is", "the", "of", "a", "an", "i", "want", "to", "buy", "price", "cost", "how", "much", "do", "you", "have", "are", "there", "in", "stock", "for", "please", "can", "konsi", "wala", "chahiye", "hey", "hi", "hello", "need"];

    // Split by non-alphanumeric, allow 2-letter words like "hp", "mi", "lg", "pc"
    const searchWords = lowerMessage.split(/[^a-zA-Z0-9]+/).filter(w => w.length > 1 && !stopWords.includes(w));

    if (searchWords.length > 0) {
        // Query database for ANY keyword match first to get a pool of candidates
        const query = {
            $or: searchWords.map(w => ({
                $or: [
                    { name: { $regex: w, $options: 'i' } },
                    { category: { $regex: w, $options: 'i' } },
                    { brand: { $regex: w, $options: 'i' } },
                    { description: { $regex: w, $options: 'i' } }
                ]
            }))
        };

        try {
            const rawProducts = await Product.find(query).lean();

            // Intelligent Scoring: Score products based on how many search keywords they match
            const scoredProducts = rawProducts.map((p: any) => {
                let score = 0;
                const nameStr = (p.name || '').toLowerCase();
                const brandStr = (p.brand || '').toLowerCase();
                const textToSearch = `${nameStr} ${p.category || ''} ${brandStr} ${p.description || ''}`.toLowerCase();

                searchWords.forEach(w => {
                    if (textToSearch.includes(w)) {
                        score += 1; // Base point for matching anywhere

                        if (nameStr.includes(w)) {
                            score += 3; // Heavy bonus for matching in product Title
                        }

                        if (brandStr === w || brandStr.includes(w)) {
                            score += 4; // Massive bonus for brand match (e.g., "hp")
                        }
                    }
                });
                return { ...p, score };
            });

            // Sort by highest score first
            scoredProducts.sort((a, b) => b.score - a.score);

            // Get Top 3 most relevant products
            const topProducts = scoredProducts.slice(0, 3).filter(p => p.score > 2); // strictly require at least a decent match

            if (topProducts.length > 0) {
                let response = "Here are the best matches I found for you:\n\n";
                topProducts.forEach((p: any) => {
                    const status = p.stock > 0 ? "✅ In Stock" : "❌ Out of Stock";
                    response += `• **${p.name}**\n  Price: ₹${p.price} (${status})\n\n`;
                });
                response += "You can go to the 'Products' page to view details and buy them! 🛒";
                return response;
            }
        } catch (e) {
            console.error("Chat product search error", e);
        }
    }

    // Default Fallback
    return "I'm sorry, I couldn't find exactly what you were looking for. You can ask me about our specific products (like 'show me laptops' or 'mouse price'), check our store timings, or ask to contact us!";
}
