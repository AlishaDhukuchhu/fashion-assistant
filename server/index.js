import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Replicate from 'replicate';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Replicate API client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

app.post('/api/try-on', async (req, res) => {
  try {
    const { userImage, garmentImage, category } = req.body;

    if (!process.env.REPLICATE_API_TOKEN || process.env.REPLICATE_API_TOKEN === 'your_replicate_api_token_here') {
      return res.status(500).json({ error: 'Please add your REPLICATE_API_TOKEN to the .env file.' });
    }

    if (!userImage || !garmentImage) {
      return res.status(400).json({ error: 'userImage and garmentImage are required' });
    }

    console.log('Starting Virtual Try-On process...');
    
    // We are using IDM-VTON model on Replicate
    // https://replicate.com/cuiaiyu/idm-vton
    const output = await replicate.run(
      "cuiaiyu/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4",
      {
        input: {
          garm_img: garmentImage,
          human_img: userImage,
          garment_des: "clothing",
          category: category || "upper_body" // upper_body, lower_body, dresses
        }
      }
    );

    console.log('Virtual Try-On completed successfully!');
    res.json({ resultImage: output });
  } catch (error) {
    console.error('Error during AI Try-On:', error);
    res.status(500).json({ error: error.message || 'Failed to generate try-on image' });
  }
});

app.listen(port, () => {
  console.log(`AI Backend Server running on http://localhost:${port}`);
});
