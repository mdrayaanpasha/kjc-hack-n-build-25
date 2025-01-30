"""
so whats the plan PHEEEEEEDL?????



- i wanna have import everyting that includes scklearn, pandas, numpy, etc
also need yfinance, then i need reddit thing... thne i need to make an endpoint probably named: '/analyze' POST thing where im like kinda taking 
users company and then fetching that stuff from the api of reddit and then take stuff from there and then like send to mr. gpt
where they like you know perform sentiment analysis and give us something!!!@#!@#!@#

also make a Gradient descnet for the stock price prediction and then like send that to the user as well.

"""

#data lib.
import yfinance as yf


from typing import List, Dict, Any


#ml libs..

import openai
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from pydantic import BaseModel

#std libs for web ops...
import requests
from requests.auth import HTTPBasicAuth
from fastapi import FastAPI, HTTPException

app = FastAPI()


#Mr. GPT:!@##!@#!
openai.api_key = "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"  


class CompanyRequest(BaseModel):
    company: str


#take data from MR. Yahoo finanance.
def fetch_stock_data(company_name: str) -> pd.DataFrame:
    stock = yf.Ticker(company_name)
    hist = stock.history(period="70d")
    if hist.empty:
        raise ValueError(f"No data found for company: {company_name}")
    return hist


def prepare_data(data: pd.DataFrame) -> tuple:
    data['Prev Close'] = data['Close'].shift(1)
    data['Prev Open'] = data['Open'].shift(1)
    data['Prev Volume'] = data['Volume'].shift(1)
    data = data.dropna()
    return data[['Prev Open', 'Prev Close', 'Prev Volume']], data['Open']


def train_model(X: pd.DataFrame, Y: pd.Series) -> tuple:
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, shuffle=False)
    model = LinearRegression().fit(X_train, Y_train)
    return model, X_test, Y_test



def evaluate_model(model: LinearRegression, X_test: pd.DataFrame, Y_test: pd.Series) -> tuple:
    Y_pred = model.predict(X_test)
    return Y_pred, {
        'MSE': mean_squared_error(Y_test, Y_pred),
        'RMSE': mean_squared_error(Y_test, Y_pred)**0.5,
        'R2': r2_score(Y_test, Y_pred)
    }


"""
so this bad boy will take posts data from reddit and then send it to MR. GPT for analysis.

so i gotta be careful with the data that i send to MR. GPT, cause if i send too much data, then it will be like a lot of money
and if i send too little data, then it will be like not enough data for analysis. so i gotta be careful with that.


"""
def analyze_sentiment_with_gpt(posts: List[str], company: str) -> str:
    if not posts:
        return "No posts found for analysis."
    
    context = "\n\n".join(posts)[:12000]
    system_prompt = f"""As a financial analyst, provide insights on {company} discussions:
    1. Market sentiment (bullish/bearish)
    2. Key topics (products, competition, risks)
    3. Investor sentiment analysis
    4. Investment recommendation framework
    
    Use clear sections with bullet points."""
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": context}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        return response.choices[0].message['content']
    except Exception as e:
        return f"Analysis failed: {str(e)}"


