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
openai.api_key = "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"  # Replace with secure method


class CompanyRequest(BaseModel):
    company: str


#take data from MR. Yahoo finanance.
def fetch_stock_data(company_name: str) -> pd.DataFrame:
    stock = yf.Ticker(company_name)
    hist = stock.history(period="70d")
    if hist.empty:
        raise ValueError(f"No data found for company: {company_name}")
    return hist


