// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
    // console.log(req.query)
    // console.log(req.body)
	try {
		const response = await axios.post(
			`https://api.writesonic.com/v2/business/content/chatsonic?engine=premium`,
			{
				enable_google_results: true,
				enable_memory: false,
				input_text:
					`Give me atleast 10 bucket list items with description and links for ${req.body.city}`,
			},
			{
				headers: {
					"accept": "application/json",
					"content-type": "application/json",
                    "X-API-KEY": process.env.MODEL_API_KEY,
				},
			}
		);

        const data = response.data
        // console.log(data)

		res
			.status(200)
			.json({ data: data });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}
