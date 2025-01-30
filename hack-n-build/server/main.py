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



