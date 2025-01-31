


/*

GOAL
add this when done: ✅
- create endpoints for data passing ✅
- use yfinanec api to fetch stock data✅
- use reddit api to fetch posts about stocks✅
- use openai api to analyze sentiment of reddit posts✅
- ml with simple-statis✅

*/





const yahooFinance = require('yahoo-finance2').default;
const { OpenAI } = require('openai'); 


const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors())

require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});


//yahoo thing gets brnd data✅
const fetchStockData = async (symbol) => {
  try {
    const quote = await yahooFinance.quote(symbol);
    return quote;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return null;
  }
};


// from yahhozaa market data✅
const fetchMarketSummary = async () => {
  try {
    const symbols = ['AAPL', 'TSLA', 'NVDA', 'GOOGL', 'MSFT']; // Add more if needed
    const marketData = await Promise.all(symbols.map(symbol => yahooFinance.quote(symbol)));

    return marketData.map(data => ({
      symbol: data.symbol,
      companyName: data.shortName,
      price: data.regularMarketPrice,
      change: data.regularMarketChangePercent.toFixed(2) + '%',
      marketCap: data.marketCap,
    }));
  } catch (error) {
    console.error('Error fetching market summary:', error);
    return [];
  }
};

// from yahoo finance get historical data✅
const fetchHistoricalData = async (symbol) => {
  try {
    const historicalData = await yahooFinance.historical(symbol, {
      period1: '2025-01-01',
      period2: new Date().toISOString().split('T')[0],
      interval: '1d',
    });
    return historicalData;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return null;
  }
};


// get reddit posts✅
const fetchRedditPosts = async (company) => {
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  const redirectUri =  'https://rayaanpasha.vercel.app';
  try {
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const tokenRes = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'MyApp/1.0 by Ok-Stock6652',
        },
      }
    );

    const accessToken = tokenRes.data.access_token;
    const searchRes = await axios.get(
      'https://oauth.reddit.com/r/all/search',
      {
        params: { q: company, limit: 10, sort: 'relevance' },
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'User-Agent': 'MyApp/1.0 by Ok-Stock6652',
        },
      }
    );

    return searchRes.data.data.children.slice(0, 5).map(post => post.data.title);

  } catch (error) {
    console.error('err: ', error.message);
    return ['err: Unable to fetch Reddit posts'];
  }
};

const analyzeSentimentWithGPT = async (posts) => {
  try {
    const prompt = `
      Given the following Reddit posts about a company's stock, please perform sentiment analysis and summarize the general sentiment in a short message. 
      Posts:
      ${posts.join('\n')}

      through these posts tell investors if they have to invest or not, or how to look at the market
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', 
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing sentiment:', error.message);
    return 'Error: Unable to analyze sentiment.';
  }
};

// get reddit posts and analyze sentiment for multiple stocks✅
const fetchRedditSentimentForMarket = async (symbols) => {
  try {
    const sentimentPromises = symbols.map(async (symbol) => {
      const posts = await fetchRedditPosts(symbol);
      const sentiment = await analyzeSentimentWithGPT(posts);
      return { symbol, sentiment };
    });

    return await Promise.all(sentimentPromises);

  } catch (error) {

    console.error('err: ', error);

  }
};


// predict stock price with simple-stat ting✅
const predictStockPrice = (historicalData) => {

  const ss = require('simple-statistics');

  const closingPrices = historicalData.slice(-10).map(day => day.close);

  const x = closingPrices.map((_, index) => index);
  const y = closingPrices;

  const regressionLine = ss.linearRegression([x, y]);
  const tomorrowIndex = x.length;

  const dayAfterTomorrowIndex = x.length + 1;

  const tomorrowPrice = ss.linearRegressionLine(regressionLine)(tomorrowIndex);

  const dayAfterTomorrowPrice = ss.linearRegressionLine(regressionLine)(dayAfterTomorrowIndex);

  return {tomorrowPrice,dayAfterTomorrowPrice};
};

//endpoints from here done?

// hell ya!!!

app.get('/stock/:symbol', async (req, res) => {

  const { symbol } = req.params;

  try {

    const currentData = await fetchStockData(symbol);
    
    const historicalData = await fetchHistoricalData(symbol);
    const redditPosts = await fetchRedditPosts(symbol);

    const sentimentAnalysis = await analyzeSentimentWithGPT(redditPosts);

    if (currentData && historicalData) {

      const prediction = predictStockPrice(historicalData);

      res.json(
        {

        current: {
          symbol: currentData.symbol,
          companyName: currentData.shortName,
          price: currentData.regularMarketPrice,
          marketCap: currentData.marketCap,
          previousClose: currentData.regularMarketPreviousClose,
        },

        historical: historicalData.map(day => ({
          date: day.date,
          open: day.open,
          high: day.high,
          low: day.low,
          close: day.close,
          volume: day.volume,
        
        })),
        prediction: {
          tomorrow: prediction.tomorrowPrice,
          dayAfterTomorrow: prediction.dayAfterTomorrowPrice,
        },
        redditPosts,
        sentimentAnalysis,
      });
    } else {

      res.status(404).json({ error: ' data not found' });

    }
  } catch (error) {
    res.status(500).json({ error: `err: ${error.message}` });
  }
});



app.get('/stocks/summary', async (req, res) => {

  try {
    const marketSummary = await fetchMarketSummary();
    const redditSentiment = await fetchRedditSentimentForMarket(marketSummary.map(stock => stock.symbol));

  const enrichedSummary = marketSummary.map(stock => ({
      ...stock,
     redditSentiment: redditSentiment.find(sent => sent.symbol === stock.symbol)?.sentiment || 'No sentiment data',
  }));
 res.json({ summary: enrichedSummary });
  } catch (error) {

    res.status(500).json({ error: 'err in this stock market summary with sentiment' });
  }
});

app.get('/compare-stocks', async (req, res) => {
  const { symbol1, symbol2 } = req.query;

  try {
    const stockData1 = await fetchStockData(symbol1);
    const stockData2 = await fetchStockData(symbol2);
    const redditPosts1 = await fetchRedditPosts(symbol1);
    const redditPosts2 = await fetchRedditPosts(symbol2);

    if (!stockData1 || !stockData2) {
      return res.status(404).json({ error: 'data not found for one or both symbols give them to me!@#!@#!@' });
    }

    const sentimentAnalysis = await analyzeSentimentWithGPT([...redditPosts1, ...redditPosts2]);

    res.json({
      stock1: {
        symbol: stockData1.symbol,
        companyName: stockData1.shortName,
        price: stockData1.regularMarketPrice,
        marketCap: stockData1.marketCap,
        change: stockData1.regularMarketChangePercent,
      },
      stock2: {
        symbol: stockData2.symbol,
        companyName: stockData2.shortName,
        price: stockData2.regularMarketPrice,
        marketCap: stockData2.marketCap,
        change: stockData2.regularMarketChangePercent,
      },
      redditPosts1,
      redditPosts2,
      sentimentAnalysis,
    });


  } catch (error) {


    console.error('Error:', error);
    res.status(500).json({ error: `Error: ${error.message}` });

    
  }
});

app.listen(3000, () => {
  console.log(`wokring!`);
});
