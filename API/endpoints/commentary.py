import json
from config.headers import Headers
from config import COMMENTARY_URL
from config.exceptions import HTMLException
from multipledispatch import dispatch
import requests


class Commentary:
    """returns live score based on matchid or teams"""

    @dispatch(int)
    def getScore(self, id: int) -> dict:
        try:
            resp = requests.get(
                COMMENTARY_URL + str(id),
                headers={"User-Agent": Headers().user_agent()}
                # COMMENTARY_URL,
                # headers={"User-Agent": Headers().user_agent()},
            )
            print(resp.text)
            if resp.status_code != 200:
                raise HTMLException(
                    f"request failed with status code {resp.status_code}"
                )
            return json.loads(resp.text)
        except Exception as e:
            print(e)

    @dispatch(str, str)
    def getScore(self, team1: str, team2: str) -> dict:
        print("here")
        return {}


print(Commentary().getScore(88172))
